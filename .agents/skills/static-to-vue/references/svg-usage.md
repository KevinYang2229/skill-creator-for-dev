# SVG 遷移與使用方式

## 目錄

- [使用方式決策樹](#使用方式決策樹)
- [四種使用方式對照](#四種使用方式對照)
- [靜態 HTML SVG 遷移](#靜態-html-svg-遷移)
- [vite-svg-loader 設定](#vite-svg-loader-設定)
- [無障礙指引](#無障礙指引)
- [效能建議](#效能建議)

---

## 使用方式決策樹

```
SVG 的用途是？
├── Icon / Logo (需要動態 color / size)
│   └── ✅ vite-svg-loader 作為 Vue 元件
├── 大型插圖 (複雜 SVG、不需互動)
│   └── ✅ <img> 標籤引用
├── 少量 SVG、需動態控制路徑/動畫
│   └── ✅ Inline Template
└── 純裝飾背景圖形
    └── ✅ CSS background-image / mask-image
```

---

## 四種使用方式對照

### ① vite-svg-loader 元件 (推薦 Icon / Logo)

```vue
<script setup lang="ts">
// 使用 ?component 後綴 import
import CloseIcon from "@/assets/icons/close.svg?component";

const handleClose = () => {
  /* ... */
};
</script>

<template>
  <button @click="handleClose" aria-label="關閉">
    <CloseIcon class="size-5 text-current" aria-hidden="true" />
  </button>
</template>
```

**優點**：可用 `class`/`style` 控制、支援 Tailwind、輕量。

### ② `<img>` 標籤引用 (大型插圖)

```vue
<template>
  <!-- 方式一：assets/ 下 -->
  <img src="@/assets/hero.svg" alt="首頁插圖" />

  <!-- 方式二：public/ 下 -->
  <img src="/hero.svg" alt="首頁插圖" />
</template>
```

### ③ Inline Template (動態控制路徑)

```vue
<template>
  <svg viewBox="0 0 100 100" class="size-16">
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="currentColor"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="offset"
    />
  </svg>
</template>
```

---

## 靜態 HTML SVG 遷移

### 來源一：HTML Inline `<svg>`

1. 抽取為獨立 `.svg` 檔案 (如 `src/assets/icons/check.svg`)。
2. 使用 `vite-svg-loader` import。

### 來源二：`<img src="*.svg">`

- 需要控制顏色 → 改用 `?component`。
- 不需互動 → 保持 `<img>`。

---

## vite-svg-loader 設定

Boilerplate 已預裝 `vite-svg-loader`：

```typescript
// vite.config.ts
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(), // 預設 import 方式
  ],
});
```

---

## 無障礙指引

- **裝飾性**：`<CloseIcon aria-hidden="true" />`。
- **具語意**：`<svg role="img" aria-label="搜尋">`。
- **按鈕內**：由 `<button aria-label="關閉">` 提供語意。
