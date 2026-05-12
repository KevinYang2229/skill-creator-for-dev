---
name: api-spec-generator
description: API 規格文件產生助理。根據使用者提供的素材（畫面截圖、PRD 產品需求文件、會議記錄、需求訪談紀錄、頁面 URL、UI 描述）分析所需 API，產出結構化的 Markdown 格式 API 規格文件。觸發時機：(1) 使用者要求「產出 API 規格 / API 文件 / API spec」(2) 使用者要求「列出這個頁面要呼叫的 API / 需要哪些 API」(3) 使用者附上頁面截圖或 PRD 並要求設計後端 API (4) 使用者要求「規劃 API / 設計 API endpoint」。產出包含：API 功能清單表、各 API 詳細規格（method、path、request、response、error code）、實作建議。所有產出為繁體中文。
---

# API Spec Generator

協助根據使用者提供的素材，產出 RESTful API 規格 Markdown 文件。

## 觸發條件

當使用者出現以下意圖時啟動：
- 「列出這個頁面有哪些 API」「需要呼叫哪些 API」
- 「規劃 / 設計 / 產出 API spec / API 規格 / API 文件」
- 提供 UI 截圖、PRD、會議記錄並請求後端 API 規劃

## 工作流程

### Step 1. 收集素材

若使用者只提供單一素材且資訊不足，**主動詢問補充**：
- UI 截圖 → 補問業務情境、欄位驗證規則、是否有審核流程
- PRD/會議記錄 → 補問頁面互動細節、即時計算需求
- 文字描述 → 補問參考截圖或畫面結構

避免一次問太多，一次最多 2–3 題。

### Step 2. 拆解 API 功能群組

依互動時機將 API 分組（順序固定）：

1. **頁面初始化** — 進入頁面時載入的資料、下拉選項、預設值
2. **人員/主檔查詢** — 使用者搜尋、組織查詢、選單帶值
3. **計算/驗證** — 即時試算、欄位連動、伺服器端驗證
4. **附件相關** — 上傳、刪除、預覽
5. **表單送出** — 送出前驗證、建立、預覽簽核流程

> 並非每個頁面都會有全部群組，依實際需求取捨。

### Step 3. 產出結構（嚴格遵循）

文件章節順序：

```
# {頁面名稱} - API 規劃

## 一、API 功能清單
  ### 1. {群組名稱}
  | # | API 名稱 | Method | Endpoint | 用途 | 時機 |
  ...

## 二、API 詳細規格
  ### API {編號}. {說明}
  ```
  {METHOD} {path}
  ```
  **Query / Request / Form fields**
  **Response 200**（含 JSON 範例）
  **Response 4xx**（含錯誤碼）

## 三、實作建議
  | 項目 | 建議 |
```

完整範本與 JSON 範例請見 [references/spec-template.md](references/spec-template.md)。

### Step 4. 命名與設計慣例

- **路徑**：`/api/{resource}` 採 kebab-case，資源用複數（`/api/leave/applications`）
- **HTTP method**：GET 查詢、POST 建立/動作、PUT 全量更新、PATCH 部分更新、DELETE 刪除
- **巢狀資源**：最多兩層（`/api/users/{id}/leave-balance`）
- **動作型 API**：以名詞 + 動作描述（`/api/leave/calculate-hours`、`/api/leave/applications/validate`）
- **時間格式**：ISO 8601 含時區（`2026-05-04T09:00:00+08:00`）
- **錯誤格式**：`{ "code": "ERROR_CODE", "message": "錯誤訊息" }`，code 採 SCREAMING_SNAKE_CASE
- **分頁**：`page`、`size`、回傳含 `total`、`items`
- **ID 命名**：`userId`、`fileId`、`applicationId`（camelCase + Id 後綴）

詳細命名規則與常見錯誤碼請見 [references/conventions.md](references/conventions.md)。

### Step 5. 必備欄位檢核

每支 API 至少要包含：
- ✅ Method + Path
- ✅ Query / Path / Body 參數說明（欄位名、型別、是否必填、約束）
- ✅ 至少一個成功 Response 範例（含真實感的範例值，避免 `string` `xxx`）
- ✅ 至少列出主要錯誤情境（400/401/403/404/409/422）

### Step 6. 輸出與儲存

- 預設**直接於對話輸出 Markdown**
- 若使用者要求存檔，預設路徑為當前專案的 `docs/{feature}-api.md`，存檔前確認路徑
- 結尾主動詢問：是否需要 OpenAPI YAML、TypeScript types、TanStack Query hooks 等延伸產物

## 品質檢查清單

產出前自我檢查：
- [ ] API 功能清單每一列都有 API 名稱、Method、Endpoint 三欄（Method 與 path 拆開）
- [ ] 清單表格的 Method + Endpoint 與「二、API 詳細規格」中的 method/path 完全一致
- [ ] API 功能清單與詳細規格的編號對應一致
- [ ] 每支 API 的 Response 都有真實感範例值（人名、ID、時間用合理值）
- [ ] 表單類頁面有「送出前驗證」+「建立」兩支 API
- [ ] 列出 4xx 錯誤碼對應的業務情境
- [ ] 實作建議涵蓋 debounce、重試、idempotency 等非功能性建議

## 風格要求

- 所有產出**繁體中文**
- 使用 GitHub flavored Markdown
- JSON 範例需可直接 parse（不留 trailing comma）
- 不寫 emoji，除非使用者要求
- 表格欄位對齊整齊
