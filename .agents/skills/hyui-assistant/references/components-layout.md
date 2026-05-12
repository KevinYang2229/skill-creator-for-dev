# 版面類元件

## 目錄

- [Buttons 按鈕](#buttons-按鈕)
- [Popup 彈出視窗/燈箱](#popup-彈出視窗燈箱)
- [Icon 圖示](#icon-圖示)
- [FatFooter 頁尾選單](#fatfooter-頁尾選單)
- [FunctionPanel 內頁功能列](#functionpanel-內頁功能列)
- [Marquee 跑馬燈](#marquee-跑馬燈)

---

## Buttons 按鈕

相關 SCSS: `scss/components/_button.scss`

### 主要按鈕

```html
<a href="#" class="btnPrimary">主要按鈕</a>
<a href="#" class="btnPrimary outline">主要按鈕（線框）</a>
<a href="#" class="btnPrimary light">主要按鈕（淺色）</a>
```

### 次要按鈕

```html
<a href="#" class="btnSecondary">次要按鈕</a>
<a href="#" class="btnSecondary outline">次要按鈕（線框）</a>
<a href="#" class="btnSecondary light">次要按鈕（淺色）</a>
```

### 一般按鈕

```html
<a href="#" class="btnNormal">一般按鈕</a>
<a href="#" class="btnNormal outline">一般按鈕（線框）</a>
<a href="#" class="btnNormal light">一般按鈕（淺色）</a>
```

### 禁用

```html
<a href="#" class="btnDisabled">禁用按鈕</a>
<a href="#" class="btnDisabled outline">禁用按鈕（線框）</a>
```

### 尺寸

```html
<a href="#" class="btnPrimary small">小按鈕</a>
<a href="#" class="btnPrimary">一般按鈕</a>
<a href="#" class="btnPrimary large">大按鈕</a>
```

### 按鈕群組

```html
<div class="btnGroup">
  <a href="#" class="btnPrimary">確認</a>
  <a href="#" class="btnNormal">取消</a>
</div>
```

---

## Popup 彈出視窗/燈箱

相關 SCSS: `scss/components/_popup.scss`

### 基本彈出視窗

```html
<button type="button" class="btnPrimary" id="openPopup1">開啟彈窗</button>

<div class="popup" id="popup1" role="dialog" aria-modal="true" aria-labelledby="popupTitle1">
  <div class="popupContent">
    <div class="popupHeader">
      <h3 id="popupTitle1">彈窗標題</h3>
      <button type="button" class="popupClose" aria-label="關閉">×</button>
    </div>
    <div class="popupBody">
      <p>彈窗內容</p>
    </div>
    <div class="popupFooter">
      <button type="button" class="btnPrimary">確認</button>
      <button type="button" class="btnNormal popupClose">取消</button>
    </div>
  </div>
</div>
```

### JS 初始化

```javascript
popupFunction({
  openBtn: '#openPopup1',
  target: '#popup1',
});
```

### FancyBox 燈箱（圖片）

需引入 FancyBox JS。

```html
<a href="images/photo.jpg" data-fancybox="gallery" data-caption="圖片說明">
  <img src="images/photo_thumb.jpg" alt="圖片說明" />
</a>
```

---

## Icon 圖示

相關 SCSS: `scss/components/_icon.scss`

HyUI5 使用 CSS icon，以 `<i>` 標籤搭配 class 名稱。

```html
<i class="i_home"></i>
<i class="i_search"></i>
<i class="i_mail"></i>
<i class="i_phone"></i>
<i class="i_download"></i>
<i class="i_arrow_r"></i>
<i class="i_arrow_l"></i>
<i class="i_arrow_t"></i>
<i class="i_arrow_b"></i>
<i class="i_lock_dk"></i>
<i class="i_calendar"></i>
<i class="i_plus"></i>
<i class="i_minus"></i>
<i class="i_close"></i>
<i class="i_check"></i>
```

深色版本加上 `_dk` 後綴，淺色版本加上 `_lt` 後綴。

---

## FatFooter 頁尾選單

相關 SCSS: `scss/components/_fatFooter.scss`

在 footer 上方的大型選單區塊。

```html
<div class="fatFooter">
  <div class="container">
    <div class="flexTpl_4">
      <div class="col">
        <h4>分類一</h4>
        <ul>
          <li><a href="#">連結一</a></li>
          <li><a href="#">連結二</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>分類二</h4>
        <ul>
          <li><a href="#">連結一</a></li>
          <li><a href="#">連結二</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>分類三</h4>
        <ul>
          <li><a href="#">連結一</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>分類四</h4>
        <ul>
          <li><a href="#">連結一</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

---

## FunctionPanel 內頁功能列

相關 SCSS: `scss/components/_functionPanel.scss`

顯示在內頁上方的功能列（日期、瀏覽數、分享等）。

```html
<div class="functionPanel">
  <div class="functionPanelInfo">
    <span class="date">發布日期：2025-01-01</span>
    <span class="view">瀏覽人次：<span>1234</span></span>
  </div>
  <div class="functionPanelBtn">
    <button type="button" class="btnPrint" aria-label="列印">列印</button>
    <div class="share">
      <ul>
        <li><a href="#" class="shareFb" target="_blank" title="Facebook">FB</a></li>
        <li><a href="#" class="shareLine" target="_blank" title="Line">Line</a></li>
      </ul>
    </div>
  </div>
</div>
```

---

## Marquee 跑馬燈

相關 SCSS: `scss/components/_marquee.scss`

使用 Swiper 的垂直輪播實現。

```html
<div class="marquee">
  <div class="marqueeTitle">最新消息</div>
  <div class="marqueeSlider">
    <div class="swiperBox">
      <button type="button" class="swiperPrev swiperArrow">上一則</button>
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="#">
              <span class="date">2025-01-01</span>
              <span class="text">公告標題文字</span>
            </a>
          </div>
          <div class="swiper-slide">
            <a href="#">
              <span class="date">2025-01-02</span>
              <span class="text">另一則公告</span>
            </a>
          </div>
        </div>
      </div>
      <button type="button" class="swiperNext swiperArrow">下一則</button>
    </div>
    <button type="button" class="autoPlaySwitch" data-info-play="暫停中，點我播放" data-info-stop="播放中，點我暫停"></button>
  </div>
</div>
```

### JS 初始化

```javascript
const marqueeSlider = new Swiper('.marqueeSlider .swiper', {
  direction: 'vertical',
  navigation: {
    nextEl: '.marqueeSlider .swiperNext',
    prevEl: '.marqueeSlider .swiperPrev',
    disabledClass: 'swiperArrow-disabled',
  },
  autoplay: { delay: 5000 },
  on: {
    init: function (swiper) { swiperA11Fn(swiper); },
  },
});
```
