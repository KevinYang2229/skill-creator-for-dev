# API 設計慣例

## RESTful 路徑命名

| 動作 | Method | Path 範例 |
|---|---|---|
| 列表查詢 | GET | `/api/leave/applications` |
| 取得單筆 | GET | `/api/leave/applications/{id}` |
| 建立 | POST | `/api/leave/applications` |
| 全量更新 | PUT | `/api/leave/applications/{id}` |
| 部分更新 | PATCH | `/api/leave/applications/{id}` |
| 刪除 | DELETE | `/api/leave/applications/{id}` |
| 動作型 | POST | `/api/leave/applications/{id}/approve` |
| 試算/驗證 | POST | `/api/leave/calculate-hours` |
| 子資源 | GET | `/api/users/{id}/leave-balance` |

### 規則
- 資源名用**複數**且 kebab-case
- 巢狀**最多兩層**
- 動詞型 endpoint 僅用於不適合 CRUD 的場景（calculate、validate、preview、export）

## 欄位命名

- JSON 欄位：camelCase（`startDateTime`、`totalHours`）
- 列舉值：SCREAMING_SNAKE_CASE（`ANNUAL`、`PENDING`、`DIRECT_MANAGER`）
- ID 後綴：`userId`、`fileId`、`applicationId`
- 布林值前綴：`is`、`has`、`can`、`need`（`isProxyApply`、`canDelegate`、`needAttachment`）
- 時間欄位：`createdAt`、`updatedAt`、`submittedAt`、`expireDate`

## 標準回應結構

### 列表

```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "size": 20
}
```

### 錯誤

```json
{
  "code": "ERROR_CODE",
  "message": "人類可讀訊息",
  "errors": [
    { "field": "fieldName", "code": "FIELD_ERROR_CODE", "message": "..." }
  ]
}
```

## 常見 HTTP Status Code

| Code | 用途 |
|---|---|
| 200 | 查詢/動作成功 |
| 201 | 建立成功 |
| 204 | 刪除/無內容成功 |
| 400 | 參數格式錯誤 |
| 401 | 未登入 / token 失效 |
| 403 | 已登入但無權限 |
| 404 | 資源不存在 |
| 409 | 狀態衝突（重複建立、版本不符） |
| 422 | 業務驗證失敗（餘額不足、欄位邏輯錯誤） |
| 500 | 伺服器錯誤 |

## 常見業務錯誤碼

| Code | 情境 |
|---|---|
| `INVALID_RANGE` | 起訖時間/數值範圍不合理 |
| `INSUFFICIENT_BALANCE` | 餘額/額度不足 |
| `RESOURCE_CONFLICT` | 資源衝突（時段、唯一鍵） |
| `AGENT_CONFLICT` | 代理人衝突 |
| `FILE_TOO_LARGE` | 檔案超過大小上限 |
| `UNSUPPORTED_FILE_TYPE` | 不支援的檔案類型 |
| `PERMISSION_DENIED` | 權限不足 |
| `RESOURCE_NOT_FOUND` | 資源不存在 |
| `DUPLICATE_SUBMISSION` | 重複送出（idempotency） |

## 範例值原則

- **使用者**：`HYW032`、`Alex 蔡承恩`、`alex@hyweb.com.tw`
- **時間**：`2026-05-04T09:00:00+08:00`（含時區）
- **金額**：整數（`12000`）或字串（`"12000.00"`），全文件統一
- **ID**：有意義前綴 + 流水或 ULID（`LV20260427001`、`att_01HZX1...`）
- ❌ 避免 `string`、`xxx`、`test123` 等無意義值

## 非功能性建議

| 項目 | 建議 |
|---|---|
| 認證 | Bearer Token in `Authorization` header |
| 冪等性 | 建立類 API 接受 `Idempotency-Key` header |
| 分頁 | 預設 `page=1`、`size=20`，最大 `size=100` |
| 排序 | `sort=field:asc,field2:desc` |
| 搜尋 | `keyword` 統一參數名 |
| 上傳 | `multipart/form-data`，回傳 `fileId` 由其他 API 引用 |
| 日期 | ISO 8601 帶時區，禁止使用 epoch 數字 |
| 在地化 | 錯誤訊息只回 `code`，文字由前端 i18n 對應 |
