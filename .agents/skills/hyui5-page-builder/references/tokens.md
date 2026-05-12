# HyUI5 設計 Token

定義於 `scss/_variable.scss`，不該在新頁面裡硬寫 hex 值，要改色請用 SCSS 變數或在 `css/blue.css`（theme）調整。

## 顏色

| 變數 | 值 | 用途 |
|---|---|---|
| `$colorPrimary` | `#0156A2` | 主色（header、btnPrimary、focus） |
| `$colorPrimaryLight` | mix(主色, #fff, 10%) | 主色淺 |
| `$colorPrimaryDark` | mix(主色, #000, 90%) | 主色深（hover） |
| `$colorSecondary` | `#326DC7` | 輔色（btnSecondary、link） |
| `$colorWord` | `#333` | 主要文字 |
| `$colorWordLight` | `#555` | 次要文字 |
| `$colorWordDark` | `#111` | 強調文字 |
| `$colorDisabled` | `#DEE0E3` | Disabled |
| `$colorError` | `#C40000` | 錯誤 |
| `$colorAccessibility` | `#C40000` | 無障礙 focus 紅框 |

## 通知色系

| 狀態 | 文字 | 背景 |
|---|---|---|
| 一般 | `#333` | `#DEE0E3` |
| info | `#00529B` | `#CFE5FC` |
| success | `#00754B` | `#CDF3E6` |
| warning | `#C23E00` | `#FAECE6` |
| error | `#C40000` | `#FDD7DE` |

對應 form class：`.formNotice` / `.formNoticeInfo` / `.formNoticeSuccess` / `.formNoticeWarning` / `.formNoticeError`

## 字型

```scss
$arial: Arial, '微軟正黑體', 'PingFang TC', 'Microsoft JhengHei', 'Apple LiGothic Medium', sans-serif;
$NotoSansTC: 'Noto Sans TC', Arial, 'PingFang TC', '微軟正黑體', ...;
```

預設中文字型是 Noto Sans TC（自帶於 `assets/noto-sans-tc/`）。

## 版面尺寸

```scss
$mainFontSize: 16;          // base 字級（px）
$domWidth: 1400px;          // container 最大寬
$flexTemplateGap: 24;       // 柵格間距（px）
```

## RWD 斷點

```scss
$screenSize: (
  notebook: 1399px,
  tablet: 991px,
  mobile: 767px,
  xsMobile: 575px,
);
```

用法：
```scss
@include screen('mobile') { ... }   // ≤767 生效
```

## CSS 變數（`:root`）

```css
--RWDWidth: 991px;       /* JS 切手機版界線 */
--sideFixTop: 80px;      /* sideNav 置頂偏移 */
--borderRadius8: 8px;
--borderRadius4: 4px;
```

## 主題切換（換色）

HyUI5 提供 theme 目錄：`scss/theme/blue.scss` → 編譯為 `css/blue.css`。

要改主色：
1. 修改 `scss/_variable.scss` 內 `$colorPrimary`、`$colorSecondary`
2. 或建立新 theme：`scss/theme/green.scss`，覆寫 CSS 變數
3. `<head>` 的第二個 `<link rel="stylesheet" href="css/xxx.css">` 換成新檔

**不要**直接改 `css/style.css`（編譯產物）。
