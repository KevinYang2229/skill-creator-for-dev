# 瀏覽器相容性

## 目錄

- [支援矩陣](#支援矩陣)
- [漸進增強](#漸進增強)
- [功能偵測](#功能偵測)
- [CSS 相容性](#css-相容性)
- [JS 相容性](#js-相容性)

---

## 支援矩陣

### 目標瀏覽器

| 瀏覽器         | 最低版本          |
| -------------- | ----------------- |
| Chrome         | 最近 2 個主要版本 |
| Firefox        | 最近 2 個主要版本 |
| Safari         | 最近 2 個主要版本 |
| Edge           | 最近 2 個主要版本 |
| iOS Safari     | 最近 2 個主要版本 |
| Android Chrome | 最近 2 個主要版本 |

> ❗ 不支援 IE 11。若需支援，需額外規劃 Polyfill 與降級策略。

---

## 漸進增強

### 策略

**漸進增強 (Progressive Enhancement)** 為優先採用策略：

1. **基礎層**：語意化 HTML，確保內容可閱讀
2. **展示層**：CSS 增強視覺效果
3. **互動層**：JS 增強互動體驗

```html
<!-- 基礎層：無 CSS/JS 也能使用 -->
<nav>
  <ul>
    <li><a href="/">首頁</a></li>
    <li><a href="/about">關於</a></li>
  </ul>
</nav>
```

```scss
// 展示層：有 CSS 時增強佈局
.nav ul {
  display: flex;
  list-style: none;
}
```

```javascript
// 互動層：有 JS 時增加漢堡選單
if ("querySelector" in document) {
  initMobileNav();
}
```

---

## 功能偵測

### CSS @supports

```scss
// 使用 @supports 偵測 CSS 功能
.grid-layout {
  // 降級方案
  display: flex;
  flex-wrap: wrap;

  @supports (display: grid) {
    // 增強方案
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

// 偵測 Container Query
@supports (container-type: inline-size) {
  .card-wrapper {
    container-type: inline-size;
  }
}

// 偵測 backdrop-filter
.modal-backdrop {
  background: rgba(0, 0, 0, 0.7);

  @supports (backdrop-filter: blur(10px)) {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }
}
```

### JavaScript 功能偵測

```javascript
/**
 * 偵測瀏覽器功能並啟用對應特性
 */
function initFeatureDetection() {
  // IntersectionObserver
  if ("IntersectionObserver" in window) {
    initLazyLoading();
    initScrollAnimation();
  }

  // Web Share API
  if (navigator.share) {
    initNativeShare();
  } else {
    initFallbackShare();
  }
}
```

---

## CSS 相容性

### 須注意的功能

| 功能            | 支援度 | 建議                                |
| --------------- | ------ | ----------------------------------- |
| CSS Grid        | 廣泛   | 放心使用，搭配 Flexbox 降級         |
| Container Query | 較新   | 搭配 `@supports` 使用               |
| `:has()`        | 較新   | 搭配 `@supports` 或避免關鍵功能依賴 |
| `clamp()`       | 良好   | 可安全使用                          |
| `gap` (Flexbox) | 良好   | 可安全使用                          |
| `aspect-ratio`  | 良好   | 可安全使用                          |
| Nesting         | 較新   | 使用 SASS 巢狀替代                  |

### Vendor Prefix

使用 Autoprefixer 自動加入前綴，不手動添加。

---

## JS 相容性

### 可安全使用的 ES6+ 語法

- `const` / `let`
- Arrow Function
- Template Literal
- 解構賦值
- `Promise` / `async` / `await`
- `Array.from()`, `.find()`, `.includes()`
- Optional Chaining `?.`
- Nullish Coalescing `??`
- ES Module (`import` / `export`)

### 需注意的 API

| API                    | 降級方案                       |
| ---------------------- | ------------------------------ |
| `IntersectionObserver` | scroll 事件 + throttle         |
| `ResizeObserver`       | window resize 事件             |
| `navigator.share`      | 自訂分享介面                   |
| `structuredClone`      | `JSON.parse(JSON.stringify())` |
