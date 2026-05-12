# 填寫請假申請 - API 規劃

## 一、API 功能清單

### 1. 頁面初始化相關

| # | API 名稱 | Method | Endpoint | 用途 | 時機 |
|---|---------|--------|----------|------|------|
| 1 | 取得表單初始資料 | GET | `/api/leave/form/init` | 取得當前使用者、填單時間、預設值 | 進入頁面 |
| 2 | 取得假別下拉選單 | GET | `/api/leave/types` | 取得年假、事假、病假等假別清單 | 進入頁面 |
| 3 | 取得假別簽核規則 | GET | `/api/leave/types/{leaveType}/rules` | 取得該假別簽核規則（如休假超過 56 小時需總經理簽核） | 切換假別時 |
| 4 | 取得剩餘假別時數 | GET | `/api/users/me/leave-balance` | 取得申請人剩餘假別時數 | 進入頁面/切換假別 |

### 2. 人員選擇相關

| # | API 名稱 | Method | Endpoint | 用途 | 時機 |
|---|---------|--------|----------|------|------|
| 5 | 搜尋申請人 | GET | `/api/users/search` | 搜尋申請人（代人申請時） | 點擊「+ 申請人」 |
| 6 | 搜尋職務代理人 | GET | `/api/users/agents` | 搜尋同部門/可代理人員 | 點擊「+ 代理人」 |
| 7 | 查詢代理人衝突表單 | GET | `/api/users/{userId}/pending-forms` | 確認代理人是否有衝突表單 | 勾選「同時代理所有表單」 |

### 3. 時間計算相關

| # | API 名稱 | Method | Endpoint | 用途 | 時機 |
|---|---------|--------|----------|------|------|
| 8 | 計算請假時數 | POST | `/api/leave/calculate-hours` | 依開始/結束時間計算共計時數（扣除假日、午休） | 選定起訖時間後 |
| 9 | 取得國定假日 | GET | `/api/calendar/holidays` | 於 DatePicker 標示國定假日 | 開啟日期選單 |

### 4. 附件相關

| # | API 名稱 | Method | Endpoint | 用途 | 時機 |
|---|---------|--------|----------|------|------|
| 10 | 上傳附件 | POST | `/api/attachments/upload` | 上傳 JPG/PNG/PDF/Docx，10MB 上限 | 拖曳/選擇檔案 |
| 11 | 刪除附件 | DELETE | `/api/attachments/{fileId}` | 刪除已上傳附件 | 點擊刪除 |

### 5. 表單送出相關

| # | API 名稱 | Method | Endpoint | 用途 | 時機 |
|---|---------|--------|----------|------|------|
| 12 | 送出前驗證 | POST | `/api/leave/applications/validate` | 驗證餘額、衝突、簽核流程 | 點擊「確定」前 |
| 13 | 建立請假申請 | POST | `/api/leave/applications` | 建立請假申請並送簽 | 點擊「確定」 |
| 14 | 預覽簽核流程 | GET | `/api/leave/applications/{id}/approval-flow` | 預覽即將觸發的簽核流程 | 送出前確認 |

---

## 二、API 詳細規格

### API 1. 取得表單初始資料

```
GET /api/leave/form/init
```

**Response 200**

```json
{
  "submitTime": "2026-04-27T09:33:00+08:00",
  "applicant": {
    "userId": "HYW032",
    "name": "Alex 蔡承恩",
    "displayName": "Alex 蔡承恩(HYW032)",
    "department": "資訊部",
    "canDelegate": true
  },
  "defaultLeaveType": "ANNUAL"
}
```

---

### API 2. 取得假別清單

```
GET /api/leave/types
```

**Response 200**

```json
{
  "items": [
    { "code": "ANNUAL",   "name": "年假",   "unit": "HOUR", "needAttachment": false },
    { "code": "PERSONAL", "name": "事假",   "unit": "HOUR", "needAttachment": false },
    { "code": "SICK",     "name": "病假",   "unit": "HOUR", "needAttachment": true,  "attachmentThresholdHours": 24 },
    { "code": "MARRIAGE", "name": "婚假",   "unit": "DAY",  "needAttachment": true },
    { "code": "FUNERAL",  "name": "喪假",   "unit": "DAY",  "needAttachment": true }
  ]
}
```

---

### API 3. 取得假別簽核規則

```
GET /api/leave/types/{leaveType}/rules
```

**Response 200**

```json
{
  "leaveType": "ANNUAL",
  "approvalRules": [
    {
      "id": "RULE_LT_56",
      "label": "休假未滿 56 小時由主管簽核",
      "thresholdHours": { "lt": 56 },
      "approvers": ["DIRECT_MANAGER"]
    },
    {
      "id": "RULE_GTE_56",
      "label": "休假超過56小時(含)以上需送總經理簽核",
      "thresholdHours": { "gte": 56 },
      "approvers": ["DIRECT_MANAGER", "DEPT_HEAD", "CEO"]
    }
  ]
}
```

---

### API 4. 取得剩餘假別時數

```
GET /api/users/me/leave-balance?leaveType=ANNUAL&year=2026
```

**Response 200**

```json
{
  "leaveType": "ANNUAL",
  "year": 2026,
  "totalHours": 112,
  "usedHours": 24,
  "pendingHours": 8,
  "remainingHours": 80,
  "expireDate": "2026-12-31"
}
```

---

### API 5. 搜尋使用者（申請人 / 代理人共用）

```
GET /api/users/search?keyword=蔡&scope=ALL&excludeSelf=true&page=1&size=20
```

**Query**

- `keyword` (string, required, ≥1)
- `scope`: `ALL` | `SAME_DEPT` | `AGENT_CANDIDATE`
- `excludeSelf` (boolean)

