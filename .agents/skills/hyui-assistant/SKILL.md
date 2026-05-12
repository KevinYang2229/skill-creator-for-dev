---
name: hyui-assistant
description: HyUI5 網頁生成助手，以 HyUI5 前端框架為基礎，協助建立符合政府網站規範的靜態網頁。用於：(1) 建立新的 HyUI5 靜態網頁專案（複製 boilerplate 模板），(2) 在既有 HyUI5 專案中新增頁面或元件（首頁、內頁、列表頁、表單、輪播等），(3) 審查 HyUI5 專案的 HTML/SCSS 程式碼是否符合無障礙與 RWD 規範。當使用者提到 HyUI、HyUI5、政府網站版型、凌網版型、政府無障礙網頁、WCAG 政府網站、HyUI 元件、HyUI 模板、政府 RWD 網頁時觸發此技能。
---

# HyUI5 網頁生成助手

以 HyUI5 前端框架（凌網科技開發）為基礎，產生符合政府網站規範的靜態網頁。支援 RWD、WCAG 2.1 AA 無障礙、Flex 排版系統。

## 使用流程

根據使用者需求，選擇對應流程執行。

### 流程一：建立新專案

1. 複製 `assets/boilerplate/` 模板至目標目錄
2. 依使用者需求修改 `index.html` 的 Meta 資訊（標題、描述、語系）
3. 依需求修改 header（logo、選單項目、導覽連結）
4. 依需求修改 footer（機關資訊、版權、連結）
5. 如需 SCSS 客製化，修改 `scss/_variable.scss` 中的顏色與字型變數
6. 提示使用者安裝 SCSS 編譯工具（如需修改 SCSS）

### 流程二：新增頁面或元件

1. 確認頁面類型（首頁 / 內頁 / 列表頁 / 404 / Sitemap）
2. 載入 [html-template.md](references/html-template.md) 取得對應頁面結構
3. 依使用者需求，載入對應元件的 references 文件（見參考文件索引）
4. 組合元件產出 HTML，確保包含無障礙屬性
5. 如使用 Swiper 輪播或 Accordion 等互動元件，在 `customize.js` 中加入 JS 初始化

### 流程三：審查程式碼

1. 載入對應的 references 文件檢查 HTML 結構
2. 檢查無障礙項目：`aria-label`、`accesskey`、`role`、`alt`、`label+for`
3. 檢查 RWD：Flex 排版、Media Query 斷點、手機版按鈕
4. 檢查語意化標籤：`header`、`main`、`footer`、`nav`、`aside`
5. 檢查 noscript 替代方案

---

## 參考文件索引

依據任務類型載入對應的 references 文件：

### 核心結構

| 文件 | 用途 | 載入時機 |
|---|---|---|
| [html-template.md](references/html-template.md) | HTML 骨架、Header/Main/Footer 結構 | 建立新專案、新增頁面 |
| [grid-system.md](references/grid-system.md) | Flex 排版、Media Query、Mixin | 涉及排版佈局 |
| [scss-variables.md](references/scss-variables.md) | SCSS 顏色/字型/斷點變數 | 客製化樣式 |

### 元件文件

| 文件 | 包含元件 | 載入時機 |
|---|---|---|
| [components-navigation.md](references/components-navigation.md) | Menu、TopNav、SideNav、Breadcrumb、Pagination、FloatNav | 涉及導覽選單 |
| [components-content.md](references/components-content.md) | Accordion、Tabs、Slider、Table、Download、Tag、Notice | 涉及內容展示 |
| [components-form.md](references/components-form.md) | Forms、Search、FontSize、Language、Share | 涉及表單互動 |
| [components-layout.md](references/components-layout.md) | Button、Popup、Icon、FatFooter、FunctionPanel、Marquee | 涉及按鈕/燈箱/版面 |

---

## Assets

### Boilerplate 模板

路徑：`assets/boilerplate/`

包含完整的 HyUI5 專案結構：

- `index.html` — 含完整 header/main/footer 骨架
- `css/style.css` + `css/blue.css` — 編譯後 CSS
- `js/main.js` — 預設互動模組（勿修改）
- `js/customize.js` — 自訂互動程式
- `scss/` — 完整 SCSS 源碼（含 basic、components、pages、template、theme）
- `images/` — 基本圖片素材
- `vendor/` — Swiper、jQuery 等外掛
- `assets/` — FancyBox 燈箱外掛

---

## 注意事項

- 所有 HTML 註解使用**中文**
- 遵循 **WCAG 2.1 AA** 無障礙等級
- 每個互動元素須有 `aria-label` 或對應 `label`
- 表單使用 `fieldset` + `legend` 分組，`label` 的 `for` 對應 `input` 的 `id`
- 隱藏但保留給螢幕閱讀器的元素使用 `class="srOnly"`
- 採用 **Graceful Degradation** 響應式策略（由桌面到行動版）
- Media Query 斷點順序：由寬到窄（notebook → tablet → mobile → xsMobile）
- `main.js` 為框架核心互動程式，不要任意修改
- 自訂互動寫在 `customize.js`
- 無障礙定位點：`accesskey="U"` 功能區、`accesskey="C"` 主內容區、`accesskey="Z"` 頁尾區
