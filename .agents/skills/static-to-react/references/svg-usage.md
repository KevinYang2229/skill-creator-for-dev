# SVG 使用方式

## 目錄

- [使用方式決策樹](#使用方式決策樹)
- [四種使用方式對照](#四種使用方式對照)
- [靜態 HTML SVG 遷移](#靜態-html-svg-遷移)
- [SVGR 設定](#svgr-設定)
- [無障礙指引](#無障礙指引)
- [效能建議](#效能建議)

---

## 使用方式決策樹

```
SVG 的用途是？
├── Icon / Logo（需要動態 color / size）
│   └── ✅ vite-plugin-svgr 作為 React 元件
├── 大型插圖（複雜 SVG、不需互動）
│   └── ✅ <img> 標籤引用
├── 少量 SVG、需動態控制路徑/動畫
│   └── ✅ Inline JSX
└── 純裝飾背景圖形
    └── ✅ CSS background-image / mask-image
```

---

## 四種使用方式對照

### ① SVGR React 元件（推薦 Icon / Logo）

```tsx
// 使用 ?react 後綴 import
import CloseIcon from "@/assets/icons/close.svg?react";

/** 關閉按鈕元件 */
function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label="關閉">
      <CloseIcon className="size-5 text-current" aria-hidden="true" />
    </button>
  );
}
```

**優點**：可用 `className`/`style` 控制大小與顏色、支援 Tailwind、Tree-shakable

**Tailwind 搭配技巧**：

```tsx
// 使用 currentColor 讓 SVG 顏色跟隨文字顏色
<CloseIcon className="size-6 text-gray-500 hover:text-gray-700" />

// 使用 Tailwind 的 size utility 控制大小
<LogoIcon className="size-8" />        // 32×32
<LogoIcon className="h-10 w-auto" />   // 高度 40px，寬度等比
```

### ② `<img>` 標籤引用（大型插圖）

```tsx
// 方式一：import（經 Vite 處理、含 hash）
import heroIllustration from "@/assets/illustrations/hero.svg";

<img src={heroIllustration} alt="首頁插圖" width={480} height={320} />;

// 方式二：放在 public/（不經處理）
<img src="/illustrations/hero.svg" alt="首頁插圖" width={480} height={320} />;
```

**適用場景**：複雜插圖（路徑數多）、不需動態控制顏色、需要瀏覽器快取

### ③ Inline JSX（動態控制路徑/動畫）

```tsx
interface CircleProgressProps {
  /** 進度百分比（0–100） */
  progress: number;
}

/** 圓形進度條 */
function CircleProgress({ progress }: CircleProgressProps) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      viewBox="0 0 100 100"
      className="size-16"
      role="img"
      aria-label={`進度 ${progress}%`}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="8"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-blue-500 transition-all duration-300"
      />
    </svg>
  );
}
```

**注意**：HTML SVG 屬性需轉為 camelCase（見下方對照表）

### ④ CSS background-image / mask-image（裝飾圖形）

```css
/* 背景裝飾圖形 */
.hero-section {
  background-image: url("@/assets/decorations/wave.svg");
  background-repeat: no-repeat;
  background-position: bottom;
}

/* 使用 mask-image 讓 SVG 跟隨顏色 */
.icon-mask {
  width: 24px;
  height: 24px;
  background-color: currentColor;
  mask-image: url("@/assets/icons/check.svg");
  mask-size: contain;
  mask-repeat: no-repeat;
}
```

**Tailwind 版本**：

```tsx
// Tailwind v4 支援任意值
<div className="bg-[url('@/assets/decorations/wave.svg')] bg-bottom bg-no-repeat" />
```

---

## 靜態 HTML SVG 遷移

### 來源一：HTML Inline `<svg>`

```html
<!-- 原始 HTML -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
>
  <path
    fill="currentColor"
    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  />
</svg>
```

**遷移方式**：

1. 抽取為獨立 `.svg` 檔案（如 `src/assets/icons/close.svg`）
2. 使用 SVGR import：`import CloseIcon from '@/assets/icons/close.svg?react'`
3. 如 SVG 需要動態控制路徑（動畫、資料驅動），保留為 Inline JSX

### 來源二：`<img src="*.svg">`

```html
<!-- 原始 HTML -->
<img src="assets/images/logo.svg" alt="Logo" />
```

**遷移方式**：

- 需要控制顏色 → SVGR：`import Logo from '@/assets/logo.svg?react'`
- 不需互動 → 保持 `<img>`：`import logo from '@/assets/logo.svg'`

### 來源三：CSS `url(*.svg)`

```css
/* 原始 CSS */
.icon-check {
  background-image: url("../images/check.svg");
}
```

**遷移方式**：

- 搬移 SVG 至 `src/assets/`
- 更新路徑為 alias：`url('@/assets/icons/check.svg')`
- 或改用 SVGR 元件取代 CSS 背景

### SVG 屬性 camelCase 對照

Inline JSX 中 SVG 屬性需轉為 camelCase：

| HTML SVG 屬性       | JSX 屬性                           |
| ------------------- | ---------------------------------- |
| `viewBox`           | `viewBox`（不變）                  |
| `fill-rule`         | `fillRule`                         |
| `clip-path`         | `clipPath`                         |
| `stroke-width`      | `strokeWidth`                      |
| `stroke-linecap`    | `strokeLinecap`                    |
| `stroke-linejoin`   | `strokeLinejoin`                   |
| `stroke-dasharray`  | `strokeDasharray`                  |
| `stroke-dashoffset` | `strokeDashoffset`                 |
| `font-size`         | `fontSize`                         |
| `text-anchor`       | `textAnchor`                       |
| `dominant-baseline` | `dominantBaseline`                 |
| `xlink:href`        | `xlinkHref`（已棄用，改用 `href`） |
| `xmlns:xlink`       | 移除                               |

---

## SVGR 設定

### Vite 設定

boilerplate 已預裝 `vite-plugin-svgr`：

```ts
// vite.config.ts
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(), // 啟用 ?react 後綴 import
    tailwindcss(),
    TanStackRouterVite(),
  ],
});
```

### TypeScript 型別宣告

boilerplate 的 `vite-env.d.ts` 已包含型別宣告：

```ts
// src/vite-env.d.ts
/// <reference types="vite/client" />

declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}
```

### SVGR 進階設定（選用）

如需自訂 SVGR 行為（移除指定屬性、加入 title 等）：

```ts
// vite.config.ts
svgr({
  svgrOptions: {
    // 自動將 width/height 替換為 1em，方便用 font-size 控制
    icon: true,
    // 移除 SVG 預設填色，改用 currentColor
    replaceAttrValues: { "#000": "currentColor", "#000000": "currentColor" },
  },
});
```

---

## 無障礙指引

### 裝飾性 SVG（無語意）

```tsx
// 純裝飾圖示 → 對螢幕閱讀器隱藏
<SearchIcon aria-hidden="true" className="size-5" />
```

### 具語意的 SVG

```tsx
// 方式一：role="img" + aria-label
<svg role="img" aria-label="搜尋" viewBox="0 0 24 24">
  <path d="..." />
</svg>

// 方式二：搭配 <title>（SVGR 支援）
<svg role="img" aria-labelledby="logo-title">
  <title id="logo-title">公司 Logo</title>
  <path d="..." />
</svg>
```

### 互動式 SVG 按鈕

```tsx
// 包在 <button> 中，由 button 提供無障礙標籤
<button aria-label="關閉選單" onClick={onClose}>
  <CloseIcon aria-hidden="true" className="size-5" />
</button>
```

---

## 效能建議

### 1. SVGO 壓縮

建議在加入專案前先壓縮 SVG：

```bash
# 安裝 SVGO
npm install -g svgo

# 壓縮單一檔案
svgo input.svg -o output.svg

# 批次壓縮整個目錄
svgo -f src/assets/icons/ -o src/assets/icons/
```

### 2. 避免大量 SVGR 元件同時 import

```tsx
// ❌ 一次 import 所有 icon（增加 bundle 大小）
import Icon1 from "@/assets/icons/icon1.svg?react";
import Icon2 from "@/assets/icons/icon2.svg?react";
// ... 幾十個

// ✅ 依需求動態 import 或使用 barrel export
// src/assets/icons/index.ts
export { default as CloseIcon } from "./close.svg?react";
export { default as SearchIcon } from "./search.svg?react";

// 使用端僅 import 需要的
import { CloseIcon, SearchIcon } from "@/assets/icons";
```

### 3. 大型 SVG 使用 `<img>` 或 lazy load

```tsx
import { lazy, Suspense } from "react";

// 動態載入大型 SVG 元件
const HeroIllustration = lazy(
  () => import("@/assets/illustrations/hero.svg?react"),
);

function HeroSection() {
  return (
    <Suspense fallback={<div className="h-80 animate-pulse bg-gray-200" />}>
      <HeroIllustration className="h-80 w-auto" />
    </Suspense>
  );
}
```

### 4. SVG Sprite（大量相同尺寸 icon）

如專案有 20+ 個相同尺寸的 icon，考慮使用 SVG sprite：

```html
<!-- public/sprite.svg -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-close" viewBox="0 0 24 24">
    <path d="..." />
  </symbol>
  <symbol id="icon-search" viewBox="0 0 24 24">
    <path d="..." />
  </symbol>
</svg>
```

```tsx
/** 通用 Sprite Icon 元件 */
interface SpriteIconProps extends React.SVGProps<SVGSVGElement> {
  /** sprite symbol ID */
  name: string;
}

function SpriteIcon({ name, ...props }: SpriteIconProps) {
  return (
    <svg aria-hidden="true" {...props}>
      <use href={`/sprite.svg#icon-${name}`} />
    </svg>
  );
}

// 使用
<SpriteIcon name="close" className="size-5 text-gray-600" />;
```
