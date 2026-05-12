# Tailwind CSS v4 樣式系統

## 目錄

- [基本設定](#基本設定)
- [Utility-First 策略](#utility-first-策略)
- [響應式設計](#響應式設計)
- [自訂主題](#自訂主題)
- [CSS Custom Properties](#css-custom-properties)
- [動畫與過渡](#動畫與過渡)
- [常用模式](#常用模式)

---

## 基本設定

在 `index.css` 中引入 Tailwind：

```css
@import "tailwindcss";
```

Vite plugin 在 `vite.config.ts` 中已設定 `@tailwindcss/vite`。

---

## Utility-First 策略

### 基本原則

直接在 JSX 中使用 utility class：

```tsx
// ✅ 使用 Tailwind utilities
<div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
    標題
  </h2>
</div>
```

### 條件 class

```tsx
// ✅ 使用模板字串
<button className={`rounded-lg px-4 py-2 ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>

// ✅ 使用 clsx（需安裝）
import { clsx } from "clsx";

<button className={clsx("rounded-lg px-4 py-2", {
  "bg-blue-600 text-white": isActive,
  "bg-gray-100 text-gray-700": !isActive,
})}>
```

---

## 響應式設計

### Mobile-First 斷點

```tsx
// 手機優先，逐步增加
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

| 斷點   | 最小寬度 | 常見裝置        |
| ------ | -------- | --------------- |
| (預設) | 0px      | 手機            |
| `sm`   | 640px    | 大手機 / 小平板 |
| `md`   | 768px    | 平板            |
| `lg`   | 1024px   | 筆電            |
| `xl`   | 1280px   | 桌機            |
| `2xl`  | 1536px   | 大螢幕          |

### 容器查詢（Container Queries）

```tsx
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
    {/* 依容器寬度響應 */}
  </div>
</div>
```

---

## 自訂主題

### @theme 指令

在 `index.css` 中使用 `@theme` 擴充設計語彙：

```css
@import "tailwindcss";

@theme {
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;

  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  --radius-card: 0.75rem;
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

使用：

```tsx
<div className="rounded-card bg-brand-500 font-sans shadow-card">
```

---

## CSS Custom Properties

搭配深淺色主題使用：

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
}

.dark {
  --color-bg: #0a0a0a;
  --color-text: #f5f5f5;
  --color-surface: #1f2937;
  --color-border: #374151;
}
```

在 `@theme` 中引用：

```css
@theme {
  --color-surface: var(--color-surface);
  --color-on-surface: var(--color-text);
}
```

---

## 動畫與過渡

### 過渡效果

```tsx
// 基本過渡
<button className="transition-colors duration-200 hover:bg-blue-600">

// 多屬性過渡
<div className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
```

### 自訂 Keyframe 動畫

```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.4s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

使用：

```tsx
<div className="animate-fade-in">淡入元素</div>
<div className="animate-slide-up">滑入元素</div>
```

---

## 常用模式

### 卡片

```tsx
<div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
    標題
  </h3>
  <p className="mt-2 text-gray-600 dark:text-gray-400">說明文字</p>
</div>
```

### 水平置中容器

```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{/* 內容 */}</div>
```

### Flex 垂直置中

```tsx
<div className="flex min-h-screen items-center justify-center">
  {/* 內容 */}
</div>
```

### Grid Dashboard 佈局

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
  <StatCard title="營收" value="$12,345" />
  <StatCard title="訂單" value="456" />
  <StatCard title="用戶" value="789" />
  <StatCard title="轉換率" value="12.3%" />
</div>
```
