# HTML 基本範本與結構

## 目錄

- [HTML 骨架](#html-骨架)
- [Head 設定](#head-設定)
- [頁面結構](#頁面結構)
- [Header 頁首](#header-頁首)
- [Main 主要內容](#main-主要內容)
- [Footer 頁尾](#footer-頁尾)
- [JavaScript 載入](#javascript-載入)

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-Hant" class="no-js">
  <head>...</head>
  <body>
    <div class="wrapper">
      <a class="goCenter" href="#aC">按Enter到主內容區</a>
      <header>...</header>
      <main>...</main>
      <footer>...</footer>
    </div>
    <button id="scrollTop" type="button" aria-label="回到頂部">TOP</button>
    <!-- JS files -->
  </body>
</html>
```

- `lang="zh-Hant"` 繁體中文，可改為 `lang="en"` 等
- `class="no-js"` 供無障礙 JS 關閉檢測使用

---

## Head 設定

```html
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>網站標題</title>
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="css/blue.css" />
<link href="images/favicon.png" rel="icon" type="image/x-icon" />
```

- `style.css` 為主 CSS，`blue.css` 為附加色系（可移除或替換）

---

## 頁面結構

HyUI5 按頁面功能區分 class：

| 頁面類型 | main 的 class | SCSS 檔案 | 說明 |
|---|---|---|---|
| 首頁 | `class="main"` | `_mp.scss` | 滿版區塊用 `section > .container` |
| 內頁（無側欄） | `class="innerPage"` | `_cp.scss` / `_lp.scss` / `_np.scss` | 用 `.mainContentBox > .mainContent` |
| 內頁（有側欄） | `class="innerPage"` | 同上 + `_sideNav.scss` | 加上 `<aside class="sideNav">` |
| 列表頁 | `class="innerPage"` | `_lp.scss` | 列表項目搭配 `.flexTpl_*` |
| 404 頁 | 自訂 | `_page404.scss` | 錯誤頁面 |
| 網站導覽 | `class="innerPage"` | `_sitemap.scss` | Sitemap 頁面 |

---

## Header 頁首

相關 SCSS: `scss/template/_header.scss`

HyUI5 header 分為 `headTop` 和 `mainMenu` 兩個區塊。

```html
<header>
  <div class="headTop">
    <div class="container">
      <!-- 手機版主選單按鈕 -->
      <button id="mobileMainMenuBtn" type="button">主選單</button>
      <!-- 網站標題 -->
      <h1>
        <a href="index.html"><img src="images/logo.png" alt="網站標題" />網站標題</a>
      </h1>
      <!-- navigation (topNav) -->
      <nav class="topNav" role="navigation" aria-label="頁首功能列">
        <a class="accessKeyItem" href="#aU" id="aU" accesskey="U" aria-label="功能區塊">:::</a>
        <div class="navList">
          <ul>
            <li><a href="#">回首頁</a></li>
            <li><a href="#">網站導覽</a></li>
          </ul>
        </div>
        <div class="subNavList">
          <!-- fontSize / language / topSearch 按鈕 -->
        </div>
      </nav>
      <!-- topSearch 手機版按鈕 -->
      <button id="mobileSearchBtn" type="button" aria-label="搜尋按鈕"></button>
      <!-- topSearch 內容 -->
      <div class="webSearch" role="search">
        <div class="webSearchContent">
          <div class="formList">
            <label for="topSearchInput" class="srOnly">搜尋</label>
            <input id="topSearchInput" type="text" placeholder="請輸入文字" accesskey="S" aria-label="搜尋網站內容" />
            <button type="button" class="btnPrimary">查詢</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- noscript -->
  <noscript>您的瀏覽器不支援JavaScript語法。<a href="#">網站導覽</a></noscript>
  <!-- menu -->
  <div class="mainMenu">
    <div class="container">
      <nav class="menu" role="navigation" aria-label="主選單">
        <ul>
          <li>
            <a href="#">第一層選單</a>
            <ul>
              <li><a href="#">第二層選單</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>
```

---

## Main 主要內容

相關 SCSS: `scss/template/_main.scss`

### 首頁

```html
<main class="main">
  <a class="accessKeyItem" href="#aC" id="aC" accesskey="C" aria-label="主要內容區">:::</a>
  <div class="mainBox">
    <section>
      <div class="container">
        <div class="flexTpl_12 full"></div>
      </div>
    </section>
  </div>
</main>
```

- `full` class 代表滿版，清除 `container` 的 `max-width` 和 `padding`

### 內頁（無側欄）

```html
<main class="innerPage">
  <a class="accessKeyItem" href="#aC" id="aC" accesskey="C" aria-label="主要內容區">:::</a>
  <div class="container">
    <div class="mainContentBox">
      <h2 class="pageTitle">節點標題</h2>
      <div class="mainContent">
        <!-- 內容放置區塊 -->
      </div>
    </div>
  </div>
</main>
```

### 內頁（有側欄）

在 `container` 中加入 `aside`，CSS 自動判斷有側邊欄位。

```html
<main class="innerPage">
  <a class="accessKeyItem" href="#aC" id="aC" accesskey="C" aria-label="主要內容區">:::</a>
  <div class="container">
    <!-- sideNav -->
    <aside class="sideNav">
      <button id="sideNavBtn" type="button">次選單開關</button>
      <nav id="sideMenu" aria-label="側選單">
        <div class="sideMenuContent">
          <div class="sideTitle">側選單標題</div>
          <div class="sideNavBox"></div>
        </div>
      </nav>
    </aside>
    <!-- 主內容區 -->
    <div class="mainContentBox">
      <h2 class="pageTitle">節點標題</h2>
      <div class="mainContent">
        <!-- 內容放置區塊 -->
      </div>
    </div>
  </div>
</main>
```

---

## Footer 頁尾

相關 SCSS: `scss/template/_footer.scss`

```html
<footer>
  <a class="accessKeyItem" href="#aZ" id="aZ" accesskey="Z" aria-label="頁尾區">:::</a>
  <!-- fatFooter（選用） -->
  <div class="footerBox">
    <div class="container">
      <div class="infoBox">
        <div class="footerLogo">
          <a href="index.html"><img src="images/footer_logo.png" alt="網站標題" />網站標題</a>
        </div>
        <p class="copyright">Copyright © 2025 All Rights Reserved</p>
        <ul class="footerInfo">
          <li>地址：xxx</li>
          <li>電話：xxx</li>
        </ul>
        <ul class="footerLink">
          <li><a href="#" class="btnSecondary">隱私權政策</a></li>
          <li><a href="#" class="btnSecondary">網站安全政策</a></li>
        </ul>
      </div>
      <div class="infoBox">
        <div class="footerIcon">
          <a target="_blank" href="#"><img src="images/basic/accessibility.jpg" alt="無障礙檢測" /></a>
        </div>
        <div class="footerInfo2">
          <div class="update">更新日期:<span>2025/01/01</span></div>
          <div class="counter">累計瀏覽人次:<span>0</span></div>
        </div>
      </div>
    </div>
  </div>
</footer>
```

---

## JavaScript 載入

```html
<!-- fancyBox（燈箱） -->
<script src="assets/fancybox/fancybox.umd.js"></script>
<script src="assets/fancybox/l10n/zh_TW.umd.js"></script>
<!-- Swiper（輪播） -->
<script src="vendor/swiper/swiper-bundle.min.js"></script>
<!-- main.js（互動模組，勿修改） -->
<script src="js/main.js"></script>
<!-- customize.js（自定義互動程式） -->
<script src="js/customize.js"></script>
```

- `main.js` 提供預設互動模組，不要任意修改
- `customize.js` 用來撰寫專案自訂的互動程式
- 如需 jQuery 版本，改用 `mainJq.js` 並引入 `vendor/jquery-3.7.1.min.js`
