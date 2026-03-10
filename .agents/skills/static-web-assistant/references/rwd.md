# 響應式設計 (RWD) 規範

## 目錄

- [設計策略](#設計策略)
- [標準斷點](#標準斷點)
- [流體排版](#流體排版)
- [響應式圖片](#響應式圖片)
- [佈局模式](#佈局模式)

---

## 設計策略

### Mobile-First

所有樣式從行動裝置開始撰寫，透過 `min-width` 往上擴展：

```scss
// ✅ Mobile-First
.container {
  padding: 1rem; // 行動裝置預設

  @include mix.respond-to(md) {
    padding: 2rem; // 平板以上
  }

  @include mix.respond-to(lg) {
    padding: 3rem; // 桌面以上
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### 原則

- 先完成行動版設計，再擴展至桌面版
- 不假設使用者裝置尺寸
- 使用相對單位 (`rem`, `em`, `%`, `vw/vh`)
- 避免固定寬度（`width: 500px` ❌），使用 `max-width`

---

## 標準斷點

| 名稱  | 尺寸     | 適用裝置         |
| ----- | -------- | ---------------- |
| `sm`  | ≥ 576px  | 大型手機（橫向） |
| `md`  | ≥ 768px  | 平板             |
| `lg`  | ≥ 992px  | 筆記型電腦       |
| `xl`  | ≥ 1200px | 桌面螢幕         |
| `2xl` | ≥ 1400px | 大型桌面螢幕     |

---

## 流體排版

### clamp() 函式

```scss
// 標題：最小 1.5rem，最大 3rem，依視窗線性縮放
.hero__title {
  font-size: clamp(1.5rem, 4vw + 0.5rem, 3rem);
}

// 段落：最小 0.875rem，最大 1.125rem
.content__text {
  font-size: clamp(0.875rem, 1.5vw + 0.25rem, 1.125rem);
}
```

### 規則

- 使用 `clamp()` 實現流體排版
- 設定合理的最小與最大值
- `line-height` 使用無單位值：`line-height: 1.6`

---

## 響應式圖片

### 基本響應式

```scss
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

### srcset 與 sizes

```html
<img
  src="image-800.webp"
  srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w"
  sizes="
    (max-width: 576px) 100vw,
    (max-width: 992px) 50vw,
    33vw
  "
  alt="描述文字"
  loading="lazy"
  width="800"
  height="600"
/>
```

### `<picture>` 元素

```html
<picture>
  <source media="(min-width: 992px)" srcset="hero-desktop.webp" />
  <source media="(min-width: 576px)" srcset="hero-tablet.webp" />
  <img src="hero-mobile.webp" alt="主視覺" width="800" height="600" />
</picture>
```

---

## 佈局模式

### CSS Grid（二維佈局）

```scss
// 自動填充卡片網格
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: vars.$spacing-lg;
}
```

### Flexbox（一維佈局）

```scss
// 導航列
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: vars.$spacing-md;
  align-items: center;
}
```

### Container Query

```scss
// 元件級響應式（不依賴視窗寬度）
.card-wrapper {
  container-type: inline-size;
}

.card {
  padding: 1rem;

  @container (min-width: 400px) {
    display: flex;
    gap: 1rem;
  }
}
```
