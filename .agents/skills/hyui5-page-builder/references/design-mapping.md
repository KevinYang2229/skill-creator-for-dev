# 設計稿 → HyUI5 對應指南

接到設計稿（截圖、Figma、PDF、手繪線稿）後，依此檔將視覺結構映射到 HyUI5 既有頁型與元件。**不要為了視覺差異新造 class**；先選最接近的元件，再以 `_variable.scss` token 微調。

## Step A：辨識頁型（Page Type）

依設計稿主訴求對照下表挑一個頁型，細節讀 `pages.md`：

| 設計稿特徵 | 頁型 | shell 檔 |
|---|---|---|
| 大圖輪播 + 多區塊（最新消息、活動、快速連結） | `mp` 首頁 | `pages/mp-shell.html` |
| 麵包屑 + 標題 + 大段文章/圖文 + 側欄選單 | `cp` 內容頁 | `pages/cp-shell.html` |
| 麵包屑 + 標題 + 子節點選單（卡片/列表狀） | `np` 節點頁 | `pages/np-shell.html` |
| 標題 + 篩選列 + 條列資料 + 分頁 | `lp` 列表頁 | `pages/lp-shell.html` |
| 表單欄位（必填、驗證、送出按鈕） | `qp/fp` 表單頁 | 從 `qp.html` 既有結構取 |
| 站內全頁連結樹 | `sitemap` | `sitemap.html` |
| 找不到頁面 | `404` | `404.html` |

**模糊情境決策**：
- 設計稿同時有「文章」+「子分類卡片」→ 看主視覺占比，文章為主用 `cp`、卡片為主用 `np`。
- 列表中每筆都有縮圖 → `lp_album` 變體；純標題日期 → `lp` 或 `lp_table`。
- 「商品/方案」列表 → `lp_album` + `blockTypeA`。

## Step B：辨識區塊（Component Mapping）

由上至下逐區掃描設計稿，對應到既有元件：

| 設計稿視覺 | HyUI5 元件 | boilerplate 檔 |
|---|---|---|
| 頂部 logo + 主選單 + 搜尋 + 字級切換 | header（內含 topNav、menu、accessKey、fontSize） | `partials/header.html` |
| 頁首跳「主內容/選單/底部」三個小錨點 | accessKey U/C/Z | header 內已內建 |
| 大圖輪播（含切換按鈕、播放暫停） | swiper（mpSlider/adSlider） | `components/slider.html` |
| 「目前位置：首頁 > … > 本頁」 | breadcrumb | `components/breadcrumb.html` |
| 標題列含分享/列印/字級/上一頁 | functionPanel | `components/functionPanel.html` |
| 含查詢欄位的篩選列（關鍵字、日期、類別） | functionPanel + 條件查詢區段 | `components/functionPanel.html`（解開 search 區段） |
| 標籤雲 / 熱門關鍵字 | tagBox | `components/tagBox.html` |
| 條列資料（標題 + 日期 + 分類） | listGroup | `components/listGroup.html` |
| 表格式列表（多欄、表頭、可排序） | tableList | `components/tableList.html` |
| 卡片格狀（縮圖 + 標題 + 摘要） | blockTypeA | `components/blockTypeA.html` |
| 上下/數字翻頁 | pagination | `components/pagination.html` |
| 多分頁切換（同頁不同內容） | tabs（tabFunction） | `components/tabs.html` |
| 可摺疊問答 / 章節 | accordion（accordionFunction） | `components/accordion.html` |
| 點擊跳出視窗（圖片、影片、表單） | popup（Fancybox） | `components/popup.html` |
| 表單（必填星號、欄位、驗證、送出） | form | `components/form.html` |
| 頁尾 logo + 多欄連結 + 政府識別 | fatFooter | `partials/footer.html` |
| 右下浮動快捷（回頂、分享、字級） | floatNav / scrollTop | header/footer 內建 |

**對應原則**：
- 視覺像但功能不同 → 仍照「功能」選元件，不照「外觀」（例：看起來像 tab 但其實是錨點導覽 → 用 sideNav 而非 tabs）。
- 一個區塊找不到對應 → 拆成多個小元件組合，或用 `flexTpl_x_x_x` + `<section>` + 自訂內容包既有元件，不要造新 class。
- 設計稿有特殊視覺（漸層、毛玻璃、新動畫）→ 結構照 HyUI5、樣式調 `_variable.scss` 或在 `scss/theme/` 新主題覆蓋，**不要動 `css/style.css`**。

## Step C：辨識柵格（Layout Mapping）

量設計稿欄寬比例，對到 `flexTpl_*`（細節讀 `layouts.md`）：

| 視覺欄寬 | class |
|---|---|
| 單欄滿版 | `flexTpl_12` |
| 對半 | `flexTpl_6_6` |
| 主+側（70/30） | `flexTpl_8_4` 或 `flexTpl_9_3` |
| 三等分卡片 | `flexTpl_4_4_4` |
| 四等分卡片 | `flexTpl_3_3_3_3` |
| 主內容 + 左側選單 | cp/np shell 已含 `mainContentBox` + `sideNav`，直接用 |

行動裝置斷點不需在 HTML 處理，HyUI5 已在 SCSS 內定義 RWD。

## Step D：辨識色票（Token Mapping）

抓設計稿主色、輔色、字色，對到 `_variable.scss`（細節讀 `tokens.md`）：

1. 若色系接近預設藍 → 直接用 `theme/blue.scss`。
2. 整套換色 → 在 `scss/theme/` 新增 `xxx.scss`，覆蓋 `$primary / $secondary / $accent` 等變數，編譯出 `css/xxx.css`，於 `<head>` 換掉 `blue.css` 引用。
3. 局部色塊（如某 section 背景）→ 在頁面用既有 utility 類或在 `scss/pages/` 對應頁加樣式，不要 inline style。

## Step E：產出清單（Output Checklist）

組裝完成前，列出本頁實際使用到：
- [ ] 頁型 shell：`pages/__-shell.html`
- [ ] partial：head / header / footer / scripts
- [ ] 元件清單（含每個元件需替換的 `{{...}}` 佔位符）
- [ ] 需在 `js/customize.js` 補的初始化呼叫（swiper / tabFunction / accordionFunction）
- [ ] 主題：blue.css 或自訂 theme.scss
- [ ] 無障礙檢核（U/C/Z 錨點、aria-label、必填星號、role=alert、autoPlaySwitch）

把這份清單先回報給使用者確認，再實際產檔。

## 設計稿訊號詞 → 元件對照（快查）

當使用者描述設計稿時，這些字眼通常代表特定元件：

- 「banner / 主視覺輪播 / KV」→ swiper（mpSlider）
- 「快捷功能 / icon 區塊」→ `flexTpl_*` + 自訂 a 連結
- 「最新消息 / 公告 / 訊息中心」→ listGroup 或 tabs+listGroup
- 「常見問題 / FAQ」→ accordion
- 「服務專區 / 資訊分類卡」→ blockTypeA grid
- 「線上申辦 / 意見信箱」→ form (qp)
- 「下載專區 / 文件清單」→ tableList
- 「相簿 / 影音」→ lp_album + popup（Fancybox）

## 不要做的事

- ❌ 看設計稿有圓角/陰影就自造 `.card-shadow`，先用既有 blockTypeA。
- ❌ 為了完全擬合設計稿位置，用絕對定位破壞 flexTpl 結構。
- ❌ 直接複製設計工具匯出的 inline style 到 HTML。
- ❌ 把設計稿的英文字型直接塞進去，先確認 `$font-family` token。
