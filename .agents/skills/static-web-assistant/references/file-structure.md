# 檔案結構與命名規範

## 目錄

- [專案目錄結構](#專案目錄結構)
- [檔案命名規則](#檔案命名規則)
- [模組化拆分原則](#模組化拆分原則)

---

## 專案目錄結構

```
project-name/
├── index.html                 # 首頁
├── about.html                 # 關於頁面（依需求新增）
├── css/
│   └── main.css               # SASS 編譯輸出（不手動編輯）
├── sass/
│   ├── main.scss              # SASS 主入口
│   ├── base/                  # 基礎樣式
│   │   ├── _reset.scss
│   │   ├── _typography.scss
│   │   └── _variables.scss
│   ├── components/            # 元件樣式
│   │   ├── _buttons.scss
│   │   └── _cards.scss
│   ├── layout/                # 佈局樣式
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   └── _grid.scss
│   └── utilities/             # 工具類
│       ├── _mixins.scss
│       └── _functions.scss
├── js/
│   ├── main.js                # JS 主入口
│   ├── utils/                 # 工具函式
│   │   └── dom.js
│   └── components/            # 元件邏輯
│       └── nav.js
├── assets/
│   ├── images/                # 圖片資源
│   │   ├── icons/             # 圖示
│   │   └── photos/            # 照片
│   ├── fonts/                 # 自訂字型
│   └── videos/                # 影片資源
├── .eslintrc.json
├── .stylelintrc.json
├── .prettierrc.json
├── .editorconfig
└── package.json               # 開發依賴（Linter 等）
```

---

## 檔案命名規則

| 類型         | 規則                  | 範例                                     |
| ------------ | --------------------- | ---------------------------------------- |
| HTML         | kebab-case            | `about-us.html`, `contact-form.html`     |
| SASS Partial | `_` 前綴 + kebab-case | `_nav-bar.scss`, `_hero-section.scss`    |
| JS 模組      | kebab-case            | `nav-controller.js`, `form-validator.js` |
| 圖片         | kebab-case + 用途描述 | `hero-bg.webp`, `icon-search.svg`        |
| 目錄         | kebab-case            | `components/`, `base/`                   |

### 禁止事項

- ❌ 含空格：`my file.js`
- ❌ camelCase：`myFile.js`（目錄與 HTML/CSS 檔案）
- ❌ 中文檔名：`首頁.html`
- ❌ 特殊字元：`file@v2.js`

---

## 模組化拆分原則

### 何時拆分

- 單一檔案超過 **200 行** → 考慮拆分
- 檔案內有**兩個以上不相關功能** → 必須拆分
- 相同程式碼出現**三次以上** → 抽取為共用模組

### 拆分策略

```
依功能類型分層 (Feature-based)
├── layout/     → 頁面結構（header, footer, sidebar）
├── components/ → 可重用元件（button, card, modal）
├── utils/      → 通用工具（dom helper, validator）
└── base/       → 基礎定義（reset, variables, typography）
```

### 進入點規範

| 檔案             | 職責                                 |
| ---------------- | ------------------------------------ |
| `index.html`     | HTML 結構，引用 CSS 與 JS            |
| `sass/main.scss` | 僅做 `@use` 匯入，不寫樣式           |
| `js/main.js`     | 僅做 `import` 與初始化，不寫業務邏輯 |
