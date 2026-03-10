# 效能最佳化守則

## 目錄

- [資源載入策略](#資源載入策略)
- [圖片最佳化](#圖片最佳化)
- [CSS 最佳化](#css-最佳化)
- [JavaScript 最佳化](#javascript-最佳化)
- [Core Web Vitals](#core-web-vitals)

---

## 資源載入策略

### Script 載入

```html
<!-- ✅ defer：HTML 解析完畢後依序執行 -->
<script src="js/main.js" defer></script>

<!-- ✅ async：下載完立即執行（適用於獨立腳本如 analytics） -->
<script src="js/analytics.js" async></script>

<!-- ✅ type="module"：自帶 defer 行為 -->
<script type="module" src="js/app.js"></script>
```

### 預載入關鍵資源

```html
<!-- 預載入關鍵字型 -->
<link
  rel="preload"
  href="fonts/main.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- 預載入首屏關鍵圖片 -->
<link rel="preload" href="images/hero.webp" as="image" />

<!-- 預連接第三方網域 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

### 規則

| 策略         | 用途                       |
| ------------ | -------------------------- |
| `defer`      | 主要 JS 檔案               |
| `async`      | 獨立的第三方腳本           |
| `preload`    | 首屏關鍵資源（字型、主圖） |
| `preconnect` | 第三方 API / CDN           |

---

## 圖片最佳化

### 格式選擇

| 格式 | 適用場景                   |
| ---- | -------------------------- |
| WebP | 照片、複雜圖片（優先選擇） |
| AVIF | 高壓縮比場景（漸進支援）   |
| SVG  | 圖示、Logo、向量圖         |
| PNG  | 需透明背景且不適合 SVG     |

### Lazy Loading

```html
<!-- 首屏圖片：不使用 lazy loading，加 fetchpriority -->
<img
  src="hero.webp"
  alt="主視覺"
  width="1200"
  height="600"
  fetchpriority="high"
/>

<!-- 非首屏圖片：使用 lazy loading -->
<img src="product.webp" alt="產品圖" width="400" height="300" loading="lazy" />
```

### 響應式圖片

```html
<img
  src="photo-800.webp"
  srcset="photo-400.webp 400w, photo-800.webp 800w, photo-1200.webp 1200w"
  sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
  alt="描述"
  width="800"
  height="600"
  loading="lazy"
/>
```

### 規則

- 始終指定 `width` 和 `height`（防止 CLS）
- 首屏圖片加 `fetchpriority="high"`
- 非首屏圖片加 `loading="lazy"`
- 優先使用 WebP 格式

---

## CSS 最佳化

### Critical CSS

將首屏所需的最小 CSS 內嵌至 `<head>`：

```html
<head>
  <style>
    /* Critical CSS：首屏可見區域的最小樣式 */
    body {
      margin: 0;
      font-family: system-ui, sans-serif;
    }
    .header {
      /* ... */
    }
    .hero {
      /* ... */
    }
  </style>
  <!-- 非關鍵 CSS 延遲載入 -->
  <link
    rel="preload"
    href="css/main.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript><link rel="stylesheet" href="css/main.css" /></noscript>
</head>
```

### 規則

- 避免使用 `@import`（阻塞渲染）
- 移除未使用的 CSS
- 使用 CSS 壓縮（生產環境）

---

## JavaScript 最佳化

- 延遲非關鍵 JS（`defer` / `async`）
- 使用 ES Module 的 Tree Shaking 特性
- 避免長時間阻塞主線程的同步操作
- 使用 `requestAnimationFrame` 處理動畫
- 使用 `IntersectionObserver` 取代 scroll 事件

```javascript
/**
 * 使用 IntersectionObserver 實現元素進場動畫
 * @param {string} selector - 目標元素選擇器
 */
function initScrollAnimation(selector) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
}
```

---

## Core Web Vitals

| 指標                            | 目標    | 代表含義         |
| ------------------------------- | ------- | ---------------- |
| LCP (Largest Contentful Paint)  | ≤ 2.5s  | 最大內容繪製速度 |
| INP (Interaction to Next Paint) | ≤ 200ms | 互動回應速度     |
| CLS (Cumulative Layout Shift)   | ≤ 0.1   | 視覺穩定性       |

### 最佳化方向

| 指標 | 關鍵策略                                      |
| ---- | --------------------------------------------- |
| LCP  | 預載入首屏圖片、內嵌 Critical CSS、壓縮資源   |
| INP  | 避免長任務、使用 Web Worker、減少 JS bundle   |
| CLS  | 指定圖片/影片尺寸、預留廣告空間、避免動態插入 |
