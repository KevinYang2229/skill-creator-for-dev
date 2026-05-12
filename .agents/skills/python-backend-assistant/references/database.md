# 資料庫整合（SQLAlchemy 2.x async + Alembic）

## 1. 安裝

```bash
uv add sqlalchemy alembic asyncpg          # PostgreSQL
# uv add sqlalchemy alembic aiosqlite      # SQLite
```

## 2. db/base.py

```python
from datetime import datetime
from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
```

## 3. db/session.py

```python
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from ..core.config import settings

engine = create_async_engine(
    settings.database_url,
    echo=settings.debug,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)
```

## 4. Model 範本（SQLAlchemy 2.x typed style）

```python
# models/users.py
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from ..db.base import Base, TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(100))
    hashed_password: Mapped[str] = mapped_column(String(255))
```

## 5. Repository Pattern

```python
# repositories/users.py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.users import User


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, user_id: int) -> User | None:
        return await self.db.get(User, user_id)

    async def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        return (await self.db.execute(stmt)).scalar_one_or_none()

    async def list(self, offset: int, limit: int) -> tuple[list[User], int]:
        stmt = select(User).offset(offset).limit(limit).order_by(User.id.desc())
        items = list((await self.db.execute(stmt)).scalars())
        total = await self.db.scalar(select(func.count()).select_from(User)) or 0
        return items, total

    async def create(self, **kwargs) -> User:
        user = User(**kwargs)
        self.db.add(user)
        await self.db.flush()
        await self.db.refresh(user)
        return user

    async def update(self, user: User, fields: dict) -> User:
        for k, v in fields.items():
            setattr(user, k, v)
        await self.db.flush()
        await self.db.refresh(user)
        return user

    async def delete(self, user: User) -> None:
        await self.db.delete(user)
```

## 6. Alembic 設定

### 初始化

```bash
uv run alembic init -t async alembic
```

### alembic/env.py 關鍵調整

```python
import asyncio
from sqlalchemy.ext.asyncio import async_engine_from_config

from src.{package_name}.core.config import settings
from src.{package_name}.db.base import Base
from src.{package_name}.models import users  # noqa: F401  匯入所有 model

config.set_main_option("sqlalchemy.url", settings.database_url)
target_metadata = Base.metadata


async def run_migrations_online():
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    async with connectable.connect() as conn:
        await conn.run_sync(do_run_migrations)
    await connectable.dispose()
```

### 常用指令

```bash
# 自動產生 migration
uv run alembic revision --autogenerate -m "add users table"

# 升級到最新
uv run alembic upgrade head

# 回退
uv run alembic downgrade -1

# 查看歷史
uv run alembic history
```

### Migration 檢查清單

- 自動產生後**一定要人工檢查** `versions/xxx.py`
- 確認 `op.create_index` / `op.drop_index` 正確
- PostgreSQL 加 column 不可同時 NOT NULL + 無 default（會鎖表）
- 大表加 index 用 `op.create_index(..., postgresql_concurrently=True)`，並在 migration 上方加 `# transactional = False`

## 7. Session 生命週期

由 `api/deps.py` 的 `get_db()` 控制：每個 request 一個 session，commit on success，rollback on error。

**不要**在 service / repository 層 commit；統一在 deps 出口 commit。

## 8. 測試 fixture

```python
# tests/conftest.py
import pytest
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from src.{package_name}.db.base import Base


@pytest.fixture(scope="session")
async def test_engine():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    await engine.dispose()


@pytest.fixture
async def db(test_engine):
    """每個測試一個 transaction，結束 rollback。"""
    async with test_engine.connect() as conn:
        trans = await conn.begin()
        Session = async_sessionmaker(bind=conn, expire_on_commit=False)
        async with Session() as session:
            yield session
        await trans.rollback()
```
