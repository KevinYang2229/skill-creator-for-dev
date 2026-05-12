---
name: python-backend-assistant
description: "Python 後端開發助理，以 FastAPI 為核心建立、擴充、審查現代 Python 後端專案。用於：(1) 建立新的 FastAPI 後端專案（uv + ruff + pytest + Pydantic v2 + SQLAlchemy 2.x + Alembic 主流組合），(2) 在既有專案中新增 API endpoint、router、service、schema 模組，(3) 整合資料庫（SQLAlchemy 2.x async + Alembic migration + CRUD pattern），(4) 建立呼叫 AI API 的端口（OpenAI / Anthropic / 其他 LLM 服務的 wrapper、串流、重試、cost tracking），(5) 審查 Python 後端程式碼品質（架構、型別、安全、效能、測試覆蓋）。當使用者提到 Python 後端、FastAPI、建立 Python API、新增 endpoint、SQLAlchemy、Alembic migration、Pydantic schema、async API、AI API wrapper、LLM 整合、OpenAI 串接、Anthropic 串接、Python 後端 code review、後端架構設計時觸發此技能。所有產出為繁體中文。"
---

# Python 後端開發助理

以 FastAPI 為核心，協助建立、擴充、審查現代 Python 後端專案。

## 推薦技術棧（2026 主流）

| 類別 | 工具 | 用途 |
|------|------|------|
| Package Manager | `uv` | 取代 pip / poetry，速度快、lockfile 一致 |
| Web Framework | `FastAPI` | async、自動 OpenAPI、Pydantic 整合 |
| Validation | `Pydantic v2` | Request/Response 驗證、Settings |
| ORM | `SQLAlchemy 2.x` (async) | Type-safe ORM、async session |
| Migration | `Alembic` | DB schema 版本管理 |
| HTTP Client | `httpx` (async) | 取代 requests，支援 async |
| Linter/Formatter | `ruff` | 取代 black/flake8/isort |
| Type Checker | `mypy` 或 `pyright` | 靜態型別檢查 |
| Test | `pytest` + `pytest-asyncio` | async 測試 |
| Logging | `structlog` | 結構化日誌 |
| AI SDK | `openai` / `anthropic` | LLM 呼叫官方 SDK |

## 五大核心能力

啟動時，先確認使用者要做哪件事，再進入對應子流程：

