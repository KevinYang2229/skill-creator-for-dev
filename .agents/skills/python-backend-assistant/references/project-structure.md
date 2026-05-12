# 專案結構與核心檔案範本

## 目錄職責

| 目錄 | 職責 | 範例 |
|------|------|------|
| `core/` | 跨模組共用設施 | settings、logging、security、exceptions |
| `api/routes/` | HTTP endpoint，僅驗證 + 呼叫 service | `routes/users.py` |
| `api/deps.py` | FastAPI Depends 依賴注入 | `get_db`, `get_current_user` |
| `schemas/` | Pydantic Request/Response 模型 | `UserCreate`, `UserOut` |
| `models/` | SQLAlchemy ORM 模型 | `User(Base)` |
| `services/` | 業務邏輯（框架無關） | `UserService.register()` |
| `repositories/` | DB 操作層（CRUD 封裝） | `UserRepository.get_by_email()` |
| `db/` | DB 連線、session、base | `engine`, `AsyncSessionLocal` |
| `integrations/` | 第三方 API client | `openai_client.py` |
| `tests/` | pytest 測試 | mirror src 結構 |

## main.py 範本

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .core.exceptions import register_exception_handlers
from .core.logging import setup_logging
from .api.routes import health, users
# from .db.session import engine  # 若有 DB

setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup：初始化連線池、預熱 cache 等
    yield
    # shutdown：關閉連線
    # await engine.dispose()


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(health.router, tags=["health"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
```

## core/config.py 範本

```python
from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "My API"
    app_version: str = "0.1.0"
    debug: bool = False

    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])

    # Database
    database_url: str = "postgresql+asyncpg://user:pass@localhost:5432/db"

    # JWT
    jwt_secret: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24

    # AI
    openai_api_key: str | None = None
    anthropic_api_key: str | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
```

## core/exceptions.py 範本

```python
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse


class AppException(Exception):
    status_code: int = 500
    code: str = "internal_error"
    message: str = "Internal Server Error"

    def __init__(self, message: str | None = None):
        if message:
            self.message = message
        super().__init__(self.message)


class NotFoundError(AppException):
    status_code = status.HTTP_404_NOT_FOUND
    code = "not_found"
    message = "Resource not found"


class ConflictError(AppException):
    status_code = status.HTTP_409_CONFLICT
    code = "conflict"


class UnauthorizedError(AppException):
    status_code = status.HTTP_401_UNAUTHORIZED
    code = "unauthorized"


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppException)
    async def app_exception_handler(_: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"code": exc.code, "message": exc.message},
        )
```

## api/deps.py 範本

```python
from typing import Annotated
from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from ..db.session import AsyncSessionLocal
from ..core.config import Settings, get_settings


async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


SettingsDep = Annotated[Settings, Depends(get_settings)]
DBSession = Annotated[AsyncSession, Depends(get_db)]


async def get_current_user(
    authorization: Annotated[str | None, Header()] = None,
    db: DBSession = ...,
):
    # 解析 JWT、查 user，略
    ...
```

## api/routes/health.py 範本

```python
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
```

## tests/conftest.py 範本

```python
import pytest
from httpx import ASGITransport, AsyncClient

from src.{package_name}.main import app


@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as ac:
        yield ac
```
