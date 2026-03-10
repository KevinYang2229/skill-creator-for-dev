# HTML → JSX 元件拆分

## 目錄

- [語法差異對照表](#語法差異對照表)
- [元件拆分策略](#元件拆分策略)
- [BEM → Props 映射](#bem--props-映射)
- [靜態資源遷移](#靜態資源遷移)
- [常見陷阱](#常見陷阱)

---

## 語法差異對照表

| HTML                 | JSX                        | 說明                 |
| -------------------- | -------------------------- | -------------------- |
| `class="..."`        | `className="..."`          | 保留字衝突           |
| `for="..."`          | `htmlFor="..."`            | 保留字衝突           |
| `tabindex="0"`       | `tabIndex={0}`             | camelCase + 數值型別 |
| `style="color: red"` | `style={{ color: 'red' }}` | 物件語法             |
| `onclick="fn()"`     | `onClick={fn}`             | camelCase + 函式參考 |
| `<!-- 註解 -->`      | `{/* 註解 */}`             | JSX 註解語法         |
| `<img>`              | `<img />`                  | 自閉合標籤           |
| `<input>`            | `<input />`                | 自閉合標籤           |
| `<br>`               | `<br />`                   | 自閉合標籤           |
| `value="text"`       | `defaultValue="text"`      | 非受控輸入           |
| `checked`            | `defaultChecked`           | 非受控 checkbox      |

### 布林屬性

```tsx
// HTML: <input disabled>
// JSX:
<input disabled />        // ✅ 等同 disabled={true}
<input disabled={false} /> // ✅ 動態控制
```

---

## 元件拆分策略

### 步驟一：識別語意區塊

靜態 HTML 中的語意標記（`<!-- Header 開始 -->` ... `<!-- Header 結束 -->`）直接對應為 React 元件：

```html
<!-- 原始 HTML -->
<!-- ========== Header 開始 ========== -->
<header class="header">
  <nav class="header__nav">...</nav>
</header>
<!-- ========== Header 結束 ========== -->
```

```tsx
// → React 元件
function Header() {
  return (
    <header className="...">
      <nav>...</nav>
    </header>
  );
}
```

### 步驟二：依重複性與獨立性拆分

| 判斷條件                | 行動           |
| ----------------------- | -------------- |
| 出現 2 次以上的相同結構 | 抽取為共用元件 |
| 具備獨立互動邏輯        | 抽取為獨立元件 |
| 結構超過 50 行          | 考慮拆分子元件 |
| 僅出現一次、無互動      | 保留在父元件中 |

### 步驟三：決定元件層級

```
App (根)
├── Header （佈局元件 → components/layout/）
│   ├── Logo
│   └── NavMenu
├── Main
│   ├── HeroSection （頁面元件 → 放在 route 檔案內）
│   └── FeatureGrid
│       └── FeatureCard （共用元件 → components/ui/）
└── Footer （佈局元件 → components/layout/）
```

---

## BEM → Props 映射

### Modifier → Props

```html
<!-- BEM modifier -->
<button class="btn btn--primary btn--large">送出</button>
<button class="btn btn--secondary btn--small">取消</button>
```

```tsx
// React Props
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

function Button({
  variant = "primary",
  size = "medium",
  children,
}: ButtonProps) {
  return (
    <button className={`btn btn--${variant} btn--${size}`}>{children}</button>
  );
}
```

### 搭配 Tailwind CSS

```tsx
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva("rounded font-medium transition-colors", {
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    },
    size: {
      small: "px-3 py-1.5 text-sm",
      medium: "px-4 py-2 text-base",
      large: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
```

---

## 靜態資源遷移

### 圖片

```html
<!-- HTML -->
<img src="assets/images/hero.jpg" alt="Hero" />
```

```tsx
// React — 放在 public/ 或 import
// 方式一：public/ 目錄（不經 Vite 處理）
<img src="/images/hero.jpg" alt="Hero" />;

// 方式二：import（經 Vite 處理、含 hash）
import heroImg from "@/assets/hero.jpg";
<img src={heroImg} alt="Hero" />;
```

### 字體

在 `index.css` 中 import：

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
```

### SVG

SVG 遷移方式依用途而異，簡要如下：

```tsx
// Icon / Logo → SVGR 元件（推薦）
import CloseIcon from "@/assets/icons/close.svg?react";
<CloseIcon className="size-5 text-current" aria-hidden="true" />;

// 大型插圖 → <img> 標籤
import heroSvg from "@/assets/illustrations/hero.svg";
<img src={heroSvg} alt="首頁插圖" />;
```

完整的 SVG 使用方式、遷移對照表與效能建議，見 [svg-usage.md](svg-usage.md)。

## 常見陷阱

### `dangerouslySetInnerHTML`

```tsx
// ⚠️ 僅在信任內容來源時使用
<div dangerouslySetInnerHTML={{ __html: trustedHTML }} />
```

### JSX 只能有一個根元素

```tsx
// ❌ 錯誤
return (
  <h1>標題</h1>
  <p>內容</p>
);

// ✅ 使用 Fragment
return (
  <>
    <h1>標題</h1>
    <p>內容</p>
  </>
);
```

### 條件渲染

```tsx
// 取代 HTML 中的 display:none 切換
{
  isVisible && <Modal />;
}

// 取代 if/else
{
  isLoggedIn ? <Dashboard /> : <LoginForm />;
}
```
