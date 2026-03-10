# 狀態管理 → Pinia

## 目錄

- [何時使用 Pinia](#何時使用-pinia)
- [基本 Store 建立 (Setup Store)](#基本-store-建立-setup-store)
- [在元件中使用](#在元件中使用)
- [持久化 (Persist)](#持久化-persist)
- [與 React Zustand 的對照](#與-react-zustand-的對照)

---

## 何時使用 Pinia

| 狀態類型              | 方案                   |
| --------------------- | ---------------------- |
| 元件內部狀態          | `ref()` / `reactive()` |
| 父子元件共享          | Props / Emit           |
| 跨元件共享的 UI 狀態  | Pinia                  |
| 全域使用者/認證狀態   | Pinia + persist        |
| 伺服器資料 (API 回應) | TanStack Query (Vue)   |

---

## 基本 Store 建立 (Setup Store)

Vue 3 推薦使用 Setup 語法定義 Store，這與 Composition API 風格一致。

```typescript
// stores/ui.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUIStore = defineStore("ui", () => {
  // State
  const sidebarOpen = ref(false);
  const notifications = ref<string[]>([]);

  // Getters (computed)
  const notificationCount = computed(() => notifications.value.length);

  // Actions (functions)
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function addNotification(msg: string) {
    notifications.value.push(msg);
  }

  return {
    sidebarOpen,
    notifications,
    notificationCount,
    toggleSidebar,
    addNotification,
  };
});
```

---

## 在元件中使用

```vue
<script setup>
import { useUIStore } from "@/stores/ui";
import { storeToRefs } from "pinia";

const uiStore = useUIStore();

// 💡 解構時需使用 storeToRefs 以保持響應性
const { sidebarOpen, notificationCount } = storeToRefs(uiStore);

// Action 可以直接解構
const { toggleSidebar } = uiStore;
</script>

<template>
  <div>
    <button @click="toggleSidebar">切換 Sidebar</button>
    <p v-if="sidebarOpen">Sidebar 已開啟</p>
    <span>提醒數量: {{ notificationCount }}</span>
  </div>
</template>
```

---

## 持久化 (Persist)

使用 `pinia-plugin-persistedstate` 插件。

```typescript
// stores/settings.ts
export const useSettingsStore = defineStore(
  "settings",
  () => {
    const language = ref("zh-TW");
    return { language };
  },
  {
    persist: true, // 啟用持久化
  },
);
```

---

## 與 React Zustand 的對照

| 功能     | Zustand (React)               | Pinia (Vue)                            |
| -------- | ----------------------------- | -------------------------------------- |
| 定義方式 | `create((set) => ({ ... }))`  | `defineStore('id', () => { ... })`     |
| 狀態存取 | `useStore(s => s.count)`      | `const { count } = storeToRefs(store)` |
| 修改方式 | 需要透過 `set()` 或 `actions` | 直接修改 `.value` 或調用 actions       |
| 響應式   | 訂閱制                        | 基於 Vue 3 響應式系統 (Proxy)          |
| 持久化   | `persist` middleware          | `persistedstate` plugin                |