1. **建立新專案** → 走 [流程 A](#流程-a建立新-fastapi-專案)
2. **新增 API endpoint／模組** → 讀 [references/api-patterns.md](references/api-patterns.md)
3. **整合資料庫（SQLAlchemy + Alembic）** → 讀 [references/database.md](references/database.md)
4. **建立呼叫 AI API 的端口** → 讀 [references/ai-integration.md](references/ai-integration.md)
5. **程式碼審查** → 讀 [references/code-review.md](references/code-review.md)

---

## 流程 A：建立新 FastAPI 專案

### 1. 確認需求

向使用者確認以下項目（一次只問必要的，避免轟炸）：

- 專案名稱（kebab-case，如 `my-api`）
- 目標路徑
- 是否需要資料庫？（無 / SQLite / PostgreSQL / MySQL）
- 是否需要 AI API 整合？（無 / OpenAI / Anthropic / 兩者）
- 是否需要 Docker 部署？
- 是否需要認證？（無 / JWT / OAuth2）

### 2. 初始化專案

```bash
uv init {project_name}
cd {project_name}

# 核心
uv add fastapi "uvicorn[standard]" pydantic pydantic-settings httpx structlog

# 資料庫（若需要）
uv add sqlalchemy alembic asyncpg          # PostgreSQL
# 或 aiosqlite                              # SQLite
# 或 aiomysql                               # MySQL

# AI（若需要）
uv add openai anthropic tenacity            # tenacity 用於重試

# 認證（若需要）
uv add "python-jose[cryptography]" "passlib[bcrypt]"

# Dev 依賴
uv add --dev pytest pytest-asyncio pytest-cov ruff mypy respx
```

### 3. 建立目錄結構（src layout）

```
{project_name}/
├── pyproject.toml
├── .env.example
├── .gitignore
├── README.md
├── Makefile
├── alembic.ini                  # 若有 DB
├── alembic/                     # 若有 DB
│   ├── env.py
│   └── versions/
├── src/{package_name}/
│   ├── __init__.py
│   ├── main.py                  # FastAPI app + lifespan + router 註冊
│   ├── core/
│   │   ├── config.py            # Pydantic Settings
│   │   ├── logging.py           # structlog 設定
│   │   ├── security.py          # JWT、密碼 hash（若有認證）
│   │   └── exceptions.py        # 自訂 Exception + handler
│   ├── api/
│   │   ├── deps.py              # Depends（取得 session、current_user）
│   │   └── routes/
│   │       ├── health.py
│   │       └── {feature}.py
│   ├── schemas/                 # Pydantic Request/Response
│   │   └── {feature}.py
│   ├── models/                  # SQLAlchemy models（若有 DB）
│   │   └── {feature}.py
│   ├── services/                # 業務邏輯
│   │   └── {feature}.py
│   ├── repositories/            # DB 操作（若有 DB）
│   │   └── {feature}.py
│   ├── db/                      # 若有 DB
│   │   ├── base.py              # DeclarativeBase
│   │   └── session.py           # async engine + session factory
│   └── integrations/            # 第三方 API（含 AI）
│       └── {provider}.py
└── tests/
    ├── conftest.py
    ├── test_health.py
    └── test_{feature}.py
```

詳細目錄職責與核心檔案範本（main.py / config.py / deps.py / exceptions.py）：
[references/project-structure.md](references/project-structure.md)

### 4. 設定工具鏈

`pyproject.toml`、`Makefile`、`Dockerfile`、`.env.example`、`.gitignore` 範本見
[references/toolchain.md](references/toolchain.md)。

### 5. 驗證啟動

```bash
make dev    # uv run uvicorn src.{package_name}.main:app --reload
# 開啟 http://localhost:8000/docs 確認 OpenAPI
make test   # 確認測試通過
make lint   # 確認 ruff 通過
```

---

## 共通規範（無論流程）

### 命名與架構

- **分層清楚**：`routes` → `services` → `repositories`，不要在 route 直接寫 SQL 或業務邏輯。
- **Router 不寫業務邏輯**：route function 只負責驗證 + 呼叫 service + 回傳 schema。
- **依賴注入用 `Depends`**：DB session、current_user、settings 全部走 FastAPI DI。
- **Schema vs Model 分離**：`schemas/` 是 Pydantic（API 介面），`models/` 是 SQLAlchemy（DB 結構），不要混用。
- **async 一致**：endpoint、service、repository 全部 async；同步 IO 用 `run_in_threadpool`。

### 型別

- 全面使用 type hints；Python 3.11+ 用內建泛型（`list[int]` 而非 `List[int]`）。
- Pydantic v2 用 `BaseModel` + `Field`，避免使用 v1 的 `Config` 內部類別（改用 `model_config = ConfigDict(...)`）。

### 錯誤處理

- 自訂 `AppException` 家族於 `core/exceptions.py`，並註冊 global handler。
- 不要在 service 層 raise `HTTPException`（讓 service 層保持框架無關）；在 route 或 handler 層轉換。

### 測試

- 用 `pytest-asyncio` + `httpx.AsyncClient(transport=ASGITransport(app))`。
- DB 測試用獨立 schema 或 transaction rollback fixture。
- AI API 用 `respx` 或 mock SDK，不要打真的 API。

### 安全

- Secrets 一律走 env（Pydantic Settings + `.env`），絕不寫死。
- 啟用 CORS 但限制 origins。
- 所有 user input 走 Pydantic 驗證。
- DB 查詢用 ORM 或 parameterized query，禁止字串拼接 SQL。

---

## 進階主題（依需求載入）

- [references/project-structure.md](references/project-structure.md) — 目錄職責、main.py / config.py / deps.py / exceptions.py 範本
- [references/api-patterns.md](references/api-patterns.md) — Router / Service / Schema / Pagination / Error 範本
- [references/database.md](references/database.md) — SQLAlchemy 2.x async、Alembic 流程、Repository pattern
- [references/ai-integration.md](references/ai-integration.md) — OpenAI / Anthropic wrapper、串流、重試、cost tracking
- [references/code-review.md](references/code-review.md) — 審查 checklist（架構、型別、安全、效能、測試）
- [references/toolchain.md](references/toolchain.md) — pyproject.toml、Makefile、Dockerfile、ruff/mypy/pytest 設定
