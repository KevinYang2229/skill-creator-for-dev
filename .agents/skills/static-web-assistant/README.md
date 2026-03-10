# 靜態網頁助手 (Static Web Assistant)

> AI 技能模組 — 提供現代靜態網頁開發規範指引與可重複使用的專案模板。

---

## 功能概述

| 功能       | 說明                                              |
| ---------- | ------------------------------------------------- |
| 建立新專案 | 複製 boilerplate 模板 + Linter 設定，快速啟動專案 |
| 審查程式碼 | 依據 9 份現代規範文件，檢查 HTML / JS / SASS 品質 |
| 產生模板   | 以 boilerplate 為基底，依需求客製化頁面結構       |

---

## 技能結構

```
static-web-assistant/
├── SKILL.md                          # 核心指引（使用流程 + 文件索引）
├── references/                       # 規範文件（按需載入）
│   ├── html-standards.md             # HTML 語意化、屬性、Meta 規範
│   ├── js-standards.md               # ES Module、命名、函式、DOM 操作
│   ├── sass-standards.md             # 7-1 結構、BEM、變數、Mixin
│   ├── file-structure.md             # 目錄結構、命名、模組化原則
│   ├── rwd.md                        # Mobile-First、斷點、流體排版
│   ├── accessibility.md              # WCAG 2.1 AA、ARIA、鍵盤導航
│   ├── seo.md                        # Meta、OG/Twitter、結構化資料
│   ├── performance.md                # 資源載入、圖片最佳化、CWV
│   └── browser-compatibility.md      # 支援矩陣、功能偵測、漸進增強
└── assets/
    ├── boilerplate/                  # 專案起始模板
    │   ├── index.html                # HTML5 語意化頁面（含 a11y + SEO）
    │   ├── sass/                     # 模組化 SASS（簡化版 7-1）
    │   ├── js/                       # ES Module 模組化 JS
    │   └── package.json              # npm scripts + 開發依賴
    └── configs/                      # Linter / Formatter 設定
        ├── eslint.config.js          # ESLint 9.x flat config
        ├── .stylelintrc.json         # Stylelint + SCSS
        ├── .prettierrc.json          # Prettier
        └── .editorconfig             # EditorConfig
```

---

## 快速開始

### 建立新專案

```bash
# 1. 複製 boilerplate 至目標目錄
cp -r .agents/skills/static-web-assistant/assets/boilerplate/ ./my-project/

# 2. 複製 Linter / Formatter 設定
cp .agents/skills/static-web-assistant/assets/configs/.* ./my-project/
cp .agents/skills/static-web-assistant/assets/configs/eslint.config.js ./my-project/

# 3. 安裝依賴
cd my-project && npm install

# 4. 開始開發（SASS 即時編譯）
npm run sass:watch
```

### 可用 npm 指令

| 指令                 | 說明                      |
| -------------------- | ------------------------- |
| `npm run sass:watch` | SASS 即時編譯（開發模式） |
| `npm run sass:build` | SASS 壓縮編譯（生產模式） |
| `npm run lint:js`    | ESLint 檢查 JS            |
| `npm run lint:css`   | Stylelint 檢查 SCSS       |
| `npm run lint`       | 執行所有 Lint 檢查        |
| `npm run format`     | Prettier 格式化所有檔案   |

---

## 涵蓋規範

### 核心技術規範

| 領域           | 關鍵規則                                                |
| -------------- | ------------------------------------------------------- |
| **HTML**       | 語意化標籤、屬性排序、Meta 必備項、模組化標記           |
| **JavaScript** | ES Module、camelCase 命名、JSDoc 中文註解、單一職責函式 |
| **SASS**       | 7-1 目錄結構、BEM 命名、`@use` 模組系統、巢狀 ≤ 3 層    |

### 跨領域規範

| 領域       | 關鍵規則                                                  |
| ---------- | --------------------------------------------------------- |
| **RWD**    | Mobile-First、`clamp()` 流體排版、`srcset` 響應式圖片     |
| **無障礙** | WCAG 2.1 AA、ARIA 角色、鍵盤導航、色彩對比度 4.5:1        |
| **SEO**    | `<title>` + `meta description`、OG/Twitter Card、JSON-LD  |
| **效能**   | `defer`/`async`、WebP 圖片、lazy loading、Core Web Vitals |
| **相容性** | 最近 2 版主流瀏覽器、`@supports` 功能偵測、漸進增強       |

### Linter 規則摘要

| 工具          | 關鍵設定                                                            |
| ------------- | ------------------------------------------------------------------- |
| **ESLint**    | 強制 `const` / `===`、巢狀 ≤ 3 層、參數 ≤ 3 個、禁止 `var` / `eval` |
| **Stylelint** | BEM 命名、巢狀 ≤ 3 層、禁止 ID 選擇器、禁止 `!important`            |
| **Prettier**  | 單引號、2 空格縮排、LF 換行、列寬 100                               |

---

## 設計原則

- 📝 程式碼註解一律使用**中文**
- 📐 遵循 **SOLID** 設計原則（特別是單一職責）
- 🏷️ 採用 **BEM** 命名方法論
- 📱 採用 **Mobile-First** 響應式設計
- ♿ 符合 **WCAG 2.1 AA** 無障礙等級
- 📦 注重**模組化**拆分（檔案 > 200 行即考慮拆分）
