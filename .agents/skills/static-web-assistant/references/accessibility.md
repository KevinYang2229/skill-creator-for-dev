# 無障礙規範 (Accessibility / a11y)

## 目錄

- [WCAG 2.1 AA 要點](#wcag-21-aa-要點)
- [語意化結構](#語意化結構)
- [ARIA 屬性](#aria-屬性)
- [鍵盤導航](#鍵盤導航)
- [色彩與視覺](#色彩與視覺)
- [表單無障礙](#表單無障礙)
- [媒體無障礙](#媒體無障礙)

---

## WCAG 2.1 AA 要點

| 原則   | 要求                               |
| ------ | ---------------------------------- |
| 可感知 | 文字替代、字幕、適應性、可辨識     |
| 可操作 | 鍵盤操作、充足時間、無閃爍、可導航 |
| 可理解 | 可讀性、可預測、輸入協助           |
| 穩健性 | 相容輔助技術                       |

---

## 語意化結構

```html
<!-- ✅ 使用地標角色 -->
<header><!-- 頁首 → banner 角色 --></header>
<nav aria-label="主導航"><!-- 導航 → navigation 角色 --></nav>
<main><!-- 主要內容 → main 角色 --></main>
<aside><!-- 側邊欄 → complementary 角色 --></aside>
<footer><!-- 頁尾 → contentinfo 角色 --></footer>
```

### 規則

- 使用語意化標籤提供隱含的 ARIA 角色
- 每頁僅一個 `<main>`
- 多個 `<nav>` 時使用 `aria-label` 區分

---

## ARIA 屬性

### 使用時機

- **優先使用原生 HTML** → 語意化標籤自帶角色
- **ARIA 是補充** → 原生元素無法表達時才使用

### 常見模式

```html
<!-- 漢堡選單 -->
<button
  aria-expanded="false"
  aria-controls="mobile-nav"
  aria-label="開啟導航選單"
>
  ☰
</button>
<nav id="mobile-nav" aria-hidden="true">
  <!-- 導航內容 -->
</nav>

<!-- 分頁籤 -->
<div role="tablist" aria-label="產品資訊">
  <button role="tab" aria-selected="true" aria-controls="panel-1">規格</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">評價</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">...</div>

<!-- 即時更新區域 -->
<div aria-live="polite" aria-atomic="true">商品已加入購物車</div>
```

---

## 鍵盤導航

### 必要支援

| 功能         | 按鍵                |
| ------------ | ------------------- |
| 聚焦導航     | `Tab` / `Shift+Tab` |
| 啟動 / 選擇  | `Enter` / `Space`   |
| 清單項目切換 | `↑` `↓` `←` `→`     |
| 關閉對話框   | `Escape`            |

### 焦點管理

```scss
// ✅ 可見的焦點樣式
:focus-visible {
  outline: 3px solid vars.$color-primary;
  outline-offset: 2px;
}

// 移除預設 outline 時必須提供替代方案
:focus:not(:focus-visible) {
  outline: none;
}
```

### 規則

- 所有互動元素必須可透過鍵盤操作
- 焦點順序必須符合邏輯閱讀順序
- 不可使用 `outline: none` 而不提供替代焦點提示
- Modal 開啟時，焦點限制在 Modal 內（Focus Trap）

---

## 色彩與視覺

### 對比度要求

| 類型                            | 最低比率 (AA) |
| ------------------------------- | ------------- |
| 一般文字                        | 4.5:1         |
| 大型文字 (≥24px / ≥18.7px bold) | 3:1           |
| UI 元件邊界                     | 3:1           |

### 規則

- 不可僅依賴顏色傳達資訊（加圖示或文字輔助）
- 連結不僅用顏色區分，需加底線或其他視覺提示
- 提供足夠的間距與留白

---

## 表單無障礙

```html
<!-- ✅ 正確的表單標籤 -->
<div class="form-group">
  <label for="user-email">電子郵件 <span aria-hidden="true">*</span></label>
  <input
    id="user-email"
    type="email"
    name="email"
    required
    aria-required="true"
    aria-describedby="email-hint email-error"
    autocomplete="email"
  />
  <p id="email-hint" class="form-hint">例：user@example.com</p>
  <p id="email-error" class="form-error" role="alert" hidden>
    請輸入有效的電子郵件地址
  </p>
</div>
```

### 規則

- 每個 `<input>` 必須有對應的 `<label>`（`for` / `id` 配對）
- 必填欄位標示 `required` + `aria-required="true"`
- 錯誤訊息使用 `role="alert"` 即時通知
- 使用 `autocomplete` 屬性協助自動填入

---

## 媒體無障礙

- 圖片必須有 `alt` 屬性：描述性圖片寫描述，裝飾性圖片用 `alt=""`
- 影片提供字幕 (`<track>`)
- 自動播放的媒體必須可暫停
- 動畫遵循 `prefers-reduced-motion`

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
