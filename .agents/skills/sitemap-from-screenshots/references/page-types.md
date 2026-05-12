# 頁面類型分類

每個 sitemap 節點都會被歸類為以下其中一種類型。類型決定 Mermaid 節點形狀，讓圖更容易一眼看懂。

## 類型

| Type         | 意義                                          | Mermaid 形狀 | 語法範例                   |
| ------------ | --------------------------------------------- | ------------ | -------------------------- |
| `landing`    | 首頁、行銷 landing、hero 驅動的頁面           | 圓角         | `id("label")`              |
| `list`       | 索引 / 列表 / 搜尋結果 / 目錄                 | 膠囊         | `id(["label"])`            |
| `detail`     | 單項詳情頁（商品、文章…）                     | 圓柱         | `id[("label")]`            |
| `form`       | 以表單為主的頁面（聯絡、註冊、結帳）          | 六角形       | `id{{"label"}}`            |
| `flow`       | 多步驟精靈 / 漏斗（購物車 → 付款 → 完成）    | 子程序       | `id[["label"]]`            |
| `auth`       | 登入 / 註冊 / 忘記密碼 / SSO                  | 圓形         | `id(("label"))`            |
| `decision`   | 路由 / 條件分支 / gate                        | 菱形         | `id{"label"}`              |
| `content`    | 一般內容頁（關於我們、部落格文章、文件）      | 矩形         | `id["label"]`              |
| `dashboard`  | 需登入、資料密集的總覽頁                      | 矩形         | `id["label"]`              |
| `settings`   | 帳號 / 偏好設定 / 管理設定                    | 矩形         | `id["label"]`              |
| `external`   | 站外連結（社群、合作夥伴、文件）              | 不對稱       | `id>"label"]`              |
| `legal`      | 條款、隱私、Cookie、公司資訊                  | 矩形         | `id["label"]`              |

## 判斷提示

- **有 hero + CTA，沒有結構化資料** → `landing`
- **重複卡片/列，帶 filter 或分頁** → `list`
- **單一項目，標題 + metadata + 內文** → `detail`
- **主要是 input 欄位 + 送出按鈕** → `form`
- **頂部有步驟指示器 / progress bar** → `flow`
- **帳號/密碼欄位、社群登入按鈕** → `auth`
- **圖表、KPI 卡、表格，且需登入** → `dashboard`
- **Tab 切換的設定、toggle、個人資料編輯** → `settings`
- **只在 footer 出現，連到 `/terms`、`/privacy`、`/cookies`** → `legal`
- **`target="_blank"` 或是不同 domain** → `external`

不確定時，預設 `content`。

## Label 格式（給產生器用）

產生器會用 `<br/>` 把每個節點的標籤渲染為多行：

```text
<name><br/><url><br/><type>[<br/>notes]
```

範例：

- `"首頁<br/>/<br/>landing"`
- `"商品詳情<br/>/products/:id<br/>detail<br/>含規格選擇與評論"`

`notes` 只有在非空時才會被加入。產生器會把超過約 60 字的備註截斷，讓 FigJam 排版保持緊湊。
