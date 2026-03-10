# SASS 編碼規範

## 目錄

- [目錄結構](#目錄結構)
- [命名規範](#命名規範)
- [變數管理](#變數管理)
- [Mixin 與函式](#mixin-與函式)
- [巢狀規則](#巢狀規則)
- [響應式斷點](#響應式斷點)
- [程式風格](#程式風格)

---

## 目錄結構

採用簡化版 7-1 模式：

```
sass/
├── main.scss              # 主入口，僅負責 @use 匯入
├── base/
│   ├── _reset.scss        # CSS Reset / Normalize
│   ├── _typography.scss   # 字型與基礎文字樣式
│   └── _variables.scss    # 全域變數（顏色、間距、斷點）
├── components/
│   ├── _buttons.scss      # 按鈕元件
│   ├── _cards.scss        # 卡片元件
│   └── _forms.scss        # 表單元件
├── layout/
│   ├── _header.scss       # 頁首佈局
│   ├── _footer.scss       # 頁尾佈局
│   └── _grid.scss         # 網格系統
└── utilities/
    ├── _mixins.scss       # 可重用的 Mixin
    └── _functions.scss    # 自訂函式
```

### main.scss 入口規範

```scss
// main.scss — 不含任何樣式，僅匯入模組
@use "base/variables" as vars;
@use "base/reset";
@use "base/typography";

@use "utilities/mixins" as mix;

@use "layout/header";
@use "layout/footer";
@use "layout/grid";

@use "components/buttons";
@use "components/cards";
@use "components/forms";
```

### 規則

- 使用 `@use` 取代 `@import`（已棄用）
- Partial 檔案以 `_` 前綴命名
- `main.scss` 不撰寫任何樣式規則
- 匯入順序：variables → reset → base → utilities → layout → components

---

## 命名規範

### BEM 方法論

```scss
// Block__Element--Modifier
.card {
  // Block：獨立元件
  padding: 1rem;

  &__header {
    // Element：元件內部結構
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: 1.25rem;
  }

  &__body {
    padding: 1rem 0;
  }

  &--featured {
    // Modifier：變體狀態
    border: 2px solid vars.$color-primary;
  }

  &--compact {
    padding: 0.5rem;
  }
}
```

### 命名規則

| 類型        | 規則                  | 範例                            |
| ----------- | --------------------- | ------------------------------- |
| 變數        | kebab-case + `$` 前綴 | `$color-primary`, `$spacing-md` |
| Mixin       | kebab-case            | `@mixin flex-center`            |
| 函式        | kebab-case            | `@function rem()`               |
| Placeholder | `%` 前綴 + kebab-case | `%visually-hidden`              |
| 元件類別    | BEM 命名              | `.nav__item--active`            |

---

## 變數管理

### \_variables.scss 結構

```scss
// ========== 顏色系統 ==========
$color-primary: #2563eb;
$color-primary-light: #60a5fa;
$color-primary-dark: #1d4ed8;

$color-secondary: #7c3aed;
$color-success: #16a34a;
$color-warning: #d97706;
$color-danger: #dc2626;

$color-text: #1f2937;
$color-text-light: #6b7280;
$color-bg: #ffffff;
$color-bg-alt: #f9fafb;
$color-border: #e5e7eb;

// ========== 間距系統 ==========
$spacing-xs: 0.25rem; // 4px
$spacing-sm: 0.5rem; // 8px
$spacing-md: 1rem; // 16px
$spacing-lg: 1.5rem; // 24px
$spacing-xl: 2rem; // 32px
$spacing-2xl: 3rem; // 48px

// ========== 字型 ==========
$font-family-base: "Noto Sans TC", sans-serif;
$font-family-mono: "Fira Code", monospace;

$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.25rem;
$font-size-xl: 1.5rem;
$font-size-2xl: 2rem;
$font-size-3xl: 2.5rem;

// ========== 響應式斷點 ==========
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-2xl: 1400px;

// ========== 圓角 ==========
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
$radius-full: 9999px;

// ========== 陰影 ==========
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

// ========== Z-Index ==========
$z-dropdown: 100;
$z-sticky: 200;
$z-fixed: 300;
$z-modal-backdrop: 400;
$z-modal: 500;
$z-tooltip: 600;
```

### 規則

- 所有魔術數字必須抽為變數
- 變數依類型分組並加註解
- 使用語意化命名（`$color-primary` 非 `$blue`）

---

## Mixin 與函式

### 常用 Mixin

```scss
// _mixins.scss

/// 響應式斷點 Mixin
/// @param {String} $breakpoint - 斷點名稱 (sm, md, lg, xl, 2xl)
@mixin respond-to($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: vars.$breakpoint-sm) {
      @content;
    }
  } @else if $breakpoint == md {
    @media (min-width: vars.$breakpoint-md) {
      @content;
    }
  } @else if $breakpoint == lg {
    @media (min-width: vars.$breakpoint-lg) {
      @content;
    }
  } @else if $breakpoint == xl {
    @media (min-width: vars.$breakpoint-xl) {
      @content;
    }
  } @else if $breakpoint == 2xl {
    @media (min-width: vars.$breakpoint-2xl) {
      @content;
    }
  }
}

/// Flex 置中
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/// 文字截斷（單行）
@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/// 文字截斷（多行）
/// @param {Number} $lines - 顯示行數
@mixin text-clamp($lines) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/// 視覺隱藏（保留無障礙存取）
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

---

## 巢狀規則

### 最大 3 層巢狀

```scss
// ✅ 好：扁平化結構
.nav {
  display: flex;

  &__item {
    padding: vars.$spacing-sm;
  }

  &__link {
    color: vars.$color-text;

    &:hover {
      color: vars.$color-primary;
    }
  }
}

// ❌ 差：過度巢狀
.nav {
  ul {
    li {
      a {
        span {
          // 太深了！
        }
      }
    }
  }
}
```

---

## 響應式斷點

### Mobile-First 模式

```scss
.hero {
  padding: vars.$spacing-md;
  font-size: vars.$font-size-base;

  @include mix.respond-to(md) {
    padding: vars.$spacing-xl;
    font-size: vars.$font-size-lg;
  }

  @include mix.respond-to(lg) {
    padding: vars.$spacing-2xl;
    font-size: vars.$font-size-xl;
  }
}
```

### 規則

- 採用 Mobile-First（`min-width`）
- 斷點寫在對應選擇器內部，不另開獨立區塊
- 使用 `respond-to` Mixin 保持一致性

---

## 程式風格

- 每個屬性獨立一行
- 屬性排序：定位 → 盒模型 → 字型 → 視覺效果 → 其它
- 選擇器之間空一行
- 避免使用 `!important`（僅限 utility class）
- 避免使用 ID 選擇器作為樣式 hook
- 顏色值使用變數，禁止寫入 magic number
