# SCSS 變數與 Mixin 速查

## 目錄

- [顏色變數](#顏色變數)
- [字型設定](#字型設定)
- [版面設定](#版面設定)
- [RWD 斷點](#rwd-斷點)
- [CSS 自訂屬性](#css-自訂屬性)
- [按鈕顏色](#按鈕顏色)
- [表單顏色](#表單顏色)
- [表格顏色](#表格顏色)
- [提示訊息顏色](#提示訊息顏色)

---

## 顏色變數

原始文件: `scss/_variable.scss`

```scss
// 主色
$colorPrimary: #0156A2;
$colorPrimaryLight: color.mix($colorPrimary, #fff, 10%);
$colorPrimaryDark: color.mix($colorPrimary, #000, 90%);

// 輔色
$colorSecondary: #326DC7;
$colorSecondaryLight: color.mix($colorSecondary, #fff, 10%);
$colorSecondaryDark: color.mix($colorSecondary, #000, 90%);

// 文字顏色
$colorWord: #333333;
$colorWordLight: #555555;
$colorWordDark: #111111;

// 其他
$colorDisabled: #DEE0E3;
$colorError: #C40000;
$colorAccessibility: #C40000;

// 連結顏色
$aColor: $colorSecondary;
$aHover: color.mix($aColor, #000, 90%);
```

---

## 字型設定

```scss
$arial: Arial, '微軟正黑體', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
$NotoSansTC: 'Noto Sans TC', Arial, 'PingFang TC', '微軟正黑體', sans-serif;
```

---

## 版面設定

```scss
$mainFontSize: 16;           // 基本文字大小 (px)
$domWidth: 1400px;            // 內容最大寬度
$flexTemplateGap: 24;         // Flex 間距 (px)
```

---

## RWD 斷點

```scss
$screenSize: (
  notebook: 1399px,   // 電腦
  tablet: 991px,      // 平板
  mobile: 767px,      // 手機
  xsMobile: 575px,    // 極小尺寸
);
```

---

## CSS 自訂屬性

```scss
:root {
  --RWDWidth: #{map.get($screenSize, tablet)};  // RWD 切換尺寸（與 main.js 連動）
  --sideFixTop: 80px;                            // 側邊選單固定 top
  --borderRadius8: 8px;                          // 圓角 8px
  --borderRadius4: 4px;                          // 圓角 4px
}
```

---

## 按鈕顏色

```scss
$btnPrimary: $colorPrimary;
$btnPrimaryHover: $colorPrimaryDark;
$btnSecondary: $colorSecondary;
$btnSecondaryHover: $colorSecondaryDark;
$btnNormal: #DEE0E3;
$btnNormalHover: color.mix($btnNormal, #000, 90%);
$btnDisabled: $colorDisabled;
```

---

## 表單顏色

```scss
$formFocus: $colorPrimary;
$formError: $colorError;
$formDisabled: $colorDisabled;
```

---

## 表格顏色

```scss
$tableBorder: #F1F1F1;
$tablePrimary: $colorPrimary;
$tableSecondary: $colorSecondary;
$tableNormal: $colorDisabled;
```

---

## 提示訊息顏色

```scss
// 一般灰
$noticeNormalGWord: #333;
$noticeNormalGBg: #DEE0E3;

// 資訊藍
$noticeNormalWord: #00529B;
$noticeNormalBg: #CFE5FC;

// 成功綠
$noticeSuccessWord: #00754B;
$noticeSuccessBg: #CDF3E6;

// 警告橘
$noticeWarningWord: #C23E00;
$noticeWarningBg: #FAECE6;

// 錯誤紅
$noticeErrorWord: #C40000;
$noticeErrorBg: #FDD7DE;
```