**Response 200**

```json
{
  "items": [
    {
      "userId": "HYW032",
      "name": "蔡承恩",
      "displayName": "Alex 蔡承恩(HYW032)",
      "department": "資訊部",
      "title": "前端工程師",
      "email": "alex@hyweb.com.tw"
    }
  ],
  "total": 1,
  "page": 1,
  "size": 20
}
```

---

### API 6. 確認代理人是否可同時代理所有表單

```
GET /api/users/{userId}/pending-forms?startTime=...&endTime=...
```

**Response 200**

```json
{
  "userId": "HYW015",
  "canDelegateAll": true,
  "conflictForms": [],
  "warnings": []
}
```

> 若有衝突，`conflictForms` 內含 `formId`、`formType`、`period`，前端需提示。

---

### API 7. 計算請假時數

```
POST /api/leave/calculate-hours
```

**Request**

```json
{
  "leaveType": "ANNUAL",
  "startDateTime": "2026-05-04T09:00:00+08:00",
  "endDateTime":   "2026-05-06T18:00:00+08:00",
  "applicantId":   "HYW032"
}
```

**Response 200**

```json
{
  "totalHours": 24,
  "totalDays": 3,
  "breakdown": [
    { "date": "2026-05-04", "hours": 8, "isHoliday": false },
    { "date": "2026-05-05", "hours": 8, "isHoliday": false },
    { "date": "2026-05-06", "hours": 8, "isHoliday": false }
  ],
  "skippedHolidays": []
}
```

**Response 400**

```json
{ "code": "INVALID_RANGE", "message": "結束時間需晚於開始時間" }
```

---

### API 8. 取得月份國定假日

```
GET /api/calendar/holidays?year=2026&month=5
```

**Response 200**

```json
{
  "items": [
    { "date": "2026-05-01", "name": "勞動節", "type": "NATIONAL_HOLIDAY" }
  ]
}
```

---

### API 9. 上傳附件

```
POST /api/attachments/upload
Content-Type: multipart/form-data
```

**Form fields**

- `file` (binary, required, ≤10MB, 副檔名 jpg/png/pdf/docx)
- `formCategory`: `LEAVE`

**Response 200**

```json
{
  "fileId": "att_01HZX1...",
  "fileName": "醫療證明.pdf",
  "fileSize": 248321,
  "mimeType": "application/pdf",
  "uploadedAt": "2026-04-27T09:35:21+08:00",
  "previewUrl": "/api/attachments/att_01HZX1.../preview"
}
```

**Response 400**：`FILE_TOO_LARGE`、`UNSUPPORTED_FILE_TYPE`

---

### API 10. 刪除附件

```
DELETE /api/attachments/{fileId}
```

**Response 204**

---

### API 11. 預覽簽核流程

```
POST /api/leave/applications/approval-flow/preview
```

**Request**

```json
{
  "leaveType": "ANNUAL",
  "totalHours": 56,
  "applicantId": "HYW032"
}
```

**Response 200**

```json
{
  "matchedRuleId": "RULE_GTE_56",
  "steps": [
    { "order": 1, "role": "DIRECT_MANAGER", "approverName": "王經理" },
    { "order": 2, "role": "DEPT_HEAD",      "approverName": "李協理" },
    { "order": 3, "role": "CEO",            "approverName": "張總經理" }
  ]
}
```

---

### API 12. 表單送出前驗證

```
POST /api/leave/applications/validate
```

**Request**：同建立 API（API 13）payload

**Response 200**

```json
{ "valid": true, "warnings": [] }
```

**Response 422**

```json
{
  "valid": false,
  "errors": [
    { "field": "totalHours", "code": "INSUFFICIENT_BALANCE", "message": "剩餘時數不足" },
    { "field": "agentId",    "code": "AGENT_CONFLICT",       "message": "代理人於該期間已有其他代理任務" }
  ]
}
```

---

### API 13. 建立請假申請（送簽）

```
POST /api/leave/applications
```

**Request**

```json
{
  "isProxyApply": false,
  "applicantId": "HYW032",
  "agentId": "HYW015",
  "agentDelegateAllForms": true,
  "leaveType": "ANNUAL",
  "approvalRuleId": "RULE_GTE_56",
  "startDateTime": "2026-05-04T09:00:00+08:00",
  "startHalfDay": "AM",
  "endDateTime": "2026-05-13T18:00:00+08:00",
  "endHalfDay": "PM",
  "totalHours": 56,
  "reason": "家庭旅遊",
  "attachmentIds": ["att_01HZX1..."]
}
```

**Response 201**

```json
{
  "applicationId": "LV20260427001",
  "status": "PENDING",
  "submittedAt": "2026-04-27T09:36:10+08:00",
  "currentApprover": { "userId": "HYW100", "name": "王經理" },
  "redirectUrl": "/pending_tasks"
}
```

**Response 422**：欄位驗證錯誤
**Response 409**：餘額不足或時間衝突

---

## 三、實作建議

| 項目 | 建議 |
|------|------|
| 表單驗證 | 前端 zod schema + API 12 雙重把關 |
| 時數計算 | onChange 後 debounce 500ms 呼叫 API 7，避免頻繁請求 |
| 附件上傳 | 採並行上傳 + 進度條，失敗單檔 retry |
| 假別/規則切換 | 切換假別時清空起訖時間並重新打 API 3、4 |
| 錯誤處理 | 統一以 `code` 對應 i18n 訊息，避免硬寫中文於前端 |
| 樂觀鎖 | API 13 可帶 `idempotencyKey` 避免重複送出 |
