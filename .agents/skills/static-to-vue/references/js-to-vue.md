# Vanilla JS → Vue 3 Composition API

## 目錄

- [DOM 操作 → 宣告式渲染](#dom-操作--宣告式渲染)
- [Event Listeners → 事件處理](#event-listeners--事件處理)
- [querySelector → Template Ref](#queryselector--template-ref)
- [全域變數 → reactive / Pinia](#全域變數--reactive--pinia)
- [非同步操作 → 生命周期與 Watch](#非同步操作--生命週期與-watch)

---

## DOM 操作 → 宣告式渲染

### 直接操作 DOM → Ref 驅動

```javascript
// ❌ 原始 vanilla JS
let count = 0;
document.getElementById("btn").addEventListener("click", () => {
  count++;
  document.getElementById("counter").textContent = count;
});
```

```vue
<!-- ✅ Vue 3 -->
<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>

<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count++">+1</button>
  </div>
</template>
```

### classList 操作 → :class 綁定

```javascript
// ❌ vanilla JS
element.classList.toggle("active", isActive);
```

```vue
<!-- ✅ Vue 3 -->
<div :class="{ active: isActive }" />
```

---

## Event Listeners → 事件處理

### addEventListener → @ 語法

```javascript
// ❌ vanilla JS
element.addEventListener("click", handleClick);
window.addEventListener("resize", handleResize);
```

```vue
<!-- ✅ Vue 3 — 元素事件 -->
<button @click="handleClick">Click</button>

<!-- ✅ Vue 3 — 全域事件用 onMounted/onUnmounted -->
<script setup>
import { onMounted, onUnmounted } from "vue";

const handleResize = () => {
  /* ... */
};

onMounted(() => window.addEventListener("resize", handleResize));
onUnmounted(() => window.removeEventListener("resize", handleResize));
</script>
```

---

## querySelector → Template Ref

```javascript
// ❌ vanilla JS
const input = document.querySelector("#search-input");
input.focus();
```

```vue
<!-- ✅ Vue 3 -->
<script setup>
import { ref, onMounted } from "vue";

const inputRef = (ref < HTMLInputElement) | (null > null);

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <input ref="inputRef" />
</template>
```

---

## 全域變數 → reactive / Pinia

### 區域變數 → ref / reactive

```javascript
// ❌ vanilla JS
let isMenuOpen = false;
function toggleMenu() {
  isMenuOpen = !isMenuOpen;
}
```

```vue
<!-- ✅ Vue 3 -->
<script setup>
import { ref } from "vue";
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>
```

### 跨元件共享 → Pinia

見 `state-management.md`。

---

## 非同步操作 → 生命週期與 Watch

### fetch → onMounted / TanStack Query

```javascript
// ❌ vanilla JS
async function loadData() {
  const data = await fetch("/api/data").then((r) => r.json());
  render(data);
}
loadData();
```

```vue
<!-- ✅ Vue 3 + TanStack Query (見 server-state.md) -->
<script setup>
import { useQuery } from "@tanstack/vue-query";

const { data, isLoading } = useQuery({
  queryKey: ["data"],
  queryFn: () => fetch("/api/data").then((r) => r.json()),
});
</script>
```

### 監聽資料變化 → watch

```vue
<script setup>
import { ref, watch } from "vue";

const search = ref("");
watch(search, (newValue, oldValue) => {
  console.log(`搜尋關鍵字從 ${oldValue} 變更為 ${newValue}`);
});
</script>
```

---

## 常用 Composables 模式 (自訂 Hooks)

### useIntersectionObserver

```typescript
import { ref, onMounted, onUnmounted } from "vue";

export function useIntersectionObserver(targetRef: Ref<HTMLElement | null>) {
  const isVisible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      isVisible.value = entry.isIntersecting;
    });
    if (targetRef.value) observer.observe(targetRef.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return { isVisible };
}
```
