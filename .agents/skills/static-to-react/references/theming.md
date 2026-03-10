# 深淺色主題系統遷移

## 目錄

- [策略總覽](#策略總覽)
- [Tailwind dark mode（預設）](#tailwind-dark-mode預設)
- [Zustand Theme Store](#zustand-theme-store)
- [CSS Custom Properties 遷移](#css-custom-properties-遷移)
- [系統偏好偵測](#系統偏好偵測)

---

## 策略總覽

| 來源機制               | 目標機制                               |
| ---------------------- | -------------------------------------- |
| `data-theme` 屬性切換  | `dark` class 切換（Tailwind）          |
| SASS 變數 + mixin      | CSS custom properties + `dark:` prefix |
| JS `classList.toggle`  | Zustand store + `useEffect`            |
| `prefers-color-scheme` | Zustand 初始化 + 媒體查詢監聽          |

---

## Tailwind dark mode（預設）

Tailwind v4 使用 class 策略（`dark` class on `<html>`）：

### 樣式轉換

```scss
// 原始 SASS — data-theme 切換
.card {
  background: #ffffff;
  color: #1a1a1a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .card {
  background: #1e1e1e;
  color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

```tsx
// Tailwind dark mode
<div className="bg-white text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100 dark:shadow-lg">
```

### 常見明暗色對照

| 用途     | Light              | Dark                     |
| -------- | ------------------ | ------------------------ |
| 背景     | `bg-white`         | `dark:bg-gray-950`       |
| 文字     | `text-gray-900`    | `dark:text-gray-100`     |
| 次要文字 | `text-gray-500`    | `dark:text-gray-400`     |
| 邊框     | `border-gray-200`  | `dark:border-gray-700`   |
| 卡片     | `bg-white`         | `dark:bg-gray-800`       |
| hover    | `hover:bg-gray-50` | `dark:hover:bg-gray-700` |

---

## Zustand Theme Store

Boilerplate 已包含 `stores/theme.ts`，提供：

```typescript
interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  setDark: (isDark: boolean) => void;
}
```

### 主題切換按鈕

```tsx
import { useThemeStore } from "@/stores/theme";

function ThemeToggle() {
  const { isDark, toggle } = useThemeStore();

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "切換為淺色模式" : "切換為深色模式"}
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
```

### 初始化系統偏好

```tsx
// App.tsx 或 __root.tsx 中
import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme";

function useInitTheme() {
  const setDark = useThemeStore((s) => s.setDark);

  useEffect(() => {
    // 若 localStorage 無存儲值，使用系統偏好
    const stored = localStorage.getItem("theme-storage");
    if (!stored) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDark(prefersDark);
    }
  }, [setDark]);
}
```

---

## CSS Custom Properties 遷移

```scss
// 原始 SASS 變數
$bg-color: #ffffff;
$text-color: #1a1a1a;
$primary: #3b82f6;

$bg-color-dark: #0a0a0a;
$text-color-dark: #f5f5f5;
$primary-dark: #60a5fa;
```

```css
/* → CSS Custom Properties (index.css) */
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-primary: #3b82f6;
}

.dark {
  --color-bg: #0a0a0a;
  --color-text: #f5f5f5;
  --color-primary: #60a5fa;
}
```

### 搭配 Tailwind v4

在 Tailwind v4 中使用 CSS custom properties 搭配 `@theme`：

```css
@import "tailwindcss";

@theme {
  --color-surface: var(--color-bg);
  --color-on-surface: var(--color-text);
}
```

---

## 系統偏好偵測

### 監聽系統主題變化

```tsx
function useSystemThemeListener() {
  const setDark = useThemeStore((s) => s.setDark);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [setDark]);
}
```
