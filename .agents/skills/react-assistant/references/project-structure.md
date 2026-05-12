# React 專案結構規範

## 目錄

- [標準目錄結構](#標準目錄結構)
- [檔案命名慣例](#檔案命名慣例)
- [目錄職責說明](#目錄職責說明)
- [Path Alias](#path-alias)
- [Barrel Exports](#barrel-exports)

---

## 標準目錄結構

```
src/
├── routes/               ← TanStack Router file-based 路由
│   ├── __root.tsx        ← 根 Layout
│   ├── index.tsx         ← 首頁 /
│   ├── about.tsx         ← /about
│   └── dashboard/
│       ├── index.tsx     ← /dashboard
│       └── settings.tsx  ← /dashboard/settings
├── components/           ← 共用元件
│   ├── ui/               ← 基礎 UI 元件（Button, Input, Modal...）
│   └── layout/           ← 佈局元件（Header, Footer, Sidebar...）
├── hooks/                ← 自訂 React Hooks
├── stores/               ← Zustand stores
├── lib/                  ← 工具函式、API client、常數
│   ├── api.ts            ← API client 設定（搭配 TanStack Query）
│   ├── utils.ts          ← 通用工具函式
│   └── constants.ts      ← 常數定義
├── types/                ← 全域 TypeScript 型別
├── test/                 ← 測試設定與工具
│   └── setup.ts          ← Vitest 全域設定
├── main.tsx              ← 應用程式入口
└── index.css             ← 全域樣式（含 Tailwind import）
```

---

## 檔案命名慣例

| 類型           | 命名方式                 | 範例                         |
| -------------- | ------------------------ | ---------------------------- |
| React 元件     | PascalCase               | `Button.tsx`, `UserCard.tsx` |
| Hooks          | camelCase + `use` prefix | `useMediaQuery.ts`           |
| Zustand stores | camelCase                | `theme.ts`, `auth.ts`        |
| 工具函式       | camelCase                | `formatDate.ts`, `api.ts`    |
| 型別定義       | camelCase                | `user.ts`, `api.d.ts`        |
| 測試檔案       | 原檔名 + `.test`         | `Button.test.tsx`            |
| 路由檔案       | 依 TanStack Router 慣例  | `index.tsx`, `$id.tsx`       |

### 命名規則

- 一個檔案只匯出一個元件（單一職責）
- 元件檔名與元件名稱一致
- 測試檔案與原始檔案放在同一目錄

---

## 目錄職責說明

### `routes/`

TanStack Router file-based routing，目錄結構即路由結構：

- `__root.tsx` — 全站共用 Layout
- `index.tsx` — 各層級的首頁元件
- `$param.tsx` — 動態路由參數
- `_layout.tsx` — 巢狀 Layout（不產生路由路徑）

### `components/`

僅放置**可復用**的元件。頁面專屬元件直接放在對應的 route 檔案中，或放在 `routes/` 旁。

```
components/
├── ui/           ← 基礎原子元件
│   ├── Button.tsx
│   ├── Input.tsx
│   └── index.ts  ← barrel export
└── layout/       ← 佈局元件
    ├── Header.tsx
    └── Footer.tsx
```

### `stores/`

每個 Zustand store 對應一個業務領域：

```
stores/
├── theme.ts      ← 主題切換
├── auth.ts       ← 認證狀態
└── ui.ts         ← UI 狀態（sidebar、modal 等）
```

### `lib/`

與 React 無關的純邏輯：

```
lib/
├── api.ts        ← fetch / axios 封裝
├── utils.ts      ← 通用工具函式
├── constants.ts  ← 常數定義
└── validators.ts ← Zod schema 定義
```

---

## Path Alias

在 `tsconfig.app.json` 與 `vite.config.ts` 中配置：

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': resolve(__dirname, './src'),
  },
}
```

使用方式：

```typescript
// ✅ 使用 alias
import { Button } from "@/components/ui/Button";

// ❌ 避免相對路徑
import { Button } from "../../../components/ui/Button";
```

---

## Barrel Exports

在各目錄的 `index.ts` 中統一匯出：

```typescript
// src/components/ui/index.ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Modal } from "./Modal";
```

### 規則

- **僅**在 `components/` 和 `lib/` 使用 barrel exports
- `routes/` 目錄**不使用** barrel exports（由 Router 自動處理）
- `stores/` 中每個 store 獨立 import，不使用 barrel
