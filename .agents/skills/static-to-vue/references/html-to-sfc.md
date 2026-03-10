# HTML → Vue SFC 元件拆分

## 目錄

- [語法差異對照表](#語法差異對照表)
- [元件拆分策略](#元件拆分策略)
- [BEM → Props 映射](#bem--props-映射)
- [靜態資源遷移](#靜態資源遷移)
- [常見陷阱](#常見陷阱)

---

## 語法差異對照表

| HTML                 | Vue SFC (Composition API)   | 說明                            |
| -------------------- | --------------------------- | ------------------------------- |
| `class="..."`        | `:class="..."` 或 `class`   | 響應式屬性需加 `:` 或 `v-bind:` |
| `onclick="fn()"`     | `@click="fn"`               | 事件縮寫語法                    |
| `style="color: red"` | `:style="{ color: 'red' }"` | 物件語法                        |
| `<!-- 註解 -->`      | `<!-- 註解 -->`             | 模板內使用標準 HTML 註解        |
| `<img>`              | `<img />`                   | 建議自閉合                      |
| `value="text"`       | `v-model="text"`            | 雙向綁定                        |
| `checked`            | `v-model="checked"`         | 雙向綁定 checkbox               |
| `innerHTML`          | `v-html="content"`          | ⚠️ 需注意 XSS                   |

### 布林屬性

```vue
<!-- HTML: <button disabled> -->
<!-- Vue: -->
<button :disabled="isDisabled">送出</button>
```

---

## 元件拆分策略

### 步驟一：識別語意區塊

靜態 HTML 中的語意標記對應為 Vue SFC (`.vue`)：

```html
<!-- 原始 HTML -->
<header class="header">
  <nav class="header__nav">...</nav>
</header>
```

```vue
<!-- → AppHeader.vue -->
<script setup lang="ts">
// 邏輯放置處
</script>

<template>
  <header class="header">
    <nav class="header__nav">...</nav>
  </header>
</template>

<style scoped>
/* 樣式放置處 */
</style>
```

### 步驟二：依重複性與獨立性拆分

| 判斷條件                | 行動           |
| ----------------------- | -------------- |
| 出現 2 次以上的相同結構 | 抽取為共用元件 |
| 具備獨立互動邏輯        | 抽取為獨立元件 |
| 結構超過 50 行          | 考慮拆分子元件 |

### 步驟三：決定元件層級

```
App.vue (根)
├── AppHeader （佈局元件 → components/layout/）
├── RouterView （路由入口）
│   ├── HomeView （頁面元件 → views/）
│   │   ├── FeatureGrid
│   │   │   └── FeatureCard （共用元件 → components/ui/）
└── AppFooter （佈局元件 → components/layout/）
```

---

## BEM → Props 映射

### Modifier → Props

```html
<!-- BEM modifier -->
<button class="btn btn--primary btn--large">送出</button>
```

```vue
<!-- AppButton.vue -->
<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "medium",
});
</script>

<template>
  <button :class="['btn', `btn--${variant}`, `btn--${size}`]">
    <slot />
  </button>
</template>
```

---

## 靜態資源遷移

### 圖片

```vue
<!-- 方式一：public/ 目錄 -->
<img src="/images/hero.jpg" alt="Hero" />

<!-- 方式二：assets/ 目錄 (經 Vite 處理) -->
<script setup lang="ts">
import heroImg from "@/assets/images/hero.jpg";
</script>

<template>
  <img :src="heroImg" alt="Hero" />
</template>
```

### SVG

```vue
<!-- 使用 vite-svg-loader (推薦) -->
<script setup lang="ts">
import CloseIcon from "@/assets/icons/close.svg?component";
</script>

<template>
  <CloseIcon class="size-5 text-current" />
</template>
```

---

## 常見陷阱

### 單一根元素需求

Vue 3 支援多個根元素 (Fragments)，但為了樣式繼承 (Style Inheritence) 與 `scoped`，建議保持一個根元素或注意屬性透傳。

### 條件渲染

```vue
<!-- 取代 HTML 中的 display:none -->
<div v-if="isVisible">內容</div>

<!-- 三元運算子對照 -->
<Dashboard v-if="isLoggedIn" />
<LoginForm v-else />
```

### 列表渲染

```vue
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>
```
