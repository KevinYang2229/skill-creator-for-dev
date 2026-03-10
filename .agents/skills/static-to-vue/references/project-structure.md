# Vue 3 專案結構規範

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
├── router/               ← Vue Router 配置
│   └── index.ts          ← 路由宣告
├── views/                ← 頁面元件 (與路由對應)
│   ├── HomeView.vue
│   └── AboutView.vue
├── components/           ← 共用元件
│   ├── ui/               ← 基礎 UI 元件 (Button, Input, Modal...)
│   └── layout/           ← 佈局元件 (Header, Footer, Sidebar...)
├── composables/          ← 自訂 Vue Composables (Composition API)
├── stores/               ← Pinia stores
├── assets/               ← 靜態資源 (圖片、字體、SVG)
├── lib/                  ← 工具函式、API client、常數
│   ├── api.ts            ← API client 設定 (搭配 TanStack Query)
│   ├── utils.ts          ← 通用工具函式
│   └── constants.ts      ← 常數定義
├── types/                ← 全域 TypeScript 型別
├── test/                 ← 測試設定與工具
│   └── setup.ts          ← Vitest 全域設定
├── App.vue               ← 根元件
├── main.ts               ← 應用程式入口
└── index.css             ← 全域樣式 (含 Tailwind import)
```

---

## 檔案命名慣例

| 類型         | 命名方式                 | 範例                                  |
| ------------ | ------------------------ | ------------------------------------- |
| Vue 元件     | PascalCase               | `BaseButton.vue`, `UserCard.vue`      |
| Composables  | camelCase + `use` prefix | `useMediaQuery.ts`                    |
| Pinia stores | camelCase                | `useThemeStore.ts`, `useAuthStore.ts` |
| 工具函式     | camelCase                | `formatDate.ts`, `api.ts`             |
| 型別定義     | camelCase                | `user.ts`, `api.d.ts`                 |
| 測試檔案     | 原檔名 + `.test`         | `BaseButton.test.ts`                  |

### 命名規則

- 一個檔案只匯出一個元件 (單一職職)
- 元件檔名與組件名稱一致
- 測試檔案與原始檔案放在同一目錄
- 元件命名應至少包含兩個單字 (避免與 HTML 標籤衝突，如 `AppButton` 而非 `Button`)

---

## 目錄職責說明

### `views/`

與路由對應的頂層元件。檔名建議以 `View` 結尾以與共用元件區分：

- `HomeView.vue` — /
- `AboutView.vue` — /about

### `components/`

僅放置**可復用**的元件：

```
components/
├── ui/           ← 基礎原子元件
│   ├── AppButton.vue
│   ├── AppInput.vue
│   └── index.ts  ← barrel export
└── layout/       ← 佈局元件
    ├── AppHeader.vue
    └── AppFooter.vue
```

### `composables/`

存放封裝好的 Composition API 邏輯 (相當於 React Hooks)：

```
composables/
├── useFetch.ts
└── useAuth.ts
```

### `stores/`

每個 Pinia store 對應一個業務領域：

```
stores/
├── theme.ts      ← 主題切換 (useThemeStore)
├── auth.ts       ← 認證狀態 (useAuthStore)
└── ui.ts         ← UI 狀態 (useUIStore)
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

```vue
<!-- ✅ 使用 alias -->
<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";
</script>

<!-- ❌ 避免相對路徑 -->
<script setup lang="ts">
import AppButton from "../../../components/ui/AppButton.vue";
</script>
```

---

## Barrel Exports

在各目錄的 `index.ts` 中統一匯出：

```typescript
// src/components/ui/index.ts
export { default as AppButton } from "./AppButton.vue";
export { default as AppInput } from "./AppInput.vue";
```

### 規則

- **僅**在 `components/` 和 `lib/` 使用 barrel exports
- `composables/` 與 `stores/` 建議直接 import 具名匯出或檔案
