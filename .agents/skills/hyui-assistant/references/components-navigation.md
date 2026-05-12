# 導覽類元件

## 目錄

- [Menu 主選單](#menu-主選單)
- [TopNav 導覽列](#topnav-導覽列)
- [SideNav 側邊選單](#sidenav-側邊選單)
- [Breadcrumb 頁面路徑](#breadcrumb-頁面路徑)
- [Pagination 分頁導覽](#pagination-分頁導覽)
- [FloatNav 固定側邊欄](#floatnav-固定側邊欄)

---

## Menu 主選單

相關 SCSS: `scss/components/_menu.scss`

支援多層選單（最多 5 層），JS 自動偵測 `hasChild` class。

```html
<div class="mainMenu">
  <div class="container">
    <nav class="menu" role="navigation" aria-label="主選單">
      <ul>
        <li>
          <a href="#">第一層選單</a>
          <ul>
            <li><a href="#">第二層選單</a></li>
            <li>
              <a href="#">第二層有子選單</a>
              <ul>
                <li><a href="#">第三層選單</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><a href="#">僅第一層（有連結）</a></li>
      </ul>
    </nav>
  </div>
</div>
```

### JS 初始化（在 main.js 中已預設）

```javascript
mainMenu({
  sticky: true,     // 選單固定於頂部
  needLink: false,  // 是否第一層也點擊連結
  mega: false,      // 是否為 Mega Menu
});
```

---

## TopNav 導覽列

相關 SCSS: `scss/components/_topNav.scss`

位於 header 內的功能列，包含回首頁、網站導覽等連結及功能按鈕。

```html
<nav class="topNav" role="navigation" aria-label="頁首功能列">
  <a class="accessKeyItem" href="#aU" id="aU" accesskey="U" aria-label="功能區塊">:::</a>
  <div class="navList">
    <ul>
      <li><a href="#">回首頁</a></li>
      <li><a href="#">網站導覽</a></li>
      <li><a href="#">常見問答</a></li>
    </ul>
  </div>
  <div class="subNavList">
    <!-- fontSize / language / topSearch 按鈕 -->
  </div>
</nav>
```

---

## SideNav 側邊選單

相關 SCSS: `scss/components/_sideNav.scss`

放在 `<main class="innerPage">` 的 `container` 中。

```html
<aside class="sideNav">
  <button id="sideNavBtn" type="button">次選單開關</button>
  <nav id="sideMenu" aria-label="側選單">
    <div class="sideMenuContent">
      <div class="sideTitle">側選單標題</div>
      <div class="sideNavBox">
        <ul>
          <li><a href="#">項目一</a></li>
          <li>
            <a href="#">項目二（有子選單）</a>
            <ul>
              <li><a href="#">子項目 A</a></li>
              <li><a href="#">子項目 B</a></li>
            </ul>
          </li>
          <li><a href="#">項目三</a></li>
        </ul>
      </div>
    </div>
  </nav>
</aside>
```

---

## Breadcrumb 頁面路徑

相關 SCSS: `scss/components/_breadcrumb.scss`

```html
<div class="breadcrumb">
  <ul>
    <li><a href="#">首頁</a></li>
    <li><a href="#">第一層</a></li>
    <li><span>目前頁面</span></li>
  </ul>
</div>
```

---

## Pagination 分頁導覽

相關 SCSS: `scss/components/_pagination.scss`

```html
<nav class="pagination" aria-label="分頁導覽">
  <ul>
    <li><a href="#" class="prev" aria-label="上一頁">上一頁</a></li>
    <li><a href="#">1</a></li>
    <li><a href="#" class="active" aria-current="page">2</a></li>
    <li><a href="#">3</a></li>
    <li><span>...</span></li>
    <li><a href="#">10</a></li>
    <li><a href="#" class="next" aria-label="下一頁">下一頁</a></li>
  </ul>
</nav>
```

---

## FloatNav 固定側邊欄

相關 SCSS: `scss/components/_floatNav.scss`

固定在畫面右側的浮動按鈕群組。

```html
<div class="floatNav">
  <ul>
    <li><a href="#" class="floatNavItem" aria-label="回到頂部"><i class="i_arrow_t"></i>TOP</a></li>
    <li><a href="#" class="floatNavItem" aria-label="分享"><i class="i_share"></i>分享</a></li>
  </ul>
</div>
```
