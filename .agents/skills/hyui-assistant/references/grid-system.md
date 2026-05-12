# Flex 排版系統與 Media Query

## 目錄

- [均分 Flex](#均分-flex)
- [自由分配 Flex](#自由分配-flex)
- [混合運用](#混合運用)
- [Media Query 斷點](#media-query-斷點)
- [Mixin 速查](#mixin-速查)

---

## 均分 Flex

以 `flexTpl_{n}` class 均分欄位，預設 2-12 欄。每欄用 `col` class。

```html
<!-- 均分 2 欄 -->
<div class="flexTpl_2">
  <div class="col"></div>
  <div class="col"></div>
</div>

<!-- 均分 3 欄 -->
<div class="flexTpl_3">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>

<!-- 均分 4 欄 -->
<div class="flexTpl_4">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>
```

SCSS 計算方式：`width: itemWidth(間距, 欄數);`

---

## 自由分配 Flex

每欄欄寬不同，加總等於 12。格式 `flexTpl_{a}_{b}_{c}`。

```html
<!-- 8+4 -->
<div class="flexTpl_8_4">
  <div class="col"></div>
  <div class="col"></div>
</div>

<!-- 4+8 -->
<div class="flexTpl_4_8">
  <div class="col"></div>
  <div class="col"></div>
</div>

<!-- 9+3 -->
<div class="flexTpl_9_3">
  <div class="col"></div>
  <div class="col"></div>
</div>

<!-- 3+9 -->
<div class="flexTpl_3_9">
  <div class="col"></div>
  <div class="col"></div>
</div>

<!-- 3+6+3 -->
<div class="flexTpl_3_6_3">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>

<!-- 6+3+3 -->
<div class="flexTpl_6_3_3">
  <div class="col"></div>
  <div class="col"></div>
  <div class="col"></div>
</div>
```

其他預設分割：`5_7`, `7_5`, `3_3_6`, `2_2_8`, `2_8_2`, `8_2_2`

SCSS 計算方式：`width: flexWidth(間距, 佔幾份);`（12等份中佔 n 份）

---

## 混合運用

均分與自由分配可巢狀組合：

```html
<div class="flexTpl_2">
  <div class="col">
    <div class="flexTpl_4_8">
      <div class="col"><!-- 圖片 --></div>
      <div class="col"><!-- 文字 --></div>
    </div>
  </div>
  <div class="col">
    <div class="flexTpl_4_8">
      <div class="col"><!-- 圖片 --></div>
      <div class="col"><!-- 文字 --></div>
    </div>
  </div>
</div>
```

---

## Media Query 斷點

在 `_variable.scss` 中定義，預設斷點：

| 名稱 | 尺寸 | 說明 |
|---|---|---|
| `notebook` | max-width: 1399px | 電腦 |
| `tablet` | max-width: 991px | 平板 |
| `mobile` | max-width: 767px | 手機 |
| `xsMobile` | max-width: 575px | 極小尺寸 |

```scss
$screenSize: (
  notebook: 1399px,
  tablet: 991px,
  mobile: 767px,
  xsMobile: 575px,
);
```

### max-width（預設，由寬到窄排列）

```scss
.element {
  width: 100%;
  @include screen('notebook') { width: 85%; }
  @include screen('tablet')   { width: 55%; }
  @include screen('mobile')   { width: 100%; }
  @include screen('xsMobile') { width: 100%; }
}
```

### min-width

```scss
.element {
  @include screen('notebookMin') { /* min-width: 1400px */ }
  @include screen('tabletMin')   { /* min-width: 992px */ }
  @include screen('mobileMin')   { /* min-width: 768px */ }
  @include screen('xsMobileMin') { /* min-width: 576px */ }
}
```

### 自訂斷點

```scss
@include screenMax('1200') { /* max-width: 1200px */ }
@include screenMin('1200') { /* min-width: 1200px */ }
```

---

## Mixin 速查

### px 轉 rem

```scss
font-size: Rem(20); // 20px = 1.25rem
```

### transition

```scss
@include transition();              // all 0.3s ease
@include transition(0.3, all, ease); // 自定義
```

### 清除 li 格式

```scss
@include liReset; // margin:0; padding:0; list-style:none;
```

### 文字刪節號

```scss
@include lineClamp(4); // 超過 4 行出現刪節號
```

### 漸層

```scss
@include gradient(#07c, #06f, vertical);   // 垂直
@include gradient(#07c, #06f, horizontal); // 水平
@include gradient(#07c, #06f, diagonal);   // 對角線
@include gradient(#07c, #06f, circle);     // 圓形
```

### 區塊寬度計算

```scss
// 12 等份中佔 4 份
width: flexWidth($flexTemplateGap, 4);

// 100% 中由 4 個區塊均分
width: itemWidth($flexTemplateGap, 4);
```
