---
name: react-assistant
description: React 開發助手，協助從零開始建立現代 React Web 應用專案，提供完整 Boilerplate 模板與開發規範。用於：(1) 建立新的 Vite + React + TypeScript 專案（含 Tailwind CSS v4、TanStack Router、Zustand、TanStack Query 等預裝），(2) 新增頁面、元件或功能模組到現有 React 專案，(3) 審查 React 程式碼品質。當使用者需要建立 React 專案、新增 React 頁面/元件、設計 React 元件架構、設定 Zustand 狀態管理、整合 TanStack Query API 呼叫、建立表單驗證、或進行 React 程式碼審查時觸發此技能。
---

# React 開發助手

協助從零建立現代 React Web 應用專案，提供標準化的開發工作流程。

## 技術棧

| 類別         | 預設方案              | 可選方案                |
| ------------ | --------------------- | ----------------------- |
| 建構工具     | Vite                  | Next.js（需使用者指定） |
| 語言         | TypeScript            | —                       |
| CSS 方案     | Tailwind CSS v4       | Styled Components, SASS |
| 狀態管理     | Zustand               | —                       |
| 表單處理     | React Hook Form + Zod | —                       |
| Server State | TanStack Query        | —                       |
| 路由         | TanStack Router       | —                       |
| 單元測試     | Vitest                | —                       |
| E2E 測試     | Playwright            | —                       |

---

## 工作流程

根據使用者需求，選擇對應流程。

### 流程一：建立新 React 專案

從 Boilerplate 模板建立完整的 React Web 應用專案。

1. **初始化專案**
   - 複製 `assets/boilerplate/` 至目標目錄
   - 複製 `assets/configs/` 設定檔至專案根目錄
   - 更新 `index.html` 中的 `<title>` 與 `<meta description>`
   - 更新 `package.json` 中的 `name`
   - 執行 `npm install`

2. **建立專案結構**
   - 依需求建立路由結構（見 [routing.md](references/routing.md)）
   - 建立目錄結構（見 [project-structure.md](references/project-structure.md)）

3. **設定樣式與主題**
   - 調整品牌色彩與 @theme 設定（見 [css-styling.md](references/css-styling.md)）
   - 設定深淺色主題（見 [theming.md](references/theming.md)）

4. **實作功能**
   - 建立頁面元件與路由
   - 建立 UI 元件（見 [component-patterns.md](references/component-patterns.md)）
   - 設定 Zustand stores（見 [state-management.md](references/state-management.md)）
   - 設定 API 與 TanStack Query（見 [server-state.md](references/server-state.md)）
   - 處理表單（見 [forms.md](references/forms.md)）

5. **測試**
   - 撰寫元件與工具函式的 Vitest 測試
   - 撰寫關鍵流程的 Playwright E2E 測試
   - （見 [testing.md](references/testing.md)）

6. **驗證**
   - 執行 `npm run dev` 確認無錯誤
   - 執行 `npm run lint` 確認程式碼品質
   - 執行 `npm run test` 確認測試通過
   - 瀏覽器驗證所有頁面功能

### 流程二：新增頁面/元件/功能模組

在既有 React 專案中新增頁面或功能。

1. 確認目標路由路徑與頁面結構
2. 在 `src/routes/` 中建立對應路由檔案（見 [routing.md](references/routing.md)）
3. 建立頁面元件，使用 Tailwind CSS 樣式（見 [css-styling.md](references/css-styling.md)）
4. 如需新增共用元件，放在 `components/` 目錄（見 [component-patterns.md](references/component-patterns.md)）
5. 如需全域狀態，在 `stores/` 建立 Zustand store（見 [state-management.md](references/state-management.md)）
6. 如需 API 請求，建立 TanStack Query hooks（見 [server-state.md](references/server-state.md)）
7. 如需表單，使用 React Hook Form + Zod（見 [forms.md](references/forms.md)）
8. 撰寫對應的單元測試（見 [testing.md](references/testing.md)）

### 流程三：審查程式碼品質

1. 檢查專案結構（[project-structure.md](references/project-structure.md)）
2. 檢查元件設計模式（[component-patterns.md](references/component-patterns.md)）
3. 檢查路由設計（[routing.md](references/routing.md)）
4. 檢查樣式使用（[css-styling.md](references/css-styling.md)）
5. 檢查狀態管理（[state-management.md](references/state-management.md)）
6. 檢查測試覆蓋率（[testing.md](references/testing.md)）

---

## 參考文件索引

依據任務類型載入對應的 references 文件：

### 核心開發

| 文件                                                      | 用途                     | 載入時機             |
| --------------------------------------------------------- | ------------------------ | -------------------- |
| [project-structure.md](references/project-structure.md)   | 專案結構規範             | 建立新專案、審查結構 |
| [routing.md](references/routing.md)                       | TanStack Router 路由設計 | 新增頁面、處理導航   |
| [component-patterns.md](references/component-patterns.md) | 元件設計模式             | 建立元件、審查結構   |
| [css-styling.md](references/css-styling.md)               | Tailwind CSS v4 樣式     | 撰寫/審查樣式        |

### 功能模組

| 文件                                                  | 用途                  | 載入時機      |
| ----------------------------------------------------- | --------------------- | ------------- |
| [state-management.md](references/state-management.md) | Zustand 狀態管理      | 處理全域狀態  |
| [server-state.md](references/server-state.md)         | TanStack Query 規範   | 處理 API 呼叫 |
| [forms.md](references/forms.md)                       | React Hook Form + Zod | 處理表單      |

### 跨領域

| 文件                                | 用途                | 載入時機          |
| ----------------------------------- | ------------------- | ----------------- |
| [theming.md](references/theming.md) | 深淺色主題系統      | 處理主題/暗色模式 |
| [testing.md](references/testing.md) | Vitest + Playwright | 撰寫/審查測試     |

---

## Assets

### Boilerplate 模板

路徑：`assets/boilerplate/`

Vite + React + TypeScript 專案模板，預裝：

- Tailwind CSS v4（`@tailwindcss/vite`）
- TanStack Router（file-based routing）
- TanStack Query v5
- Zustand v5（含 theme store 範例）
- React Hook Form + Zod
- Vitest + Testing Library
- Playwright
- SVGR（SVG as React component）

使用指令：

- 開發：`npm run dev`
- 建構：`npm run build`
- 測試：`npm run test`
- E2E：`npm run e2e`
- Lint：`npm run lint`
- 格式化：`npm run format`

### Linter / Formatter 設定

路徑：`assets/configs/`

| 檔案               | 工具         | 關鍵規則                                              |
| ------------------ | ------------ | ----------------------------------------------------- |
| `eslint.config.js` | ESLint       | React Hooks、TypeScript strict、const/===、巢狀 ≤3 層 |
| `.prettierrc.json` | Prettier     | 單引號、2 空格、LF、Tailwind class 排序               |
| `.editorconfig`    | EditorConfig | UTF-8、2 空格、LF                                     |

---

## 注意事項

- 所有程式碼註解使用**中文**
- 所有函式必須有 **TSDoc 註解**
- 遵循 **SOLID 設計原則**，特別是單一職責
- 元件命名使用 **PascalCase**
- Hooks 命名使用 **camelCase** + `use` 前綴
- 採用 **Mobile-First** 響應式設計策略
- 遵循 **WCAG 2.1 AA** 無障礙等級
- 每個元件完成後必須撰寫對應的**單元測試**
