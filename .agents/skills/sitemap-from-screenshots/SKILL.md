---
name: sitemap-from-screenshots
description: 從網站截圖產生可貼到 Figma/FigJam 的網站資訊架構圖（sitemap）。當使用者提供一張或多張網站/Web App 截圖，並要求產生資訊架構圖、網站架構圖、sitemap、IA 圖、site structure，或希望在 Figma/FigJam 中視覺化網站層級時使用。產出為 Mermaid flowchart 程式碼，可直接貼進 FigJam 的內建 Mermaid 匯入功能；每個節點都包含頁面名稱、URL、頁面類型、縮圖檔名與備註。
---

# Sitemap from Screenshots

從網站截圖產生階層式 sitemap，輸出為 Mermaid flowchart 程式碼，可直接貼進 FigJam（Figma 的白板工具）。

## 輸出目標：FigJam Mermaid 貼上

FigJam 原生支援 Mermaid。使用者透過以下方式貼上產生的程式碼：

- **Shift + M** → 貼上 Mermaid 程式碼 → Insert，**或**
- 選單：`Tools → Mermaid → Paste code`

這是官方支援的主流路徑。**不要**嘗試 Figma clipboard JSON 或任何非公開 API。

固定使用 `flowchart TD`（由上到下的流程圖）。這是 FigJam 裡相容性最好的 Mermaid dialect，並支援節點形狀、多行標籤與 subgraph —— sitemap 所需的功能都有。FigJam 的 Mermaid 限制比 mermaid.live 還嚴，詳細規則請讀 [references/mermaid-figjam.md](references/mermaid-figjam.md)。

## 工作流程

### 1. 取得輸入

向使用者詢問：

1. **截圖** —— 至少要有首頁；理想情況是首頁加上各區塊的 landing 頁（商品列表、分類頁、會員中心…）。截圖越多，階層越完整。
2. **Base URL**（選填）—— 方便將相對路徑正規化為絕對網址。
3. **專案背景**（選填但有用）—— 這是什麼類型的網站（電商、SaaS Dashboard、行銷網站、部落格…），可大幅提升頁面類型判斷的準確度。

若使用者只提供單張截圖，可以繼續執行，但要提醒使用者：深度只能到該張截圖可見的連結（nav、footer、頁內 CTA）。

### 2. 分析每張截圖

對每張截圖，用 Read 工具讀取（它支援圖片），並抽出：

- **全域導覽** —— 頂部 nav、漢堡選單、側邊欄
- **頁尾連結** —— 通常會出現法律/客服/公司相關頁面
- **頁內連結與 CTA** —— 區塊連結、卡片連結、導向其他頁面的按鈕
- **麵包屑** —— 直接顯示階層深度
- **頁面本身** —— 名稱、推斷的 URL、頁面類型

每張截圖各自記錄，合併前不要混在一起。**不要憑空捏造**截圖中沒有出現的頁面。

### 3. 建立 sitemap 樹

把所有截圖的分析結果合併成單一階層樹。規則：

- **根節點**固定為首頁（`/`）。
- **麵包屑優先** —— 有麵包屑時以它為準來決定深度。
- **導覽順序**是頂層區塊排序的強烈提示。
- **去重** —— 多張截圖裡出現相同 URL 視為同一節點。
- **未知的 URL** —— 若連結的 href 看不到，從文字 label 推斷 slug（例如 `聯絡我們` → `/contact`），並在 notes 裡標記 `url_inferred: true`。

每個節點都必須包含完整 schema —— 見 [references/node-schema.md](references/node-schema.md)：

- `id` —— 穩定的 slug
- `name` —— 顯示名稱（保留原站語言；中文就用中文）
- `url` —— 絕對或根相對路徑
- `type` —— [references/page-types.md](references/page-types.md) 裡的其中一種類型
- `thumbnail` —— 若使用者有提供該頁的截圖則填檔案路徑，否則留空字串
- `notes` —— 簡短觀察（hero 內容、關鍵元件、是否需登入…）

把中間產物存成 JSON（例如 `sitemap.json`）放在使用者的工作目錄下，方便後續重新生成或編輯。

### 4. 產生 Mermaid

執行產生器腳本：

```bash
python3 .agents/skills/sitemap-from-screenshots/scripts/generate_mermaid.py sitemap.json > sitemap.mmd
```

腳本會讀取樹狀 JSON，產出 `flowchart TD` Mermaid 程式碼，包含：

- 依頁面類型使用不同節點形狀
- 多行標籤：名稱、URL、類型、備註
- 有截圖的節點旁邊加 `%% thumbnail: …` 註解
- 節點數超過 12 個時，自動把頂層區塊包成 subgraph（讓 FigJam 排版更易讀）

### 5. 交付給使用者

在 fenced code block 裡呈現 Mermaid 程式碼，並附上貼上指引：

> 打開 FigJam → 按 **Shift + M** → 貼上下方程式碼 → 點 Insert。

同時保留 `.mmd` 檔與中間的 `sitemap.json`，讓使用者可以迭代。

## 迭代

當使用者要求修改時（「加上結帳流程」、「把管理頁標出來」、「依區塊分組」）：

1. 編輯 `sitemap.json` —— 這是唯一的真實來源（source of truth）。
2. 重新執行 `generate_mermaid.py`。
3. 重新交付 Mermaid 程式碼。

**絕對不要手動改 `.mmd` 輸出檔**；永遠從 JSON 重新產生。

## 綁定資源

- [scripts/generate_mermaid.py](scripts/generate_mermaid.py) —— JSON sitemap 轉 FigJam 相容 Mermaid
- [references/mermaid-figjam.md](references/mermaid-figjam.md) —— FigJam Mermaid 方言與注意事項
- [references/node-schema.md](references/node-schema.md) —— sitemap JSON schema 與範例
- [references/page-types.md](references/page-types.md) —— 頁面類型分類與節點形狀對應
