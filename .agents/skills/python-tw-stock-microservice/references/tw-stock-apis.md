# 台股資料來源與 API

## 免費資料來源

### TWSE 證交所 OpenAPI
- 基礎 URL: `https://openapi.twse.com.tw/v1`
- 無需 API Key
- 常用端點：

| 端點 | 說明 |
|------|------|
| `/exchangeReport/STOCK_DAY_ALL` | 當日全部股票收盤行情 |
| `/exchangeReport/STOCK_DAY?stockNo={code}` | 個股日成交資訊 |
| `/exchangeReport/MI_INDEX` | 大盤指數 |
| `/exchangeReport/BWIBBU_ALL` | 全部個股本益比、殖利率 |
| `/fund/T86` | 三大法人買賣超 |

### TPEX 櫃買中心
- 基礎 URL: `https://www.tpex.org.tw/openapi/v1`
- 上櫃股票資料

### FinMind 開源金融數據
- URL: `https://api.finmindtrade.com/api/v4/data`
- 免費額度：每日 600 次
- 支援：股價、法人買賣、融資融券、財報等

### Yahoo Finance（yfinance）
- Python 套件：`yfinance`
- 台股代碼格式：`{股票代碼}.TW`（上市）、`{股票代碼}.TWO`（上櫃）
- 適合取得歷史K線、基本面資料

## httpx 呼叫範例

```python
import httpx

async def fetch_stock_day_all() -> list[dict]:
    """取得當日全部股票收盤行情"""
    url = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL"
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(url)
        resp.raise_for_status()
        return resp.json()

async def fetch_stock_day(stock_no: str) -> list[dict]:
    """取得個股日成交資訊"""
    url = f"https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&stockNo={stock_no}"
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(url)
        resp.raise_for_status()
        return resp.json()
```

## 常見台股技術指標計算

建議使用 `ta`（Technical Analysis Library）或 `pandas_ta` 套件：

```toml
# pyproject.toml 額外依賴
dependencies = [
    # ...
    "pandas>=2.2",
    "ta>=0.11",
]
```

常用指標：MA、EMA、RSI、MACD、KD、布林通道

## Node.js Gateway 整合

FastAPI 微服務透過 REST API 與 Node.js Gateway 溝通：

```
Node.js Gateway  →  HTTP/JSON  →  FastAPI 微服務
    (port 3000)                      (port 8000)
```

### Gateway 呼叫範例（Node.js 端）

```javascript
// Node.js gateway 呼叫 Python 微服務
const response = await fetch('http://localhost:8000/api/v1/stock/2330/quote');
const data = await response.json();
```

### FastAPI 端點設計原則

- 統一前綴 `/api/v1/`
- 回傳格式統一為 JSON
- 錯誤回傳標準 HTTP status code + JSON body
- 提供 `/health` 端點供 Gateway 健康檢查
- 使用 CORS middleware 允許 Gateway 跨域請求
