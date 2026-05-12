# FigJam Mermaid 方言與注意事項

FigJam 解析 Mermaid 時只支援 mermaid.js 的子集。有些在 mermaid.live 渲染正常的語法，在 FigJam 裡會默默失敗或變成純文字。務必遵守以下規則。

## 支援的圖表類型

- `flowchart TD` / `flowchart LR` —— **sitemap 請用這個**
- `mindmap`
- `sequenceDiagram`
- `classDiagram`、`stateDiagram`、`erDiagram`、`gantt`、`pie`

Sitemap 一律用 `flowchart TD`。`mindmap` 看起來很適合階層圖，但它不支援自訂節點形狀、URL、或結構化的多行標籤。

## 節點標籤規則（重要）

FigJam 的 Mermaid parser 對含有特殊字元的標籤非常嚴格。

- **只要標籤包含 `[A-Za-z0-9 ]` 以外的任何字元都必須加引號**：URL、斜線、中文、標點、換行。
  - ✅ `home["首頁<br/>/<br/>landing"]`
  - ❌ `home[首頁 / landing]`  ← 會被 `/` 弄壞
- **標籤內換行**：用 `<br/>`（self-closing）。`\n` 不會生效。
- **標籤內雙引號**：用 `#quot;` 跳脫，或直接避免使用。
- **標籤內小括號**：必須在引號內，不然形狀 parser 會混亂。
- **標籤內冒號**：在引號內是安全的。

## 節點形狀

| Mermaid 語法       | 形狀        | 用途                  |
| ------------------ | ----------- | --------------------- |
| `id["..."]`        | 矩形        | 預設 / 內容頁         |
| `id("...")`        | 圓角        | landing / hero 頁     |
| `id(["..."])`      | 膠囊        | 列表 / 索引頁         |
| `id[["..."]]`      | 子程序      | 流程 / wizard         |
| `id[("...")]`      | 圓柱        | 詳情頁 / 資料驅動     |
| `id(("..."))`      | 圓形        | 入口 / 登入           |
| `id{"..."}`        | 菱形        | 決策 / 判斷           |
| `id{{"..."}}`      | 六角形      | 表單                  |
| `id>"..."]`        | 不對稱      | 外部連結              |

頁面類型對應形狀的表請見 [page-types.md](page-types.md)。

## 邊（Edges）

- `A --> B` —— 一般箭頭
- `A -.-> B` —— 虛線（用於 href 看不到、推斷出來的連結）
- `A ==> B` —— 粗線（用於主要導覽連結）
- 邊的標籤：`A -->|"登入後"| B` —— 含非 ASCII 字元時一定要加引號。

## Subgraph（頂層區塊分組）

```mermaid
subgraph products["產品"]
  direction TB
  list(["商品列表<br/>/products<br/>list"])
  detail[("商品詳情<br/>/products/:id<br/>detail")]
  list --> detail
end
home --> products
```

- Subgraph 標題一律加引號。
- 每個 subgraph 內都加 `direction TB`，確保堆疊方向一致。
- **不要**把 subgraph 巢狀超過一層 —— FigJam 的自動排版會變得難以閱讀。

## 註解

- `%% 註解文字` —— 單行註解。FigJam 會忽略，所以可以放人類可讀的 metadata，例如 `%% thumbnail: home.png`。

## FigJam 不支援的項目

- `click` handler（`click node "url"`）—— 會被解析但沒作用，不要用它來塞 URL；把 URL 寫進標籤裡。
- `classDef` / `class` 樣式 —— 常常被丟掉。視覺差異請透過節點形狀呈現，不要靠 CSS。
- 標籤內的 Markdown（`**bold**`）—— 會被當純文字渲染。
- Font Awesome icon（`fa:fa-user`）—— 不支援。
- `linkStyle` —— 會被丟掉。

## 輸出順序

為了最大相容性，按這個順序輸出：

1. `flowchart TD` 表頭
2. 所有節點宣告（含標籤）
3. Subgraph 區塊
4. 邊
5. 結尾的 `%%` metadata 註解

**不要**在邊裡第一次宣告節點（`A --> NewNode["label"]`）—— 一定要先宣告節點，再在邊裡引用 id。
