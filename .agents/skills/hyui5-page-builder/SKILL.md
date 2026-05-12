---
name: hyui5-page-builder
description: HyUI5 頁面建構助手，以 HyUI5（凌網科技開發的政府無障礙網頁切版框架）的既有元件為基礎，快速組裝符合 AA 級無障礙規範的靜態頁面。用於：(1) **依設計稿（截圖、Figma、PDF、線稿）自動挑選最適合的頁型 shell 並用現有元件組出完整頁面**，(2) 從零建立新的 HyUI5 頁面（首頁 mp、列表頁 lp、內容頁 cp、節點頁 np、意見信箱 qp、網站地圖 sitemap、404 等），(3) 在既有 HyUI5 專案中組合或新增元件區塊（slider、breadcrumb、functionPanel、tagBox、tabs、accordion、popup、form、pagination、tableList 等），(4) 改色/主題/版面（flexTpl 柵格、blue.css 主題），(5) 審查 HyUI5 頁面是否符合 class 命名規範與無障礙要求。觸發關鍵字：HyUI5、HyUI kit、hyweb 切版、政府網站切版、政府無障礙網頁、設計稿轉 HyUI5、依 Figma 產 HyUI5 頁面、accessKey、AA 檢測、mp/np/lp/cp/qp 頁型、flexTpl、btnPrimary、btnSecondary、functionPanel、sideNav、fatFooter、swiper 政府、accordionFunction、tabFunction。
---

# HyUI5 頁面建構助手

HyUI5 是凌網科技（Hyweb）開發的靜態網頁切版框架 v5，主要服務政府/法人網站，預設通過 AA 無障礙檢測。本 skill 提供元件級組裝能力，讓 Claude 直接以 HyUI5 既有 class 與結構產出頁面，不要自行發明 class。

## 核心原則

1. **只用 HyUI5 既有 class 與結構**。若需要 Tailwind、Bootstrap、Shadcn、Radix 等請使用其他 skill（static-web-assistant、react-assistant）。
2. **不覆寫 `css/style.css`**（編譯產物）。要客製樣式，改 `scss/` 或在 `scss/theme/xxx.scss` 建立新主題。
3. **每頁都要包含 accessKey U/C/Z 三個跳轉錨點**。缺一會扣無障礙分。
4. **結構顆粒**：`<section>` → `<div class="container">` → `<div class="flexTpl_xxx">` → `<div class="col">`，不要少環節。
5. **檔案路徑以 HyUI5 專案根目錄為基準**（`css/style.css`、`js/main.js`、`vendor/swiper/...`、`images/...`）。

## 工作流程

### Step 0：若使用者提供設計稿 → 先做映射

當輸入是設計稿（圖檔、Figma 連結、PDF、線稿、頁面 URL 截圖），**先讀 `references/design-mapping.md`** 完成五階段映射：

A. 依視覺主訴求挑頁型（mp/cp/np/lp/qp/sitemap/404）
B. 由上至下逐區塊對應到既有元件（不要新造 class）
C. 量欄寬比例選 `flexTpl_*` 柵格
D. 抓主色對應 `_variable.scss` token 或挑既有 theme
E. 列出「shell + partials + 元件清單 + JS 初始化 + 主題 + 無障礙」確認清單，回報使用者後再產檔

若 Figma URL 可直接讀取，使用 `mcp__claude_ai_Figma__get_design_context` 取得結構與截圖；只有圖檔時直接看圖辨識。映射完才進入 Step 1。

### Step 1：確認頁型

依 Step 0 結果或使用者直接指定，決定頁型（mp/cp/np/lp/qp/sitemap/404）。對照表請讀：

- `references/pages.md` — 頁型總覽、選型決策
- `references/design-mapping.md` — **設計稿 → 頁型/元件/柵格/色票對應表（有設計稿時必讀）**

### Step 2：組裝頁面骨架

每頁骨架固定由以下組成：

```
[partials/head.html]
<body>
  <div class="wrapper">
    <a class="goCenter" href="#aC">按Enter到主內容區</a>
    [partials/header.html]
    <main>
      <a class="accessKeyItem" href="#aC" id="aC" accesskey="C" aria-label="主要內容區">:::</a>
      [pages/{頁型}-shell.html 的 main 內容]
    </main>
    [partials/footer.html]
  </div>
  [partials/scripts.html]
</body>
</html>
```

所有 partial 與 shell 在 `assets/boilerplate/`。複製骨架後，**依使用者需求從 `assets/boilerplate/components/` 挑選元件塞入**。

### Step 3：塞元件

從 `assets/boilerplate/components/` 取對應元件 HTML，替換 `{{...}}` 佔位符。每個元件檔開頭註解都說明了使用方式、依賴、無障礙要點。

對 class API 不熟時讀：
- `references/components.md` — 所有元件的 class 規則與 JS 初始化

要排多欄/RWD 時讀：
- `references/layouts.md` — flexTpl 柵格系統、container、斷點

### Step 4：初始化 JS（若有需要）

以下元件**必須在 `js/customize.js` 內呼叫初始化函式**（`js/main.js` 已定義好這些函式）：

| 元件 | 初始化 |
|---|---|
| swiper (mpSlider/adSlider) | `new Swiper('.mpSlider .swiper', { ...options })` |
| tabs | `tabFunction('.tabFunction1')` 或傳 options 物件 |
| accordion | `accordionFunction('.accordion')` |
| popup | 無需初始化（Fancybox 自動綁 `data-fancybox`） |
| topNav / sideNav / menu / fatFooter / floatNav / scrollTop / fontSize | 已在 `main.js` 自動啟動 |

