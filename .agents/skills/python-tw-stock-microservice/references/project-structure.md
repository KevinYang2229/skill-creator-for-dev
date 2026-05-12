# Python 台股微服務專案結構

## 標準目錄結構（src layout）

```
{project_name}/
├── src/
│   └── {package_name}/
│       ├── __init__.py
│       ├── main.py                 # FastAPI app 入口
│       ├── api/
│       │   ├── __init__.py
│       │   ├── deps.py             # 共用依賴注入（DB session、auth 等）
│       │   └── routes/
│       │       ├── __init__.py
│       │       ├── health.py       # GET /health 健康檢查
│       │       └── stock.py        # 股票相關 endpoints
│       ├── core/
│       │   ├── __init__.py
│       │   ├── config.py           # Pydantic Settings 設定管理
│       │   └── exceptions.py       # 自訂例外與錯誤處理
│       ├── models/
│       │   ├── __init__.py
│       │   └── stock.py            # SQLAlchemy / ORM models
│       ├── schemas/
│       │   ├── __init__.py
│       │   └── stock.py            # Pydantic request/response schemas
│       └── services/
│           ├── __init__.py
│           └── stock_service.py    # 業務邏輯層
├── tests/
│   ├── __init__.py
│   ├── conftest.py                 # pytest fixtures
│   ├── test_health.py
│   └── test_stock.py
├── pyproject.toml                  # 專案設定（uv / ruff / pytest）
├── uv.lock                         # uv 鎖定檔
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
└── Makefile                        # 常用指令捷徑
```

## 命名規則

- 專案資料夾：`kebab-case`（例：`tw-stock-analyzer`）
- Python 套件名：`snake_case`（例：`tw_stock_analyzer`）
- 模組與檔案：`snake_case.py`
- 類別名：`PascalCase`
- 函式與變數：`snake_case`

## 各層職責

| 層級 | 職責 | 範例 |
|------|------|------|
| `api/routes/` | HTTP 端點定義、參數驗證 | 接收請求 → 呼叫 service → 回傳 response |
| `schemas/` | Pydantic 資料模型 | `StockQuoteRequest`, `StockQuoteResponse` |
| `services/` | 業務邏輯、外部 API 呼叫 | 抓取股價、計算技術指標 |
| `models/` | 資料庫 ORM 模型 | `StockPrice`, `StockInfo` |
| `core/` | 設定、例外、共用工具 | 環境變數管理、錯誤碼定義 |
| `api/deps.py` | 依賴注入 | DB session、API key 驗證 |
