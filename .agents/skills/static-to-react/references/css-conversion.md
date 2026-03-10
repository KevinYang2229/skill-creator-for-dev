# CSS/SASS → React CSS 方案轉換

## 目錄

- [方案選擇決策樹](#方案選擇決策樹)
- [Tailwind CSS v4（預設）](#tailwind-css-v4預設)
- [Styled Components](#styled-components)
- [SASS（CSS Modules）](#sasscss-modules)

---

## 方案選擇決策樹

```
來源專案使用什麼 CSS 方案？
├── 使用者指定 Tailwind → Tailwind CSS v4
├── 使用者指定 Styled Components → Styled Components
├── 使用者指定 SASS → SASS (CSS Modules)
└── 未指定 → 預設使用 Tailwind CSS v4
```

---

## Tailwind CSS v4（預設）

### 安裝

Tailwind v4 已整合至 boilerplate，無需額外安裝。使用 `@tailwindcss/vite` 插件。

### BEM → Tailwind 對照

```scss
// 原始 SASS (BEM)
.card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  &__description {
    font-size: 0.875rem;
    color: #6b7280;
  }

  &--featured {
    border: 2px solid #3b82f6;
  }
}
```

```tsx
// Tailwind 元件
function Card({ title, description, featured = false }: CardProps) {
  return (
    <div
      className={`flex flex-col rounded-lg p-6 shadow-md ${
        featured ? "border-2 border-blue-500" : ""
      }`}
    >
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
```

### 常見屬性對照

| CSS 屬性                    | Tailwind Class   |
| --------------------------- | ---------------- |
| `display: flex`             | `flex`           |
| `justify-content: center`   | `justify-center` |
| `align-items: center`       | `items-center`   |
| `padding: 1rem`             | `p-4`            |
| `margin: auto`              | `m-auto`         |
| `border-radius: 0.5rem`     | `rounded-lg`     |
| `font-size: 1.25rem`        | `text-xl`        |
| `font-weight: 700`          | `font-bold`      |
| `color: #3b82f6`            | `text-blue-500`  |
| `background-color: #f9fafb` | `bg-gray-50`     |

### 響應式轉換

```scss
// 原始 SASS
.container {
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
    max-width: 1280px;
  }
}
```

```tsx
// Tailwind (Mobile First)
<div className="p-4 md:p-8 lg:max-w-screen-xl lg:p-12">
```

### 深淺色模式

```scss
// 原始 SASS
.card {
  background: #ffffff;
  color: #1a1a1a;
}

[data-theme="dark"] .card {
  background: #1e1e1e;
  color: #f5f5f5;
}
```

```tsx
// Tailwind dark mode (class 策略)
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
```

---

## Styled Components

### 安裝

```bash
npm install styled-components
npm install -D @types/styled-components
```

### BEM → Styled Components

```scss
// 原始 SASS
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }
  &--featured {
    border: 2px solid #3b82f6;
  }
}
```

```tsx
import styled from "styled-components";

const CardWrapper = styled.div<{ $featured?: boolean }>`
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ${({ $featured }) => $featured && "border: 2px solid #3b82f6;"}
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
`;

function Card({ title, featured }: CardProps) {
  return (
    <CardWrapper $featured={featured}>
      <CardTitle>{title}</CardTitle>
    </CardWrapper>
  );
}
```

### 主題系統

```tsx
import { ThemeProvider } from "styled-components";

const lightTheme = {
  colors: { bg: "#ffffff", text: "#1a1a1a", primary: "#3b82f6" },
};

const darkTheme = {
  colors: { bg: "#0a0a0a", text: "#f5f5f5", primary: "#60a5fa" },
};

// 使用主題
const Container = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
`;
```

---

## SASS（CSS Modules）

### 安裝

```bash
npm install -D sass
```

Vite 原生支援 CSS Modules，檔名使用 `.module.scss`。

### 轉換方式

```scss
// Card.module.scss
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &--featured {
    border: 2px solid #3b82f6;
  }
}
```

```tsx
import styles from "./Card.module.scss";

function Card({ title, featured }: CardProps) {
  return (
    <div
      className={`${styles.card} ${featured ? styles["card--featured"] : ""}`}
    >
      <h3 className={styles.card__title}>{title}</h3>
    </div>
  );
}
```

### SASS 變數 → CSS Custom Properties

```scss
// 原始 SASS 變數
$color-primary: #3b82f6;
$color-bg: #ffffff;
$font-size-base: 1rem;

// → CSS Custom Properties（支援執行時期切換）
:root {
  --color-primary: #3b82f6;
  --color-bg: #ffffff;
  --font-size-base: 1rem;
}

.dark {
  --color-primary: #60a5fa;
  --color-bg: #0a0a0a;
}
```
