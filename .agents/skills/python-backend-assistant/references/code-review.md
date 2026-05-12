# Python 後端程式碼審查 Checklist

按優先級審查，發現問題以「【嚴重度】檔案:行號 — 問題 — 建議」格式回報。

嚴重度：🔴 阻擋（安全/正確性） / 🟠 重要（架構/效能） / 🟡 建議（風格/可讀性）

---

## 1. 安全（🔴 優先）

- [ ] Secrets 是否走 env？grep 程式碼中有無 hard-coded API key、密碼、JWT secret
- [ ] SQL 是否一律 ORM 或 parameterized？無字串拼接（`f"SELECT ... {user_input}"`）
- [ ] 密碼是否用 bcrypt/argon2 hash？無 plaintext / md5 / sha1
- [ ] CORS `allow_origins` 是否明確列舉？無 `["*"]` + `allow_credentials=True` 組合
- [ ] User input 是否走 Pydantic 驗證？無 `request.json()` 直接信任
- [ ] 認證 endpoint 是否限制速率（rate limit）？登入 / 註冊 / 忘記密碼
- [ ] 檔案上傳是否驗證 size、MIME、副檔名？儲存路徑無 path traversal
- [ ] JWT 是否驗 signature + exp？token 是否在 logout 時 blacklist（若需要）

## 2. 架構與分層（🟠）

- [ ] Route 是否只做驗證 + 呼叫 service？無業務邏輯、無直接 SQL
- [ ] Service 是否框架無關？無 import `fastapi`、無 `raise HTTPException`
- [ ] Schema (Pydantic) 與 Model (SQLAlchemy) 是否分離？無互相 import
- [ ] Repository 是否封裝所有 DB 操作？service 不直接寫 `select()`
- [ ] 依賴是否走 `Depends`？無在 function 內 `Settings()` / 自建 session

## 3. 型別與 Pydantic（🟠）

- [ ] 所有 function 是否有 type hint？參數 + 回傳值
- [ ] 是否使用 Python 3.11+ 內建泛型？`list[int]` 而非 `List[int]`
- [ ] Pydantic 是否 v2 寫法？`model_config = ConfigDict(...)` 而非 `class Config`
- [ ] 是否避免 `Any`？特別是 public API
- [ ] Optional 是否用 `T | None` 而非 `Optional[T]`（Python 3.10+）

## 4. async / 並行（🟠）

- [ ] endpoint / service / repo 是否一致 async？無 sync function 卡住 event loop
- [ ] 同步 IO（檔案、CPU 重）是否用 `run_in_threadpool` / `asyncio.to_thread`？
- [ ] 是否用 `asyncio.gather` 並行獨立 await？無 sequential await
- [ ] httpx 是否用 `AsyncClient` 而非 `requests`？
- [ ] DB session 是否每 request 一個？無在 module level 共用

## 5. 錯誤處理（🟠）

- [ ] 是否定義 domain exception（`AppException` 家族）？
- [ ] 是否註冊 global exception handler？回應格式統一
- [ ] 是否避免 bare `except:` / `except Exception`？至少 log 詳情後 re-raise
- [ ] 4xx vs 5xx 分類是否正確？user error 不要回 500

## 6. 資料庫（🟠）

- [ ] N+1 查詢？grep 迴圈內 await query；應使用 `selectinload` / `joinedload`
- [ ] 是否有 index？高頻 WHERE / ORDER BY / JOIN 欄位
- [ ] Migration 是否人工檢查？無 autogenerate 直接 commit
- [ ] 大表變更是否考慮鎖表？避免線上 down time
- [ ] Transaction 邊界是否清楚？session.commit / rollback 一致

## 7. 效能（🟡）

- [ ] Pagination 預設 / 上限是否合理？避免 `?page_size=10000`
- [ ] 重複計算是否 cache？`functools.lru_cache` 或外部 cache
- [ ] Response 是否避免回傳超大 list？必要時 streaming

## 8. 測試（🟡）

- [ ] 是否有 happy path + 錯誤路徑測試？至少 4xx
- [ ] 外部 API 是否 mock？無打真實 LLM / 第三方服務
- [ ] DB 測試是否用 transaction rollback fixture？無互相污染
- [ ] async 測試是否用 `pytest-asyncio` + `AsyncClient`？

## 9. 風格（🟡）

- [ ] ruff 是否通過？`uv run ruff check`
- [ ] mypy 是否通過？`uv run mypy src/`
- [ ] Import 順序：stdlib → 第三方 → local
- [ ] 命名：function/變數 snake_case、class CamelCase、常數 UPPER
- [ ] Docstring：public function 有 short description（必要時加 Args / Returns）

## 10. AI 整合特有（🟠）

- [ ] API key 走 env？
- [ ] 是否設定 timeout（30~60s）？
- [ ] 是否有重試機制（tenacity）？只重試可重試錯誤
- [ ] 是否記錄 token usage / cost？
- [ ] PII 是否過濾？敏感資料不送進 LLM
- [ ] 是否有 budget guard（daily/monthly cap）？

---

## 回報範本

```
## Code Review 結果

### 🔴 阻擋（必須修）
1. **src/api/routes/auth.py:42** — JWT secret 寫死在程式碼中
   → 改用 `settings.jwt_secret`

### 🟠 重要（應該修）
1. **src/services/users.py:18** — service 內 raise HTTPException，破壞分層
   → 改 raise `ConflictError`，由 handler 轉換

2. **src/repositories/orders.py:55** — N+1 查詢（迴圈內取 user）
   → 用 `select(Order).options(selectinload(Order.user))`

### 🟡 建議
1. **src/schemas/users.py** — 仍使用 Pydantic v1 `class Config`
   → 改 `model_config = ConfigDict(from_attributes=True)`

### 結論
- 阻擋項：1
- 重要項：2
- 建議項：1
- 整體：架構分層清楚，但有 1 處安全問題與 1 處效能問題需處理。
```
