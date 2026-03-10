# CSS/SASS → Vue CSS 方案轉換

## 目錄

- [方案選擇決策樹](#方案選擇決策樹)
- [Tailwind CSS v4（預設）](#tailwind-css-v4預設)
- [Vue Scoped Styles（SFC 內建）](#vue-scoped-styles-sfc-內建)
- [CSS Modules](#css-modules)

---

## 方案選擇決策樹

```
來源專案使用什麼 CSS 方案？
├── 使用者指定 Tailwind → Tailwind CSS v4
├── 使用者指定 SASS → SASS (搭配 Scoped Styles)
└── 未指定 → 預設使用 Tailwind CSS v4
```

---

## Tailwind CSS v4（預設）

### BEM → Tailwind 對照

```vue
<!-- 原始 BEM -->
<div class="card card--featured">
  <h3 class="card__title">標題</h3>
</div>

<!-- Tailwind (Vue SFC) -->
<template>
  <div
    :class="[
      'flex flex-col rounded-lg p-6 shadow-md',
      { 'border-2 border-blue-500': featured },
    ]"
  >
    <h3 class="mb-2 text-xl font-bold">{{ title }}</h3>
  </div>
</template>
```

### 響應式與深色模式

```vue
<!-- Mobile First + Dark Mode -->
<div class="p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

---

## Vue Scoped Styles（SFC 內建）

這是將現有 CSS/SASS 遷移最快的方式。

### 安裝 SASS 支援

```bash
npm install -D sass
```

### 遷移步驟

```vue
<!-- AppCard.vue -->
<template>
  <div class="card" :class="{ 'card--featured': featured }">
    <h3 class="card__title">{{ title }}</h3>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &--featured {
    border: 2px solid #3b82f6;
  }
}
</style>
```

---

## CSS Modules

Vue SFC 也原生支援 CSS Modules。

### 使用方式

```vue
<template>
  <div :class="[$style.card, { [$style['card--featured']]: featured }]">
    <h3 :class="$style.title">{{ title }}</h3>
  </div>
</template>

<style module lang="scss">
.card {
  padding: 1.5rem;
  .title {
    font-size: 1.25rem;
  }
}
.card--featured {
  border: 1px solid blue;
}
</style>
```

---

## CSS 變數與主題

```css
/* index.css */
:root {
  --color-primary: #3b82f6;
  --color-bg: #ffffff;
}

.dark {
  --color-primary: #60a5fa;
  --color-bg: #0a0a0a;
}
```

在 Vue 中使用：

```vue
<style scoped>
.header {
  background-color: var(--color-bg);
  color: var(--color-primary);
}
</style>
```

### v-bind in CSS (Vue 特有電力)

```vue
<script setup>
const color = ref("red");
</script>

<template>
  <div class="text">文字</div>
</template>

<style scoped>
.text {
  color: v-bind(color);
}
</style>
```
