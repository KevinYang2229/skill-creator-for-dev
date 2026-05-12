# API 模組樣板（Router / Service / Schema）

新增功能模組的標準三層結構。以 `users` 模組為例。

## 1. Schema (`schemas/users.py`)

```python
from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)


class UserOut(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
```

## 2. Service (`services/users.py`)

業務邏輯層，**不**依賴 FastAPI、**不** raise HTTPException。

```python
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.exceptions import ConflictError, NotFoundError
from ..core.security import hash_password
from ..models.users import User
from ..repositories.users import UserRepository
from ..schemas.users import UserCreate, UserUpdate


class UserService:
    def __init__(self, db: AsyncSession):
        self.repo = UserRepository(db)

    async def create(self, payload: UserCreate) -> User:
        if await self.repo.get_by_email(payload.email):
            raise ConflictError("Email already registered")
        return await self.repo.create(
            email=payload.email,
            name=payload.name,
            hashed_password=hash_password(payload.password),
        )

    async def get(self, user_id: int) -> User:
        user = await self.repo.get(user_id)
        if not user:
            raise NotFoundError("User not found")
        return user

    async def update(self, user_id: int, payload: UserUpdate) -> User:
        user = await self.get(user_id)
        return await self.repo.update(user, payload.model_dump(exclude_unset=True))
```

## 3. Route (`api/routes/users.py`)

只負責驗證 + 呼叫 service + 回傳 schema。

```python
from fastapi import APIRouter, status

from ..deps import DBSession
from ...schemas.users import UserCreate, UserOut, UserUpdate
from ...services.users import UserService

router = APIRouter()


@router.post("", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate, db: DBSession):
    return await UserService(db).create(payload)


@router.get("/{user_id}", response_model=UserOut)
async def get_user(user_id: int, db: DBSession):
    return await UserService(db).get(user_id)


@router.patch("/{user_id}", response_model=UserOut)
async def update_user(user_id: int, payload: UserUpdate, db: DBSession):
    return await UserService(db).update(user_id, payload)
```

## 4. 註冊到 main.py

```python
from .api.routes import users
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
```

## 分頁 Pattern

```python
from typing import Generic, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class Page(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    page_size: int


# Query 參數
from typing import Annotated
from fastapi import Query

PageQuery = Annotated[int, Query(ge=1)]
PageSizeQuery = Annotated[int, Query(ge=1, le=100)]


@router.get("", response_model=Page[UserOut])
async def list_users(
    db: DBSession,
    page: PageQuery = 1,
    page_size: PageSizeQuery = 20,
):
    items, total = await UserService(db).list(page, page_size)
    return Page(items=items, total=total, page=page, page_size=page_size)
```

## 錯誤回應格式（統一）

由 `core/exceptions.py` 的 handler 自動轉換為：

```json
{
  "code": "not_found",
  "message": "User not found"
}
```

## Route 命名與 HTTP 方法

| 動作 | Method | Path | Status |
|------|--------|------|--------|
| 列表 | GET | `/users` | 200 |
| 取得 | GET | `/users/{id}` | 200 |
| 建立 | POST | `/users` | 201 |
| 完整更新 | PUT | `/users/{id}` | 200 |
| 部分更新 | PATCH | `/users/{id}` | 200 |
| 刪除 | DELETE | `/users/{id}` | 204 |

## 測試範本

```python
async def test_create_user(client):
    resp = await client.post("/api/v1/users", json={
        "email": "a@b.com", "name": "A", "password": "12345678",
    })
    assert resp.status_code == 201
    assert resp.json()["email"] == "a@b.com"


async def test_create_user_conflict(client, existing_user):
    resp = await client.post("/api/v1/users", json={
        "email": existing_user.email, "name": "X", "password": "12345678",
    })
    assert resp.status_code == 409
    assert resp.json()["code"] == "conflict"
```
