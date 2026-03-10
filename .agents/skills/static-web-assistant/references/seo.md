# SEO 最佳實踐

## 目錄

- [Meta 標籤](#meta-標籤)
- [Open Graph 與 Twitter Card](#open-graph-與-twitter-card)
- [結構化資料](#結構化資料)
- [標題與內容結構](#標題與內容結構)
- [技術 SEO](#技術-seo)

---

## Meta 標籤

### 必備

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>主標題 — 品牌名稱</title>
  <meta name="description" content="50~160 字元的頁面描述，包含目標關鍵字" />
  <link rel="canonical" href="https://example.com/current-page" />
</head>
```

### 規則

| 標籤               | 要求                                          |
| ------------------ | --------------------------------------------- |
| `<title>`          | 每頁唯一，50~60 字元，格式：`頁面標題 — 品牌` |
| `meta description` | 每頁唯一，50~160 字元，含行動呼籲             |
| `canonical`        | 避免重複內容，指向標準 URL                    |

---

## Open Graph 與 Twitter Card

```html
<!-- Open Graph（Facebook / LINE / 通訊軟體） -->
<meta property="og:type" content="website" />
<meta property="og:title" content="頁面標題" />
<meta property="og:description" content="頁面描述" />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:site_name" content="品牌名稱" />
<meta property="og:locale" content="zh_TW" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="頁面標題" />
<meta name="twitter:description" content="頁面描述" />
<meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
```

### OG Image 規格

- 尺寸：1200 × 630px
- 格式：JPG 或 PNG
- 檔案大小：< 1MB

---

## 結構化資料

### JSON-LD 格式

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "品牌名稱",
    "url": "https://example.com",
    "description": "網站描述"
  }
</script>
```

### 常見 Schema 類型

| 類型             | 用途       |
| ---------------- | ---------- |
| `WebSite`        | 網站整體   |
| `Organization`   | 組織/公司  |
| `BreadcrumbList` | 麵包屑導航 |
| `Article`        | 文章頁面   |
| `FAQPage`        | FAQ 頁面   |

---

## 標題與內容結構

- 每頁一個 `<h1>`，與 `<title>` 高度相關
- 標題層級依序使用（不跳級）
- 使用語意化標籤（`<article>`, `<section>`, `<nav>`）
- 連結文字要有意義（❌ 「點此」 → ✅ 「查看產品規格」）
- 圖片替代文字 `alt` 包含描述性關鍵字

---

## 技術 SEO

### Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml
```

### 效能相關 SEO

- 確保 Core Web Vitals 達標（見 `performance.md`）
- 使用 HTTPS
- 確保行動裝置友善（RWD）
