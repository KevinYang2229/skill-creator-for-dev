# 深淺色主題系統

## 目錄

- [架構總覽](#架構總覽)
- [Tailwind dark mode](#tailwind-dark-mode)
- [Zustand Theme Store](#zustand-theme-store)
- [CSS Custom Properties](#css-custom-properties)
- [系統偏好偵測](#系統偏好偵測)
- [主題切換元件](#主題切換元件)

---

## 架構總覽

| 層級       | 工具                                |
| ---------- | ----------------------------------- |
| 狀態管理   | Zustand store + localStorage 持久化 |
| DOM 操作   | `<html>` 元素 toggle `dark` class   |
| 樣式實作   | Tailwind `dark:` prefix             |
| 自訂色彩   | CSS custom properties               |
| 初始值偵測 | `prefers-color-scheme` 媒體查詢     |

---

## Tailwind dark mode

Tailwind v4 使用 class 策略（`dark` class on `<html>`）：

### 常見明暗色對照

| 用途     | Light              | Dark                     |
| -------- | ------------------ | ------------------------ |
| 背景     | `bg-white`         | `dark:bg-gray-950`       |
| 文字     | `text-gray-900`    | `dark:text-gray-100`     |
| 次要文字 | `text-gray-500`    | `dark:text-gray-400`     |
| 邊框     | `border-gray-200`  | `dark:border-gray-700`   |
| 卡片     | `bg-white`         | `dark:bg-gray-800`       |
| hover    | `hover:bg-gray-50` | `dark:hover:bg-gray-700` |

### 使用範例

```tsx
<div className="bg-white text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100 dark:shadow-lg">
  <h2 className="text-lg font-semibold">卡片標題</h2>
  <p className="text-gray-600 dark:text-gray-400">卡片內容</p>
</div>
```

---

## Zustand Theme Store

Boilerplate 已包含 `stores/theme.ts`：

```typescript
interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  setDark: (isDark: boolean) => void;
}
```

### 初始化系統偏好

在 `__root.tsx` 中初始化主題：

```tsx
import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme";

/** 初始化主題（讀取系統偏好） */
function useInitTheme() {
  const setDark = useThemeStore((s) => s.setDark);

  useEffect(() => {
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

## CSS Custom Properties

在 `index.css` 定義語意化色彩：

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
  --color-primary: #3b82f6;
}

.dark {
  --color-bg: #0a0a0a;
  --color-text: #f5f5f5;
  --color-surface: #1f2937;
  --color-border: #374151;
  --color-primary: #60a5fa;
}
```

### 搭配 Tailwind v4 @theme

```css
@import "tailwindcss";

@theme {
  --color-surface: var(--color-surface);
  --color-on-surface: var(--color-text);
  --color-primary: var(--color-primary);
}
```

---

## 系統偏好偵測

### 監聽系統主題即時變化

```tsx
/** 監聽系統主題變化 */
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

---

## 主題切換元件

```tsx
import { useThemeStore } from "@/stores/theme";

/** 主題切換按鈕 */
function ThemeToggle() {
  const { isDark, toggle } = useThemeStore();

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={isDark ? "切換為淺色模式" : "切換為深色模式"}
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
```

### 三態主題（Light / Dark / System）

```typescript
type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "system",
      setMode: (mode) => {
        const isDark =
          mode === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : mode === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        set({ mode });
      },
    }),
    { name: "theme-storage" },
  ),
);
```
