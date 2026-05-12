# 內容類元件

## 目錄

- [Accordion 收合式選單](#accordion-收合式選單)
- [Tabs 頁籤](#tabs-頁籤)
- [Slider 圖片輪播](#slider-圖片輪播)
- [Table 表格](#table-表格)
- [Download 下載列表](#download-下載列表)
- [Tag 標籤/分類目錄](#tag-標籤分類目錄)
- [Notice 提示訊息](#notice-提示訊息)

---

## Accordion 收合式選單

相關 SCSS: `scss/components/_accordion.scss`

```html
<div class="accordion" data-state-open="展開" data-state-close="收合">
  <div class="accordionList">
    <button class="accordionBtn">第一項說明</button>
    <div class="accordionContent">
      <div class="content">內容文字</div>
    </div>
  </div>
  <div class="accordionList">
    <button class="accordionBtn">第二項說明</button>
    <div class="accordionContent">
      <div class="content">內容文字</div>
    </div>
  </div>
</div>
```

### JS 初始化

```javascript
accordionFunction({
  target: '.accordion',
  openContent: false,  // 預設先展開所有內容
  openDefault: true,   // 是否有預設開啟
  openIndex: 0,        // 預設開啟第幾個
  autoClose: true,     // 自動關閉其他內容
  openSwitch: true,    // 是否可開合/切換
});
```

---

## Tabs 頁籤

相關 SCSS: `scss/components/_tabs.scss`

```html
<div class="tabs">
  <ul class="tabsList" role="tablist">
    <li role="presentation">
      <button role="tab" aria-selected="true">頁籤一</button>
    </li>
    <li role="presentation">
      <button role="tab" aria-selected="false">頁籤二</button>
    </li>
  </ul>
  <div class="tabsContent">
    <div class="tabsPanel" role="tabpanel">頁籤一內容</div>
    <div class="tabsPanel" role="tabpanel">頁籤二內容</div>
  </div>
</div>
```

### JS 初始化

```javascript
tabFunction({
  target: '.tabs',
  openDefault: 0,  // 預設開啟第幾個
});
```

---

## Slider 圖片輪播

相關 SCSS: `scss/components/_slider.scss`
需引入 Swiper: `vendor/swiper/swiper-bundle.min.js`

### 大圖輪播

```html
<div class="mpSlider flexTpl_12 full">
  <button type="button" class="autoPlaySwitch" data-info-play="暫停中，點我播放" data-info-stop="播放中，點我暫停"></button>
  <div class="swiperBox">
    <button class="swiperPrev swiperArrow">上一張</button>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a href="#">
            <div class="pic"><img src="images/demo/banner.png" alt="第1張圖說" /></div>
          </a>
        </div>
        <div class="swiper-slide">
          <a href="#">
            <div class="pic"><img src="images/demo/banner2.png" alt="第2張圖說" /></div>
          </a>
        </div>
      </div>
    </div>
    <button class="swiperNext swiperArrow">下一張</button>
  </div>
  <div class="swiperPagination"></div>
</div>
```

### JS 初始化

```javascript
const mpSlider = new Swiper('.mpSlider .swiper', {
  pagination: {
    el: '.mpSlider .swiperPagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.mpSlider .swiperNext',
    prevEl: '.mpSlider .swiperPrev',
    disabledClass: 'swiperArrow-disabled',
  },
  autoplay: { delay: 5000 },
  on: {
    init: function (swiper) { swiperA11Fn(swiper); },
  },
});
```

### 廣告輪播（多張小圖）

```html
<div class="linkSlider">
  <div class="swiperBox">
    <button type="button" class="swiperPrev swiperArrow">上一筆</button>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a class="item" href="#"><div class="pic"><img src="images/ad.jpg" alt="圖說" /></div></a>
        </div>
      </div>
    </div>
    <button type="button" class="swiperNext swiperArrow">下一筆</button>
  </div>
  <button type="button" class="autoPlaySwitch" data-info-play="暫停中，點我播放" data-info-stop="播放中，點我暫停"></button>
</div>
```

```javascript
const linkSlider = new Swiper('.linkSlider .swiper', {
  slidesPerView: 1, spaceBetween: 20,
  navigation: {
    nextEl: '.linkSlider .swiperNext',
    prevEl: '.linkSlider .swiperPrev',
    disabledClass: 'swiperArrow-disabled',
  },
  breakpoints: {
    100:  { slidesPerView: 2 },
    767:  { slidesPerView: 3 },
    1000: { slidesPerView: 4 },
  },
  autoplay: { delay: 5000 },
  on: { init: function (swiper) { swiperA11Fn(swiper); } },
});
```

---

## Table 表格

相關 SCSS: `scss/components/_table.scss`

### 基本表格

```html
<table>
  <caption>表格標題</caption>
  <thead>
    <tr>
      <th>編號</th><th>姓名</th><th>備註</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>王大明</td><td>備註</td></tr>
    <tr><td>2</td><td>李小強</td><td>備註</td></tr>
  </tbody>
</table>
```

### 響應式表格（條列式重排）

用 `<div class="tableList">` 包覆 `<table>`，手機版自動轉為條列式。

```html
<div class="tableList">
  <table>
    <thead><tr><th>...</th></tr></thead>
    <tbody><tr><td>...</td></tr></tbody>
  </table>
</div>
```

### 響應式表格（捲軸式）

```html
<div class="tableScroll">
  <button class="scrollTablePrevBtn" type="button">往左捲動</button>
  <button class="scrollTableNextBtn" type="button">往右捲動</button>
  <table>...</table>
</div>
```

---

## Download 下載列表

相關 SCSS: `scss/components/_download.scss`

```html
<ul class="download">
  <li>
    <a href="file.pdf" title="檔案名稱(開新視窗)" target="_blank">
      <span class="downloadTitle">檔案名稱</span>
      <span class="downloadInfo">PDF / 1.2MB</span>
    </a>
  </li>
</ul>
```

---

## Tag 標籤/分類目錄

相關 SCSS: `scss/components/_tag.scss`

```html
<div class="tagList">
  <a href="#" class="tag">標籤一</a>
  <a href="#" class="tag active">標籤二（選中）</a>
  <a href="#" class="tag">標籤三</a>
</div>
```

---

## Notice 提示訊息

相關 SCSS: `scss/components/_notice.scss` (如有)

```html
<div class="notice">提示訊息內容</div>
<div class="notice noticeInfo">資訊提示</div>
<div class="notice noticeSuccess">成功提示</div>
<div class="notice noticeWarning">警告提示</div>
<div class="notice noticeError">錯誤提示</div>
```
