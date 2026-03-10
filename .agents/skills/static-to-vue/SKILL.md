---
name: static-to-vue
description: 靜態網站轉 Vue 3 框架助手，協助將 HTML + CSS/SASS + vanilla JS 靜態網站轉換為現代 Vue 3 專案。用於：(1) 將完整靜態網站專案轉換為 Vite + Vue 3 + TypeScript 專案，(2) 將單一 HTML 頁面或元件轉換為 Vue SFC 元件，(3) 審查已轉換的 Vue 程式碼品質。當使用者需要靜態網頁轉 Vue、HTML 轉 Vue SFC 元件、CSS/SASS 轉 Tailwind/Scoped Style、vanilla JS 轉 Composition API、或建立 Vue 專案時觸發此技能。
---

# 靜態網站轉 Vue 3 助手

協助將靜態網站（HTML + CSS/SASS + vanilla JS）轉換為 Vue 3 框架專案。

## 技術棧

| 類別         | 預設方案             | 可選方案             |
| ------------ | -------------------- | -------------------- |
| 建構工具     | Vite                 | Nuxt（需使用者指定） |
| 語言         | TypeScript           | —                    |
| CSS 方案     | Tailwind CSS v4      | Scoped Style, SASS   |
| 狀態管理     | Pinia                | —                    |
| 表單處理     | VeeValidate + Zod    | —                    |
| Server State | TanStack Query (Vue) | —                    |
| 路由         | Vue Router 4         | —                    |
| 單元測試     | Vitest               | —                    |
| E2E 測試     | Playwright           | —                    |

---

## 工作流程

根據使用者需求，選擇對應流程。

### 流程一：完整專案轉換

將靜態網站專案整體轉換為 Vue 3 專案。

1. **分析來源專案**
   - 識別所有 HTML 頁面與路由結構
   - 盤點 CSS/SASS 樣式架構
   - 識別 JS 互動邏輯與全域狀態
   - 確認深淺色主題機制

2. **初始化 Vue 專案**
   - 複製 `assets/boilerplate/` 至目標目錄
   - 複製 `assets/configs/` 設定檔至專案根目錄
   - 執行 `npm install`
   - 依使用者選擇調整 CSS 方案（若非 Tailwind）

3. **轉換結構**
   - HTML 頁面 → Vue Router 路由頁面（見 [routing.md](references/routing.md)）
   - 語意化區塊 → Vue SFC 元件（見 [html-to-sfc.md](references/html-to-sfc.md)）
   - SVG 圖示/插圖遷移（見 [svg-usage.md](references/svg-usage.md)）
   - 建立專案目錄結構（見 [project-structure.md](references/project-structure.md)）

4. **轉換樣式**
   - CSS/SASS → 選定的 CSS 方案（見 [css-conversion.md](references/css-conversion.md)）
   - 深淺色主題遷移（見 [theming.md](references/theming.md)）

5. **轉換邏輯**
   - DOM 操作 → Vue 宣告式渲染（見 [js-to-vue.md](references/js-to-vue.md)）
   - 全域狀態 → Pinia（見 [state-management.md](references/state-management.md)）
   - API 呼叫 → TanStack Query（見 [server-state.md](references/server-state.md)）
   - 表單 → VeeValidate + Zod（見 [forms.md](references/forms.md)）

6. **測試**
   - 撰寫元件與工具函式的 Vitest 測試
   - 撰寫關鍵流程的 Playwright E2E 測試
   - （見 [testing.md](references/testing.md)）

7. **驗證**
   - 執行 `npm run dev` 確認無錯誤
   - 執行 `npm run lint` 確認程式碼品質
   - 執行 `npm run test` 確認測試通過
   - 瀏覽器驗證所有頁面功能

### 流程二：單一頁面/元件轉換

將單一 HTML 頁面或區塊轉換為 Vue SFC 元件。

1. 分析 HTML 結構與 BEM class
2. 依 [html-to-sfc.md](references/html-to-sfc.md) 轉換語法
3. 依 [css-conversion.md](references/css-conversion.md) 轉換樣式
4. 依 [js-to-vue.md](references/js-to-vue.md) 轉換互動邏輯
5. 產出 TypeScript Vue SFC 元件（含 Props 型別定義）
6. 撰寫元件測試

