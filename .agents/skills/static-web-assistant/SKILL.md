---
name: static-web-assistant
description: 靜態網頁開發助手，提供現代網站開發規範指引與專案模板。用於：(1) 建立新的靜態網頁專案（複製 boilerplate 模板與 Linter 設定），(2) 審查 HTML/JS/SASS 程式碼是否符合現代規範，(3) 產生符合規範的專案模板。當使用者需要靜態網頁開發、程式碼品質檢查、或建構 HTML/JS/SASS 專案時觸發此技能。
---

# 靜態網頁助手

協助依據現代網站開發規範建立靜態網頁專案、審查程式碼、產生 boilerplate 模板。

## 使用流程

根據使用者需求，選擇對應流程執行。

### 流程一：建立新專案

1. 複製 `assets/boilerplate/` 模板至目標目錄
2. 複製 `assets/configs/` 下的設定檔至專案根目錄
3. 依使用者需求修改 `index.html` 的 Meta 資訊（標題、描述、OG）
4. 執行 `npm install` 安裝開發依賴
5. 提示使用者執行 `npm run sass:watch` 開始開發

### 流程二：審查程式碼

依據對應的 references 文件檢查程式碼品質：

1. 識別程式碼語言（HTML / JS / SASS）
2. 載入對應的規範文件（見下方參考索引）
3. 逐項檢查並提供修改建議
4. 檢查跨領域規範（無障礙、SEO、效能、RWD）

### 流程三：產生模板

1. 複製 `assets/boilerplate/` 作為基底
2. 根據使用者需求客製化頁面結構
3. 確保產出符合所有規範文件的要求

---

## 參考文件索引

依據任務類型載入對應的 references 文件：

### 語言規範

| 文件                                              | 用途                | 載入時機       |
| ------------------------------------------------- | ------------------- | -------------- |
| [html-standards.md](references/html-standards.md) | HTML 編碼規範       | 建立/審查 HTML |
| [js-standards.md](references/js-standards.md)     | JavaScript 編碼規範 | 建立/審查 JS   |
| [sass-standards.md](references/sass-standards.md) | SASS 編碼規範       | 建立/審查 SASS |

### 結構規範

| 文件                                              | 用途           | 載入時機                 |
| ------------------------------------------------- | -------------- | ------------------------ |
| [file-structure.md](references/file-structure.md) | 檔案結構與命名 | 建立新專案、審查專案結構 |

### 跨領域規範

| 文件                                                            | 用途          | 載入時機                  |
| --------------------------------------------------------------- | ------------- | ------------------------- |
| [rwd.md](references/rwd.md)                                     | 響應式設計    | 涉及佈局與排版            |
| [accessibility.md](references/accessibility.md)                 | 無障礙 (a11y) | 涉及互動元件與表單        |
| [seo.md](references/seo.md)                                     | SEO 最佳實踐  | 涉及 Meta、連結、內容結構 |
| [performance.md](references/performance.md)                     | 效能最佳化    | 涉及資源載入與圖片        |
| [browser-compatibility.md](references/browser-compatibility.md) | 瀏覽器相容性  | 使用較新 CSS/JS 功能時    |

---

## Assets

### Boilerplate 模板

路徑：`assets/boilerplate/`

包含完整的靜態網頁專案結構：

- `index.html` — HTML5 語意化頁面（含無障礙、SEO Meta）
- `sass/` — 模組化 SASS（簡化版 7-1 結構）
- `js/` — ES Module 模組化 JS
- `package.json` — 開發依賴與 npm scripts

SASS 編譯指令：

- 開發模式：`npm run sass:watch`
- 生產建構：`npm run sass:build`

### Linter / Formatter 設定

路徑：`assets/configs/`

| 檔案                | 工具         | 關鍵規則                                   |
| ------------------- | ------------ | ------------------------------------------ |
| `eslint.config.js`  | ESLint       | 強制 const/===、限制巢狀 ≤3 層、參數 ≤3 個 |
| `.stylelintrc.json` | Stylelint    | BEM 命名、巢狀 ≤3 層、禁止 ID 選擇器       |
| `.prettierrc.json`  | Prettier     | 單引號、2 空格、LF 換行                    |
| `.editorconfig`     | EditorConfig | UTF-8、2 空格、LF 換行                     |

---

## 注意事項

- 所有程式碼註解使用**中文**
- 所有函式必須有 **JSDoc 註解**
- 遵循 **SOLID 設計原則**，特別是單一職責
- 採用 **BEM 命名方法論**
- 採用 **Mobile-First** 響應式設計策略
- 遵循 **WCAG 2.1 AA** 無障礙等級
