---
name: hy-prd-assistant
description: PRD（產品需求文件）撰寫助手，依據公司標準模板產出 Web 應用與內部系統的 PRD。用於：(1) 根據會議記錄產出 PRD，(2) 根據需求訪談紀錄產出 PRD，(3) 根據頁面連結或頁面截圖產出 PRD，(4) 審查或補完既有 PRD 的章節。產出章節包含：封面、修訂追蹤表、背景簡介、使用者故事、功能清單、流程圖、功能流程規格（含欄位說明、API、驗收條件）、畫面雛形。當使用者提到 PRD、產品需求文件、需求規格、系統雛型文件、功能規格書、spec、會議記錄轉 PRD、訪談紀錄轉 PRD、User Story、驗收條件、AC、功能流程圖時觸發此技能。所有產出為繁體中文。
---

# PRD 撰寫助手

依據公司標準 PRD 模板（參考「系統雛型文件」格式），將會議記錄、訪談紀錄或頁面截圖轉換為結構化的 PRD 文件。適用於 Web 應用與內部系統（OA、後台、管理系統）。

## PRD 章節結構

最終產出的 PRD 依以下順序組裝：

1. **封面** — 文件名稱、版本、日期、作者
2. **修訂追蹤表** — 版本、修訂日期、修訂人、修訂內容
3. **背景簡介** — 專案背景、核心價值、專案目標
4. **使用者故事（User Stories）** — 依角色分組，格式為「作為 X，我想要 Y，以便 Z」
5. **功能清單** — 序號、主要功能、次要功能、功能描述、負責人、優先級
6. **流程圖** — 以 **Excalidraw** 產出手繪風圖檔（`.excalidraw` + `.png`），md 以 `![alt](PRD_assets/flow-xxx.png)` 引用
7. **功能流程規格** — 每個功能一張表，含：流程說明、流程起點、適用對象、流程圖、雛形、欄位說明、API、驗收條件、錯誤處理
8. **畫面雛形** — Figma 連結或截圖引用
9. **附錄**（選填）— 術語表、參考資料

詳細撰寫細則見 [references/prd-sections.md](references/prd-sections.md)。

## 使用流程

### 步驟 1：辨識輸入類型

使用者的輸入會是以下其中一種或多種組合，依類型選擇處理方式（見 [references/input-handling.md](references/input-handling.md)）：

- **會議記錄** — 通常含討論脈絡、決策、待辦。需萃取需求並標註未決議項目
- **需求訪談紀錄** — 通常含使用者痛點、期望流程。需轉換為 User Story 與功能清單
- **頁面連結** — 使用 WebFetch 或 firecrawl-scrape 取得頁面結構，反推功能規格
- **頁面截圖** — 用 Read 讀取圖片，分析 UI 元素、欄位、互動邏輯
- **混合輸入** — 依來源分類處理後再整併

### 步驟 2：盤點缺失資訊

在動筆前，對照 [references/prd-sections.md](references/prd-sections.md) 的各章節必要欄位，列出輸入資料中**缺漏或不明確**的項目，例如：

- 功能的負責人 / 優先級
- 欄位的格式、必填、預設值、處理邏輯
- API endpoint / Method / Request / Response
- 驗收條件（AC）
- 錯誤情境與錯誤文案

**一次性**向使用者確認缺失項目（而非逐項追問）。若使用者希望先產出草稿再補，以 `TBD` 或 `【待確認：xxx】` 明確標註。

### 步驟 3：複製模板並填寫

1. 複製 [assets/prd-template.md](assets/prd-template.md) 到使用者指定路徑（預設為工作目錄 `PRD_<專案名稱>_<YYMMDD>.md`）
2. 在 md 同層建立 `PRD_assets/` 目錄（存放流程圖的 `.excalidraw` 與 `.png`）
3. 依序填寫各章節。每個功能都要建立一張「功能流程規格」表
4. 功能流程規格表格格式見 [references/functional-spec-format.md](references/functional-spec-format.md)

### 步驟 4：產出流程圖（Excalidraw，強制）

**所有流程圖一律使用 Excalidraw 產出**，禁止用 Mermaid 程式碼塊。

完整作法見 [references/flow-diagram.md](references/flow-diagram.md)，核心摘要：

