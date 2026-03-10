# HTML 編碼規範

## 目錄

- [文件結構](#文件結構)
- [語意化標籤](#語意化標籤)
- [屬性規範](#屬性規範)
- [Meta 標籤](#meta-標籤)
- [模組化模式](#模組化模式)

---

## 文件結構

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="頁面描述" />
    <title>頁面標題</title>
    <link rel="stylesheet" href="css/main.css" />
  </head>
  <body>
    <header><!-- 頁首 --></header>
    <main><!-- 主要內容 --></main>
    <footer><!-- 頁尾 --></footer>
    <script src="js/main.js" defer></script>
  </body>
</html>
```

### 必要規則

- 宣告 `<!DOCTYPE html>` 且使用 HTML5
- `<html>` 標籤設定 `lang` 屬性
- `<meta charset="UTF-8">` 必須為 `<head>` 的第一個子元素
- `<meta name="viewport">` 確保行動裝置適配
- CSS 放 `<head>`，JS 放 `</body>` 前並加 `defer`

---

## 語意化標籤

### 頁面骨架

| 標籤        | 用途                   | 使用規則                   |
| ----------- | ---------------------- | -------------------------- |
| `<header>`  | 網站 / 區塊頭部        | 每頁最多一個全域 header    |
| `<nav>`     | 主要導航區塊           | 主導航加 `aria-label`      |
| `<main>`    | 頁面主要內容           | 每頁僅一個                 |
| `<article>` | 獨立、可重用的內容區塊 | 部落格文章、產品卡片       |
| `<section>` | 具主題的內容群組       | 必須有標題 (`<h2>`~`<h6>`) |
| `<aside>`   | 側邊欄 / 補充內容      | 不影響主要內容理解         |
| `<footer>`  | 網站 / 區塊尾部        | 版權、聯繫資訊             |

### 標題層級

```html
<!-- ✅ 正確：標題層級依序使用 -->
<h1>網站標題</h1>
<h2>章節標題</h2>
<h3>子章節標題</h3>

<!-- ❌ 錯誤：跳過層級 -->
<h1>網站標題</h1>
<h3>子章節標題</h3>
```

- 每頁僅一個 `<h1>`
- 標題層級不可跳級（`<h1>` → `<h3>` ❌）
- 不可為了樣式而改用錯誤層級

---

## 屬性規範

### 排序慣例

按此順序排列屬性：

```
id → class → name → data-* → src/href → type → value → alt/title → aria-* → role
```

### 規則

- 屬性值使用**雙引號** `""`
- Boolean 屬性省略值：`<input disabled>` 非 `<input disabled="disabled">`
- `id` 全頁唯一，使用 kebab-case：`id="main-nav"`
- `class` 使用 BEM 命名：`class="card__title--active"`
- 自訂資料屬性使用 `data-*`：`data-user-id="123"`

```html
<!-- ✅ 正確 -->
<a
  id="cta-button"
  class="btn btn--primary"
  href="/signup"
  title="免費註冊"
  aria-label="免費註冊帳號"
>
  立即註冊
</a>
```

---

## Meta 標籤

### 必備 Meta

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="不超過 160 字元的頁面描述" />
```

### 建議 Meta

```html
<!-- Open Graph -->
<meta property="og:title" content="頁面標題" />
<meta property="og:description" content="頁面描述" />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />

<!-- 其他 -->
<meta name="theme-color" content="#ffffff" />
<link rel="icon" href="/favicon.ico" />
<link rel="canonical" href="https://example.com/page" />
```

---

## 模組化模式

### HTML Partial 概念

使用註解標示可抽取的區塊，方便維護與重用：

```html
<!-- ========== Header 開始 ========== -->
<header class="header">
  <nav class="header__nav" aria-label="主導航">
    <ul class="header__nav-list">
      <li class="header__nav-item"><a href="/">首頁</a></li>
      <li class="header__nav-item"><a href="/about">關於</a></li>
    </ul>
  </nav>
</header>
<!-- ========== Header 結束 ========== -->
```

### 規則

- 使用區塊註解標示主要區域
- 每個區塊應可獨立理解其結構
- 避免超過 3 層的 `<div>` 巢狀
