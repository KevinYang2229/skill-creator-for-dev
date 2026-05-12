# 表單類元件

## 目錄

- [Forms 表單](#forms-表單)
- [Search 搜尋](#search-搜尋)
- [FontSize 字體大小控制](#fontsize-字體大小控制)
- [Language 語系選單](#language-語系選單)
- [Share 社群分享](#share-社群分享)

---

## Forms 表單

相關 SCSS: `scss/components/_form.scss`

### 基本結構

表單外層用 `<form class="formBox">`，每項用 `formList` 包住。

```html
<form class="formBox">
  <div class="formList">
    <label class="formListTitle" for="name">姓名</label>
    <div class="formContent">
      <input type="text" id="name" placeholder="請輸入姓名" />
    </div>
  </div>
</form>
```

### 並排（inline）

```html
<div class="formList inline">
  <label class="formListTitle" for="account">帳號</label>
  <div class="formContent">
    <input type="text" id="account" placeholder="請輸入帳號" />
  </div>
</div>
```

- `inline`：label 與 input 並排，input 填滿剩餘空間
- `inline noFull`：label 與 input 並排，input 不填滿

### 必填

```html
<div class="formList required">
  <label class="formListTitle" for="email">Email</label>
  <div class="formContent">
    <input type="email" id="email" placeholder="請輸入Email" required />
  </div>
</div>
```

### 錯誤狀態

```html
<div class="formList error">
  <label class="formListTitle" for="phone">電話</label>
  <div class="formContent">
    <input type="tel" id="phone" placeholder="請輸入電話" />
  </div>
</div>
```

### 下拉選單

```html
<div class="formList">
  <label class="formListTitle" for="city">城市</label>
  <div class="formContent">
    <div class="select">
      <select id="city">
        <option value="">請選擇</option>
        <option value="taipei">台北市</option>
        <option value="taichung">台中市</option>
      </select>
    </div>
  </div>
</div>
```

### 單選 Radio

```html
<fieldset class="formList inline">
  <legend class="formListTitle">性別</legend>
  <div class="formContent inline">
    <div class="inputOption">
      <input type="radio" name="gender" id="male" value="male" />
      <label for="male">男</label>
    </div>
    <div class="inputOption">
      <input type="radio" name="gender" id="female" value="female" />
      <label for="female">女</label>
    </div>
  </div>
</fieldset>
```

### 複選 Checkbox

```html
<fieldset class="formList inline">
  <legend class="formListTitle">興趣</legend>
  <div class="formContent inline">
    <div class="inputOption">
      <input type="checkbox" name="hobby" id="sport" value="sport" />
      <label for="sport">運動</label>
    </div>
    <div class="inputOption">
      <input type="checkbox" name="hobby" id="music" value="music" />
      <label for="music">音樂</label>
    </div>
  </div>
</fieldset>
```

### 密碼欄位

```html
<div class="formList inline">
  <label class="formListTitle" for="pwd">密碼</label>
  <div class="formContent">
    <div class="inputBox">
      <i class="i_lock_dk"></i>
      <input class="password" type="password" id="pwd" autocomplete="current-password" placeholder="請輸入密碼" />
      <button class="formEyes" type="button" data-show="顯示密碼" data-hide="隱藏密碼"></button>
    </div>
  </div>
</div>
```

### 多層群組（fieldset）

```html
<form class="formBox">
  <fieldset class="formList" aria-labelledby="addr">
    <legend class="formListTitle" id="addr">地址</legend>
    <div class="formContent">
      <div class="formList">
        <label for="city2">縣市</label>
        <div class="formContent">
          <div class="select"><select id="city2"><option>請選擇</option></select></div>
        </div>
      </div>
      <div class="formList">
        <label for="detail">詳細地址</label>
        <div class="formContent">
          <input type="text" id="detail" />
        </div>
      </div>
    </div>
  </fieldset>
</form>
```

### 隱藏 label（srOnly）

```html
<label for="search" class="srOnly">搜尋</label>
```

### 提示訊息

```html
<div role="alert" id="alert1">
  <div class="formNotice"><span>一般提醒</span></div>
  <div class="formNoticeInfo"><span>資訊提醒</span></div>
  <div class="formNoticeSuccess"><span>成功訊息</span></div>
  <div class="formNoticeWarning"><span>警告訊息</span></div>
  <div class="formNoticeError"><span>錯誤訊息</span></div>
</div>
```

---

## Search 搜尋

相關 SCSS: `scss/components/_search.scss`

位於 header 的搜尋功能，已整合在 topNav 結構中。

```html
<div class="webSearch" role="search">
  <div class="webSearchContent">
    <div class="formList">
      <label for="topSearchInput" class="srOnly">搜尋</label>
      <input id="topSearchInput" type="text" placeholder="請輸入文字" accesskey="S" aria-label="搜尋網站內容" />
      <button type="button" class="btnPrimary">查詢</button>
      <button type="button">進階搜尋</button>
    </div>
    <div class="hotKeyword">
      <ul>
        <li><a href="#">熱門關鍵字</a></li>
      </ul>
    </div>
  </div>
</div>
```

---

## FontSize 字體大小控制

相關 SCSS: `scss/components/_fontSize.scss`

```html
<div class="fontSize sliderFn">
  <button type="button">文字大小</button>
  <ul>
    <li><button type="button" class="smallSize">小</button></li>
    <li><button type="button" class="mediumSize">中</button></li>
    <li><button type="button" class="largeSize">大</button></li>
  </ul>
</div>
```

---

## Language 語系選單

相關 SCSS: `scss/components/_language.scss`

```html
<div class="language sliderFn">
  <button type="button">語言選擇</button>
  <ul id="languageList">
    <li><a href="#">繁體中文</a></li>
    <li><a href="#">简体中文</a></li>
    <li><a href="#">ENGLISH</a></li>
  </ul>
</div>
```

---

## Share 社群分享

相關 SCSS: `scss/components/_share.scss`

```html
<div class="share">
  <ul>
    <li><a href="#" class="shareFb" target="_blank" title="Facebook(開新視窗)">Facebook</a></li>
    <li><a href="#" class="shareLine" target="_blank" title="Line(開新視窗)">Line</a></li>
    <li><a href="#" class="shareTwitter" target="_blank" title="Twitter(開新視窗)">Twitter</a></li>
    <li><button type="button" class="shareUrl" title="複製網址">複製連結</button></li>
  </ul>
</div>
```