### 流程三：審查已轉換的程式碼

1. 檢查元件拆分是否合理（[html-to-sfc.md](references/html-to-sfc.md)）
2. 檢查專案結構（[project-structure.md](references/project-structure.md)）
3. 檢查狀態管理是否適當（[state-management.md](references/state-management.md)）
4. 檢查 CSS 方案使用正確性（[css-conversion.md](references/css-conversion.md)）
5. 檢查測試覆蓋率（[testing.md](references/testing.md)）

---

## 參考文件索引

依據任務類型載入對應的 references 文件：

### 核心轉換

| 文件                                                    | 用途                         | 載入時機                |
| ------------------------------------------------------- | ---------------------------- | ----------------------- |
| [project-structure.md](references/project-structure.md) | Vue 3 專案結構規範           | 建立新專案、審查結構    |
| [html-to-sfc.md](references/html-to-sfc.md)             | HTML → Vue SFC 元件拆分      | 轉換 HTML、拆分元件     |
| [css-conversion.md](references/css-conversion.md)       | CSS/SASS → Tailwind/Scoped   | 轉換樣式                |
| [js-to-vue.md](references/js-to-vue.md)                 | vanilla JS → Composition API | 轉換互動邏輯            |
| [svg-usage.md](references/svg-usage.md)                 | SVG 遷移與使用方式           | 處理 SVG 圖示/插圖/裝飾 |

### 功能模組

| 文件                                                  | 用途                          | 載入時機      |
| ----------------------------------------------------- | ----------------------------- | ------------- |
| [routing.md](references/routing.md)                   | 多頁面 → Vue Router 4         | 處理頁面路由  |
| [forms.md](references/forms.md)                       | 表單 → VeeValidate + Zod      | 處理表單轉換  |
| [state-management.md](references/state-management.md) | 狀態管理 → Pinia              | 處理全域狀態  |
| [server-state.md](references/server-state.md)         | Server State → TanStack Query | 處理 API 呼叫 |

### 跨領域

| 文件                                | 用途                | 載入時機          |
| ----------------------------------- | ------------------- | ----------------- |
| [theming.md](references/theming.md) | 深淺色主題遷移      | 處理主題/暗色模式 |
| [testing.md](references/testing.md) | Vitest + Playwright | 撰寫/審查測試     |

---

## Assets

### Boilerplate 模板

路徑：`assets/boilerplate/`

Vite + Vue 3 + TypeScript 專案模板，預裝：

- Tailwind CSS v4（`@tailwindcss/vite`）
- Vue Router 4
- TanStack Query (Vue)
- Pinia（含 theme store 範例）
- VeeValidate + Zod
- Vitest + Vue Test Utils
- Playwright

使用指令：

- 開發：`npm run dev`
- 建構：`npm run build`
- 測試：`npm run test`
- E2E：`npm run e2e`
- Lint：`npm run lint`

### Linter / Formatter 設定

路徑：`assets/configs/`

| 檔案               | 工具         | 關鍵規則                                        |
| ------------------ | ------------ | ----------------------------------------------- |
| `eslint.config.js` | ESLint       | Vue 3、TypeScript strict、const/===、巢狀 ≤3 層 |
| `.prettierrc.json` | Prettier     | 單引號、2 空格、LF、Tailwind class 排序         |
| `.editorconfig`    | EditorConfig | UTF-8、2 空格、LF                               |

---

## 注意事項

- 本 skill 不執行 CSS Reset — 如來源專案有自訂 Reset 需手動遷移
- 所有程式碼註解使用**中文**
- 所有函式必須有 **TSDoc 註解**
- 遵循 **SOLID 設計原則**，特別是單一職責
- 元件命名使用 **PascalCase**
- Composables 命名使用 **camelCase** + `use` 前綴
- 採用 **Mobile-First** 響應式設計策略
- 遵循 **WCAG 2.1 AA** 無障礙等級
- 每個元件完成後必須撰寫對應的**單元測試**
- 所有 Vue SFC 使用 **`<script setup lang="ts">`** 語法
