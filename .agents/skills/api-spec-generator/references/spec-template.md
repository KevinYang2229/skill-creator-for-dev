# API 規格文件範本

完整參考範例可見 [../assets/example-leave-application-api.md](../assets/example-leave-application-api.md)。

## 文件骨架

```markdown
# {頁面/功能名稱} - API 規劃

## 一、API 功能清單

### 1. 頁面初始化相關

| # | API 名稱 | Method | Endpoint | 用途 | 時機 |
|---|---------|--------|----------|------|------|
| 1 | 載入表單初始資料 | GET | `/api/leave/form/init` | 取得下拉選項與預設值 | 進入頁面 |

### 2. 人員選擇相關
...

### 3. 計算/驗證相關
...

### 4. 附件相關
...

### 5. 表單送出相關
...

---

## 二、API 詳細規格

### API 1. {簡短描述}

​```
GET /api/leave/form/init
​```

**Response 200**

​```json
{ "field": "value" }
​```

---

### API N. {建立資源範例}

​```
POST /api/leave/applications
​```

**Request**

​```json
{
  "leaveType": "ANNUAL",
  "startDateTime": "2026-05-04T09:00:00+08:00"
}
​```

**Response 201**

​```json
{
  "applicationId": "LV20260427001",
  "status": "PENDING"
}
​```

**Response 422**：欄位驗證錯誤
**Response 409**：業務衝突（餘額不足、時間衝突）

---

## 三、實作建議

| 項目 | 建議 |
|------|------|
| 表單驗證 | 前端 zod schema + 伺服器端驗證 API 雙重把關 |
| 即時計算 | onChange 後 debounce 500ms 呼叫，避免頻繁請求 |
| 附件上傳 | 並行上傳 + 進度條，失敗單檔 retry |
| 冪等性 | 建立類 API 帶 idempotencyKey 避免重複送出 |
| 錯誤處理 | 統一以 code 對應 i18n 訊息 |
```

## 群組命名建議

| 群組編號 | 標題範例 |
|---|---|
| 1 | 頁面初始化相關 / 主檔載入相關 |
| 2 | 人員選擇相關 / 組織查詢相關 |
| 3 | 時間計算相關 / 試算相關 / 連動驗證相關 |
| 4 | 附件相關 / 檔案管理相關 |
| 5 | 表單送出相關 / 流程簽核相關 |

## API 條目格式要點

- **Code block 標 method + path**：純文字 code block，不指定語法
- **Request/Response 用 JSON code block**
- **Query / Path / Form 參數**用 bullet 條列：`- field (型別, 限制): 說明`
- **多種錯誤情境**用「Response 4xx：說明」短行列出
- **每支 API 用 `---` 分隔**