新增自訂輪播/tab/accordion 時，在 `js/customize.js` 補上對應呼叫。

### Step 5：無障礙檢核

完成後對照 `references/accessibility.md` 的檢核項目。特別確認：

- `<a class="accessKeyItem">` U / C / Z 三處都有
- `<nav>` 都有 `aria-label`
- 麵包屑最後一項 `aria-current="page"`
- 必填欄位有 `<em aria-label="必填">*</em>`
- 表單驗證訊息區 `role="alert"`
- 自動播放 swiper 有 `autoPlaySwitch` 按鈕

## 檔案結構對照（HyUI5 專案根目錄）

```
專案/
├── index.html           ← demo 索引（頁面導覽）
├── mp.html mp2.html mp_w.html mp_template.html   ← 首頁變體
├── cp.html np.html      ← 內容/節點頁
├── lp.html lp2.html lp_table.html lp_album.html  ← 列表頁變體
├── qp.html fp.html      ← 表單頁
├── sitemap.html 404.html
├── button.html icon.html form.html tabs.html accordion.html popup.html  ← 元件展示
├── css/
│   ├── style.css        ← 主樣式（編譯產物，勿直接改）
│   └── blue.css         ← 藍主題（可替換）
├── scss/
│   ├── _variable.scss   ← 所有色/字/版面變數
│   ├── basic/           ← normalize、flexTemplate 等基礎
│   ├── components/      ← 元件 SCSS
│   ├── pages/           ← 頁型 SCSS
│   ├── template/        ← header/main/footer
│   └── theme/blue.scss
├── js/
│   ├── main.js          ← 主程式（勿改）
│   ├── customize.js     ← 自訂初始化（改這個）
│   └── mainJq.js        ← jQuery 版（舊專案用）
├── vendor/
│   ├── swiper/ fancybox/
│   └── jquery-4.0.0.min.js
└── images/
    ├── basic/           ← 站台 icon、無障礙圖示
    ├── demo/            ← 示範圖
    └── footer_logo.png favicon.png logo.svg
```

## 改色 / 改 Token

色碼、字型、斷點都在 `scss/_variable.scss`。改完要重新編譯 SCSS → `css/style.css`。詳見：

- `references/tokens.md` — 完整 token 表、主題切換方法

## 常見範例

### 建立一個「最新消息列表頁」（lp 頁型）

1. 複製 `assets/boilerplate/pages/lp-shell.html`
2. 在外層套上 `partials/head.html` + `partials/header.html` + `partials/footer.html` + `partials/scripts.html`
3. `{{LIST_CONTENT}}` 填入 `components/listGroup.html` 內容（或 `tableList.html` 做成表格式）
4. `{{PAGINATION}}` 填入 `components/pagination.html`
5. `{{FUNCTION_PANEL_WITH_SEARCH}}` 依需要用 `components/functionPanel.html`（取消註解條件查詢區段）
6. `{{TAG_BOX}}` 填入 `components/tagBox.html`（若不需要就拿掉）
7. 修改 breadcrumb、pageTitle 佔位符為實際內容

### 在 cp 頁塞入 tabs

在 `.mainContent` 內放 `components/tabs.html`，替換 3 個 `{{TAB_N_LABEL}}` 與 `{{TAB_N_CONTENT}}`，最後在 `js/customize.js` 加 `tabFunction('.tabFunction1');`。若 mainContent 內已有其他 `.tabFunction1`，改用 `.tabFunction2` 並對應初始化。

### 在首頁新增一個「三欄卡片區」

```html
<section>
  <div class="container">
    <div class="flexTpl_4_4_4">
      <div class="col">...卡片1...</div>
      <div class="col">...卡片2...</div>
      <div class="col">...卡片3...</div>
    </div>
  </div>
</section>
```

## 不要做的事

- ❌ 在 HyUI5 專案內混用 Tailwind/Bootstrap utility class
- ❌ 改 `css/style.css`、`js/main.js` 原始檔
- ❌ 用 `<div onclick>` 當按鈕（破壞無障礙）
- ❌ 為了少寫 class 去省略 `.container` / `.col` / `.mainContentBox` 等外層
- ❌ 自行新增 CSS class 名稱與 HyUI5 既有命名慣例衝突（如另造 `.btn-primary`）

## Reference 索引（按需讀取）

- `references/design-mapping.md` — **設計稿轉 HyUI5 對應指南（有設計稿時必讀）**
- `references/pages.md` — 頁型總覽與選型（~3k 字）
- `references/components.md` — 所有元件 class API（~8k 字，較長，有目錄）
- `references/layouts.md` — flex 柵格與斷點（~2k 字）
- `references/accessibility.md` — 無障礙規範與檢核（~3k 字）
- `references/tokens.md` — 顏色/字型/變數（~2k 字）

## Boilerplate 索引（直接複製使用）

- `assets/boilerplate/partials/` — head / header / footer / scripts
- `assets/boilerplate/pages/` — mp-shell / cp-shell / np-shell / lp-shell
- `assets/boilerplate/components/` — breadcrumb / functionPanel / slider / tabs / accordion / popup / pagination / form / tableList / listGroup / tagBox / blockTypeA
