# HyUI5 無障礙規範

HyUI5 預設以**政府網站無障礙 AA 級**為目標。以下是建置頁面時必須遵守的項目。

## AccessKey（快速跳躍鍵）

每個頁面都必須提供三個 accessKey 跳轉點，且都要放 `<a class="accessKeyItem">...</a>`：

| accessKey | id | 位置 | aria-label |
|---|---|---|---|
| `U` | `aU` | `<header>` 開頭 | `功能區塊` |
| `C` | `aC` | `<main>` 開頭 | `主要內容區` |
| `Z` | `aZ` | `<footer>` 開頭 | `頁尾區` |
| `S` | — | 搜尋框 `<input>` | `搜尋網站內容`（放 input 的 accesskey，非 accessKeyItem） |

另外要提供「跳到主內容」連結：
```html
<div class="wrapper">
  <a class="goCenter" href="#aC">按Enter到主內容區</a>
  ...
</div>
```

## 必要 aria

| 元素 | 屬性 |
|---|---|
| `<header>` 內主選單 | `role="navigation" aria-label="主選單"` |
| `<header>` 內頁首功能列 | `role="navigation" aria-label="頁首功能列"` |
| `<aside class="sideNav"> > nav` | `aria-label="側選單" role="navigation"` |
| breadcrumb `<nav>` | `role="navigation" aria-label="麵包屑"` |
| fatFooter `<nav>` | `aria-label="頁尾網站導覽"` |
| 搜尋框外 `<div class="webSearch">` | `role="search"` |
| 麵包屑最後一項 | `aria-current="page"` |
| 表單驗證訊息容器 | `role="alert"` |
| 開關式按鈕（fatFooterBtn 等） | `aria-expanded="true/false"` |
| 關閉/開啟類按鈕（無內容） | `aria-label="關閉/開啟..."` |
| 漂浮按鈕 floatSwitchBtn | `aria-label="開關悬浮按鈕"` |
| 回到頂部 | `aria-label="回到頂部"` |

## 必填欄位

```html
<label class="formListTitle" for="xxx">
  <em aria-label="必填">*</em>
  欄位名稱
</label>
```

## 螢幕閱讀器限定

當按鈕/icon 是視覺按鈕但需要語意時，文字用 `<span class="srOnly">` 隱藏：
```html
<label for="topSearchInput" class="srOnly">搜尋</label>
```

## noscript

每個頁面 `<header>` 結尾必附 `<noscript>` 告知無 JS 時的替代操作：
```html
<noscript>
  您的瀏覽器不支援 JavaScript... <a href="#">網站導覽</a>
</noscript>
```
tabs 頁需額外說明鍵盤操作。

## swiper 自動播放

自動播放的輪播必須提供**暫停按鈕**：
```html
<button class="autoPlaySwitch"
  data-info-play="暫停中，點我播放"
  data-info-stop="播放中，點我暫停"
  aria-label="播放中，點我暫停"></button>
```

## tabs / accordion

狀態屬性用 data-* 供螢幕閱讀器朗讀：
```html
<div class="accordion" data-state-open="展開" data-state-close="收合">
```

role="tab" / role="tabpanel" / aria-labelledby / aria-controls 由 `main.js` 自動補上，**切版時不需手動寫**。

## 圖片 alt

- 裝飾性圖片：`alt=""` 或 `alt` 留空
- 具語意的圖片：`alt="具體描述"`，不要寫「圖片」「icon」
- 無障礙標章圖片：`alt="通過AA檢測等級無障礙網頁檢測"`

## 圖表（表格）

```html
<table>
  <caption>
    表格無障礙標題（預設隱藏）
    <span class="summary">複雜表格摘要</span>   ← 可選
  </caption>
  <thead>
    <tr><th scope="col">編號</th>...</tr>
  </thead>
</table>
```

## 鍵盤可操作

所有可觸發的元素必為 `<a>`、`<button>`、`<input>`。**切勿**用 `<div onclick>` 當按鈕。

## 文字大小切換

頁面可同時有兩個：
- `header` 內 `.fontSize` — 全站字級切換
- 頁內 `.functionPanel > .fontSizeInner` — 單頁字級切換

兩者共用同一套 JS，class `.smallSize` / `.mediumSize` / `.largeSize`。

## 檢核

交件前跑：
1. 鍵盤 Tab 走過每一個互動元素，順序正常、有 focus 框
2. 關掉 JS（瀏覽器 DevTools），頁面仍能讀到核心內容
3. 螢幕閱讀器 VoiceOver / NVDA 可完整唸出結構、頁首功能列、主內容
4. 文字大小調到大，版面不破
5. 縮放 200%，無水平捲軸
