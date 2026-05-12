---
name: python-tw-stock-microservice
description: "建立台股分析 Python 微服務專案。使用 FastAPI + uv + ruff + pytest 現代工具鏈，產生乾淨的 src layout 專案結構，供 Node.js Gateway API 呼叫。觸發時機：(1) 建立新的台股分析 Python 微服務 (2) 建立 FastAPI 微服務專案 (3) 需要台股資料 API 整合的 Python 後端 (4) 建立供 Node.js gateway 呼叫的 Python 服務"
---

# Python 台股分析微服務建立器

從零建立一個台股分析 Python FastAPI 微服務專案，供 Node.js Gateway API 呼叫。

## 建立流程

### 1. 確認需求

向使用者確認：
- 專案名稱（預設：`tw-stock-analyzer`）
- 目標路徑
- 需要的台股功能（股價查詢、技術指標、法人買賣超、財報等）
- 是否需要資料庫（SQLite / PostgreSQL）
- 是否需要 Docker 部署

### 2. 初始化專案

使用 `uv` 建立專案：

```bash
uv init {project_name}
cd {project_name}
uv add fastapi "uvicorn[standard]" pydantic pydantic-settings httpx
uv add --dev pytest pytest-asyncio pytest-cov ruff mypy
```

### 3. 建立目錄結構

依照 [references/project-structure.md](references/project-structure.md) 建立 src layout 結構。

核心目錄：
```
src/{package_name}/
├── main.py          # FastAPI app + CORS + router 註冊
├── api/routes/      # HTTP 端點
├── core/config.py   # Pydantic Settings
├── schemas/         # Request/Response 模型
└── services/        # 業務邏輯 + 外部 API 呼叫
```

### 4. 實作核心檔案

#### main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.routes import stock, health

app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(stock.router, prefix="/api/v1", tags=["stock"])
```

#### core/config.py

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "TW Stock Analyzer"
    cors_origins: list[str] = ["http://localhost:3000"]
    debug: bool = False

    model_config = {"env_file": ".env"}

settings = Settings()
```

#### API 端點設計

統一前綴 `/api/v1/`，回傳 JSON：

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/health` | 健康檢查 |
| GET | `/api/v1/stock/{code}/quote` | 個股即時報價 |
| GET | `/api/v1/stock/{code}/history` | 歷史 K 線 |
| GET | `/api/v1/stock/{code}/indicators` | 技術指標 |
| GET | `/api/v1/stock/market/overview` | 大盤總覽 |
| GET | `/api/v1/stock/institutional/{code}` | 法人買賣超 |

### 5. 設定工具鏈

依照 [references/toolchain.md](references/toolchain.md) 設定：
- `pyproject.toml`（ruff、pytest、mypy 設定）
- `Makefile`（dev、test、lint、format 指令）
- `Dockerfile` + `docker-compose.yml`
- `.env.example`、`.gitignore`

### 6. 撰寫測試

```python
# tests/conftest.py
import pytest
from httpx import ASGITransport, AsyncClient
from src.{package_name}.main import app

@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:
        yield ac

# tests/test_health.py
async def test_health(client):
    resp = await client.get("/health")
    assert resp.status_code == 200
```

### 7. 驗證啟動

```bash
uv run uvicorn src.{package_name}.main:app --reload --port 8000
# 瀏覽 http://localhost:8000/docs 確認 OpenAPI 文件
# 測試 http://localhost:8000/health
```

## 台股資料來源

詳見 [references/tw-stock-apis.md](references/tw-stock-apis.md)：
- TWSE 證交所 OpenAPI（免費、無需 key）
- TPEX 櫃買中心
- FinMind 開源金融數據
- Yahoo Finance（yfinance）

## Node.js Gateway 整合重點

- FastAPI 服務預設 port `8000`，Gateway 透過 HTTP/JSON 呼叫
- 啟用 CORS middleware，允許 Gateway 來源
- 提供 `/health` 端點供 Gateway 健康檢查
- 錯誤回傳標準 HTTP status code + `{ "detail": "..." }` 格式
- OpenAPI 文件自動產生於 `/docs`，方便 Gateway 開發者參考
