# HyUI5 版面系統

## Container & Section

- `<section>` 包整組區段，背景色可在 `<section class="xxx">` 控制
- `<div class="container">` 限寬 + 水平置中，**預設最大寬度 1400px**（變數 `$domWidth`）
- `.container .flexTpl_xxx` 為內層柵格

## flexFull

若某 section 要讓內容滿版（如首頁主視覺）：
```html
<section>
  <div class="container">
    <div class="flexTpl_12 flexFull">
      <div class="col">...</div>
    </div>
  </div>
</section>
```
`:has(.flexFull) > .container` 會自動將 container 移除 max-width 與 padding。

## 柵格系統（12 等分）

gap 預設 24px（變數 `$flexTemplateGap`）。手機以下（≤767px）自動改為單欄垂直堆疊。

| class | 欄位比例 | 備註 |
|---|---|---|
| `flexTpl_12` | 整欄 | 單欄容器，非 flex |
| `flexTpl_6_6` | 6 + 6 | 兩等分 |
| `flexTpl_8_4` | 8 + 4 | 主內容 + 側邊 |
| `flexTpl_4_8` | 4 + 8 | 側邊 + 主內容 |
| `flexTpl_5_7` | 5 + 7 | 左圖右文常用 |
| `flexTpl_7_5` | 7 + 5 | 右圖左文 |
| `flexTpl_9_3` | 9 + 3 | 平板以下轉 8+4 |
| `flexTpl_3_9` | 3 + 9 | 平板以下轉 4+8 |
| `flexTpl_3_6_3` | 3 + 6 + 3 | 中欄為主內容 |
| `flexTpl_3_3_6` | 3 + 3 + 6 | |
| `flexTpl_6_3_3` | 6 + 3 + 3 | |
| `flexTpl_4_4_4` | 4 + 4 + 4 | 三等分 |
| `flexTpl_3_3_3_3` | 四等分 | |

### 使用

```html
<div class="flexTpl_5_7">
  <div class="col">左側</div>
  <div class="col">右側</div>
</div>
```

**`.col` 會在手機版自動變 100% 寬。** 不需額外處理 RWD。

## 斷點（`_variable.scss` $screenSize）

| 名稱 | 最大寬 | mixin |
|---|---|---|
| notebook | 1399px | `@include screen('notebook')` |
| tablet | 991px | `@include screen('tablet')` |
| mobile | 767px | `@include screen('mobile')` |
| xsMobile | 575px | `@include screen('xsMobile')` |

JS 判定手機版用 CSS 變數 `--RWDWidth: 991px`（預設 tablet 斷點）。

## 頁面最外層

```html
<div class="wrapper">   ← 包整站
  <a class="goCenter" href="#aC">按Enter到主內容區</a>
  <header>...</header>
  <main>
    <a class="accessKeyItem" href="#aC" id="aC" accesskey="C">:::</a>
    ...
  </main>
  <div class="fatFooter">...</div>
  <footer>...</footer>
</div>
<div class="floatNav">...</div>   ← 漂浮社群按鈕（站外）
<button id="scrollTop">TOP</button>
```

## 重要 CSS 變數（:root）

```css
--RWDWidth: 991px;       /* JS 切手機版斷點 */
--sideFixTop: 80px;      /* sideNav 置頂偏移 */
--borderRadius8: 8px;
--borderRadius4: 4px;
```
