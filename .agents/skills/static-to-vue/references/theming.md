# 深淺色主題系統遷移

## 目錄

- [策略總覽](#策略總覽)
- [Tailwind dark mode（預設）](#tailwind-dark-mode預設)
- [Pinia Theme Store](#pinia-theme-store)
- [CSS Custom Properties 遷移](#css-custom-properties-遷移)
- [系統偏好偵測](#系統偏好偵測)

---

## 策略總覽

| 來源機制               | 目標機制                               |
| ---------------------- | -------------------------------------- |
| `data-theme` 屬性切換  | `dark` class 切換（Tailwind）          |
| SASS 變數 + mixin      | CSS custom properties + `dark:` prefix |
| JS `classList.toggle`  | Pinia store + `watchEffect`            |
| `prefers-color-scheme` | Pinia 初始化 + 媒體查詢監聽            |

---

## Tailwind dark mode（預設）

Tailwind v4 使用 class 策略（`dark` class on `<html>`）：

### 樣式轉換

```vue
<!-- Tailwind dark mode -->
<div class="bg-white text-gray-900 shadow-md dark:bg-gray-900 dark:text-gray-100 dark:shadow-lg">
```

### 常見明暗色對照

| 用途 | Light             | Dark                   |
| ---- | ----------------- | ---------------------- |
| 背景 | `bg-white`        | `dark:bg-gray-950`     |
| 文字 | `text-gray-900`   | `dark:text-gray-100`   |
| 邊框 | `border-gray-200` | `dark:border-gray-700` |

---

## Pinia Theme Store

Boilerplate 已包含 `stores/theme.ts`：

```typescript
import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore(
  "theme",
  () => {
    const isDark = ref(false);

    function toggle() {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle("dark", isDark.value);
    }

    function setDark(val: boolean) {
      isDark.value = val;
      document.documentElement.classList.toggle("dark", val);
    }

    return { isDark, toggle, setDark };
  },
  {
    persist: true,
  },
);
```

---

## CSS Custom Properties 遷移

```css
/* index.css */
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
}

.dark {
  --color-bg: #0a0a0a;
  --color-text: #f5f5f5;
}
```

在 Vue 元件使用：

```vue
<style scoped>
.card {
  background-color: var(--color-bg);
  color: var(--color-text);
}
</style>
```

---

## 系統偏好偵測

### 在 App.vue 中初始化與監聽

```vue
<script setup>
import { onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

onMounted(() => {
  // 監聽系統主題變化
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", (e) => themeStore.setDark(e.matches));

  // 初始化 (如果 localStorage 無資料)
  if (localStorage.getItem("theme") === null) {
    themeStore.setDark(mql.matches);
  }
});
</script>
```
