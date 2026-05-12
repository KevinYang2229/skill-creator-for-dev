# HyUI5 元件 API

每個元件都有可複製的 HTML 骨架在 `assets/boilerplate/components/`。此文件列出 class 規則、JS 初始化方式與需要注意的無障礙要點。

## 目錄

- [按鈕 button](#按鈕-button)
- [表單 form](#表單-form)
- [麵包屑 breadcrumb](#麵包屑-breadcrumb)
- [功能列 functionPanel](#功能列-functionpanel)
- [標籤 tagBox](#標籤-tagbox)
- [分享 shareBox](#分享-sharebox)
- [主選單 menu / topNav](#主選單-menu--topnav)
- [側選單 sideNav](#側選單-sidenav)
- [頁籤 tabs](#頁籤-tabs)
- [手風琴 accordion](#手風琴-accordion)
- [燈箱 popup](#燈箱-popup)
- [輪播 slider (swiper)](#輪播-slider-swiper)
- [分頁 pagination](#分頁-pagination)
- [表格 tableList](#表格-tablelist)
- [列表 listGroup](#列表-listgroup)
- [首頁區塊 blockTypeA/B/C](#首頁區塊-blocktypeabc)
- [頁尾 fatFooter / footer](#頁尾-fatfooter--footer)
- [漂浮按鈕 floatNav](#漂浮按鈕-floatnav)

---

## 按鈕 button

| 顏色 | 預設 | 有邊框 | 無底色無邊框 |
|---|---|---|---|
| 主色 | `btnPrimary` | `btnPrimary bd` | `btnPrimary nbd` |
| 輔色 | `btnSecondary` | `btnSecondary bd` | `btnSecondary nbd` |
| 中性 | `btnNormal` | `btnNormal bd` | `btnNormal nbd` |

尺寸：`btnS` 小 / 預設 中 / `btnL` 大

含 icon：`<button class="btnPrimary"><i class="i_language_w"></i>文字</button>`
- 白色 icon 用 `_w` 結尾，深色用 `_dk` 結尾

Disabled：`disabled` 屬性或 `.disabled` class

## 表單 form

**結構規則（嚴格）**：

```
form
 └ .formBox        ← 一組表單
    └ h3           ← 區段標題（可選）
    └ .formList    ← 一列（預設 label 在上）
       │  [.inline → label 左 input 右]
       │  [.error → 紅色錯誤狀態]
       │  [.noFull → 不撐滿寬]
       └ label.formListTitle for="id"
       │    └ <em aria-label="必填">*</em>   ← 必填標記
       └ .formContent
          └ <input>/<select>/<textarea>...
          └ [.help#xxx → 提示，input 加 aria-describedby="xxx"]
          └ [<div role="alert"> 內含 .formNoticeError 等訊息]
    └ .gridBox         ← 內部包一組以網格呈現的 .formList.inline
    └ .formBtnBox      ← 右對齊按鈕區
```

**必填 icon**：`<em aria-label="必填">*</em>`（放 label 開頭）

**select 包一層**：
```html
<div class="select">
  <select>...</select>
</div>
```

**input + icon**：`<div class="inputBox"><i class="i_mail_dk"></i><input ...></div>`

**密碼顯示切換**：
```html
<input type="password" ...>
<button class="formEyes" data-show="顯示密碼" data-hide="隱藏密碼" aria-label="顯示密碼"></button>
```

**提示訊息 class**（全部放 `<div role="alert">` 內）：
- `.formNotice` 灰色一般提醒
- `.formNoticeInfo` 藍色訊息
- `.formNoticeSuccess` 綠色成功
- `.formNoticeWarning` 橘色警告
- `.formNoticeError` 紅色錯誤

## 麵包屑 breadcrumb

```html
<nav class="breadcrumb" role="navigation" aria-label="麵包屑">
  <ul>
    <li><a href="#">首頁</a></li>
    <li><a href="#">父節點</a></li>
    <li aria-current="page">目前頁</li>   ← 最後一項不加 <a>，加 aria-current
  </ul>
</nav>
```

## 功能列 functionPanel

放在 `pageTitle` 之後。內部子元件（任選組合）：
- `.fontSizeInner` 字型大小
- `.contentSearchBtn.btnPrimary` + `.contentSearchBox` 條件查詢（lp 類用）
- `.functionPanelBtn.back` 回上頁、`.print` 列印、`.email` email
- `.shareBox` 含 `.functionPanelBtn.share` 按鈕與 `.shareBoxList` 展開分享圖示

## 標籤 tagBox

```html
<div class="tagBox">
  <ul>
    <li><a href="#" class="active"><i class="i_tag_dk"></i>全部 <sub>(2)</sub></a></li>
    <li><a href="#"><i class="i_tag_dk"></i>標籤一</a></li>
  </ul>
</div>
```
目前選取加 `.active`；計數用 `<sub>(n)</sub>`。

## 分享 shareBox

兩種用法：
1. **面板內按鈕**（於 functionPanel 內）：按鈕收合式 + `.shareBoxList`
2. **直接展開清單**（獨立使用）：`.shareBox > ul` 直接列出

可用圖示（`images/basic/icon/share/*.svg`）：facebook、x、threads、line、youtube、instagram、linkedin、pinterest、whatsapp、telegram、talk、podcast、discord、plurk、rss、email。

## 主選單 menu / topNav

- `header > .headTop > .container > .topNav` 為頁首右側小功能列（回首頁/網站導覽/常見問答 + 字型/語言/搜尋）
- `header > .mainMenu > .container > nav.menu` 為主選單，支援**最多五層**
- 手機版由 `#mobileMainMenuBtn` 觸發
- JS 已自動處理開合、鍵盤操作

## 側選單 sideNav

於 `<aside class="sideNav">` 包起來，放在 `.innerPage > .container` 內的 `.mainContentBox` 前方，桌機自動並排、手機變摺疊。

```html
<aside class="sideNav" data-next-open="開啟下層選單" data-next-close="收合下層選單">
  <button type="button" id="sideNavBtn">次選單開關</button>
  <nav id="sideMenu" aria-label="側選單" role="navigation">
    <div class="sideMenuContent">
      <div class="sideTitle">側選單標題</div>
      <div class="sideNavBox">
        <ul>
          <li>
            <a href="#"><i class="icon"><img src="images/basic/icon/language_dk.svg" alt /></i>第一層</a>
            <ul>
              <li><a href="#">第二層</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</aside>
```

## 頁籤 tabs

```html
<div class="tabSet tabFunction1">      ← tabFunction1/2/3 需唯一，對應 JS 呼叫
  <div class="tabBtnBox">
    <div class="tabItems">
      <button class="tabBtn active">...</button>   ← 預設開哪個加 .active
      <button class="tabBtn">...</button>
    </div>
  </div>
  <div class="tabContentGroup">
    <div class="tabContent"><div class="tabContentIn">...</div></div>
    <div class="tabContent"><div class="tabContentIn">...</div></div>
  </div>
</div>
```

**初始化**（於 `js/customize.js`）：
```js
tabFunction('.tabFunction1');
// 或
tabFunction({
  target: '.tabFunction1',
  modeSwitch: false,      // RWD 以下自動轉手風琴
  openContent: false,
  windowWidth: 767,
  autoClose: true,
  openSwitch: true,
});
```

ARIA 屬性（role/aria-labelledby/aria-controls）由 JS 自動加入。

## 手風琴 accordion

```html
<div class="accordion" data-state-open="展開" data-state-close="收合">
  <div class="accordionList active">          ← 預設展開第幾項加 .active
    <button class="accordionBtn">標題</button>
    <div class="accordionContent">
      <div class="content">...</div>
    </div>
  </div>
</div>
```

**初始化**：`accordionFunction('.accordion');`

## 燈箱 popup

**依賴 Fancybox**。觸發按鈕放任意位置：

```html
<button data-fancybox data-src="#popup">開啟</button>
```

燈箱內容節點（放 main 底部或 body 內）：

```html
<div id="popup" class="popupB">       ← popupB 大 / popupS 小
  <div class="popupBox">
    <div class="popTitle">標題</div>
    <div class="popupContent">內容</div>
    <div class="btnBox">
      <button class="cancel btnSecondary">取消</button>
      <button class="submit btnPrimary">確認</button>
    </div>
  </div>
</div>
```

**載入即開啟**：在 popupB/popupS 加 `.showPopup`。

## 輪播 slider (swiper)

結構 class：
- `.mpSlider` 首頁主視覺
- `.adSlider` 廣告輪播（多張同時）

通用 DOM：
```html
<div class="swiperBox">
  <button class="swiperPrev swiperArrow">上一筆</button>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">...</div>
    </div>
  </div>
  <button class="swiperNext swiperArrow">下一筆</button>
</div>
<div class="swiperPagination"></div>
```

無障礙：自動播放需加 `<button class="autoPlaySwitch">` 讓使用者可以暫停。

**初始化**在 `js/customize.js`，用 `new Swiper('.xxx', {...})`。

## 分頁 pagination

見 `components/pagination.html`。

箭頭 class（須帶 title 屬性）：
- `.firstArrow` / `.prevArrow` / `.nextArrow` / `.lastArrow`
- 目前頁：`<li class="active">`

## 表格 tableList

見 `components/tableList.html`。
- 無障礙 caption 預設隱藏
- 複雜表格加 `<span class="summary">`
- `th scope="col"` 必加
- 欄位 class：`.num` 編號、`.date` 日期（樣式不同）

## 列表 listGroup

見 `components/listGroup.html`。常用於 `lp.html`。

## 首頁區塊 blockTypeA/B/C

- `blockTypeA` — 日期在前的簡易列表（listBox）
- `blockTypeB`、`blockTypeC` — 卡片式，請直接參考 `HyUI5/mp.html` 與 `mp2.html` 內實際用法

## 頁尾 fatFooter / footer

- `.fatFooter` 為頁尾網站導覽，可由 `#fatFooterBtn` 收合
- `<footer>` 為版權資訊、聯絡資料、無障礙標章、更新日期與瀏覽人次
- 必帶 `<a class="accessKeyItem" href="#aZ" id="aZ" accesskey="Z">:::</a>`

## 漂浮按鈕 floatNav

放在 `.wrapper` 外層。`.typeA` 為社群圖示列；`.floatSwitchBtn` 為開合鈕。

## icon class 命名規則

以 `i_<名稱>_<色系>` 為規則：
- `_dk` 深色版（用於亮底）
- `_w` 白色版（用於深底）
- 例：`i_tag_dk`、`i_mail_dk`、`i_lock_dk`、`i_language_w`

完整 icon 對照表請查看 `HyUI5/icon.html` 頁面。