1. **前置檢查**：確認 `~/.claude/skills/excalidraw-diagram/` 已安裝且 `uv sync` + `playwright install chromium` 已完成（首次建立 PRD 時執行一次即可）
2. **讀規範**：Read `~/.claude/skills/excalidraw-diagram/references/color-palette.md` 與 `element-templates.md`，依 palette 選色、依 template 產 JSON
3. **產出 JSON**：寫入 `<PRD 目錄>/PRD_assets/flow-<slug>.excalidraw`，固定 `roughness: 1`、`fontFamily: 3`、`strokeWidth: 2`、`opacity: 100`
4. **渲染 PNG**：
   ```bash
   cd ~/.claude/skills/excalidraw-diagram/references
   uv run python render_excalidraw.py "<絕對路徑>/PRD_assets/flow-<slug>.excalidraw" --scale 2
   ```
5. **Read PNG 驗證**：確認文字不截斷、元素不重疊、箭頭連線正確、每個 diamond 分支都有 label；有問題就編輯 JSON 後重新渲染（典型 2–4 次迭代）
6. **md 中引用**：`![<說明>](PRD_assets/flow-<slug>.png)`，**不要**留 ` ```mermaid ` 區塊

每張流程圖的命名規則：
- 第 4 章主流程：`flow-main.excalidraw/.png`
- 第 5.x 功能流程：`flow-<功能英文 slug>.excalidraw/.png`（例：`flow-leave-form.png`）

### 步驟 5：自我檢查

產出完成後對照以下清單檢查：

- [ ] 每個功能清單項目都有對應的功能流程規格表
- [ ] 每個功能流程規格表都有流程圖（Excalidraw PNG 引用）
- [ ] `PRD_assets/` 目錄下所有流程圖皆有 `.excalidraw` 與 `.png` 成對存在
- [ ] md 中**沒有** ` ```mermaid ` 程式碼塊
- [ ] 每個欄位都註明：格式、必填、預設值、處理邏輯
- [ ] 每個功能都有至少一條驗收條件（Given-When-Then 或條列式）
- [ ] 所有待確認項目都以 `【待確認：xxx】` 標註
- [ ] 使用者故事涵蓋全部主要角色

---

## 撰寫風格規範

- **語言**：繁體中文（台灣用語）
- **英文術語**：首次出現時中英並列，例：「使用者故事（User Story）」，後續可單用中文
- **措辭**：使用「應」「需」「必須」描述需求強度；避免「可能」「大概」等不確定措辭
- **欄位描述**：統一採「格式 / 必填 / 預設值 / 處理邏輯」四段式（參考範例格式）
- **錯誤文案**：
  - 輸入框：「請輸入+欄位名稱」（例：請輸入請假理由）
  - 選擇器：「請選擇+欄位名稱」（例：請選擇職務代理人）
- **日期格式**：`YYYY/MM/DD` 或 `YYYY/MM/DD hh:mm`
- **人員格式**：`英文名 中文姓(工號)`，例：`Alex 王小明(AB000)`

---

## 參考文件索引

| 文件 | 用途 | 載入時機 |
|---|---|---|
| [references/prd-sections.md](references/prd-sections.md) | 各章節撰寫細則與欄位清單 | 撰寫任何 PRD 章節時 |
| [references/functional-spec-format.md](references/functional-spec-format.md) | 功能流程規格表格完整格式與範例 | 撰寫功能流程規格時 |
| [references/input-handling.md](references/input-handling.md) | 依輸入類型（會議/訪談/連結/截圖）的萃取策略 | 處理輸入資料時 |
| [references/flow-diagram.md](references/flow-diagram.md) | **Excalidraw 流程圖產出規範（工作流、節點語意、配色、渲染指令）** | 繪製任何流程圖時 |
| [assets/prd-template.md](assets/prd-template.md) | 空白 PRD 模板（複製使用） | 建立新 PRD 時 |

---

## 注意事項

- **不要憑空捏造**需求。輸入資料中沒提到的欄位、API、流程，用 `【待確認：xxx】` 標註，不要自行補齊
- **優先級**建議使用 `P0 / P1 / P2` 或 `MUST / SHOULD / COULD`，與團隊現行慣例一致
- 若使用者提供 Figma 連結，直接在「連結」欄位放原始 URL，不要嘗試 WebFetch（Figma 需登入）
- 若需要從截圖推斷流程，先用 Read 讀取圖片，再產出 Excalidraw 流程圖，**不要**猜測圖片以外的頁面
- **流程圖強制用 Excalidraw**，每張圖需同時存在 `.excalidraw`（原始檔）與 `.png`（渲染結果）於 `PRD_assets/`；md 中以圖片語法引用，禁止用 ` ```mermaid ``` ` 程式碼塊
- 檔名建議：`PRD_<專案名稱>_<YYMMDD>.md`（例：`PRD_OA系統改版_260421.md`）
