# Server State → TanStack Query (Vue)

## 目錄

- [基本概念](#基本概念)
- [useQuery — 資料查詢](#usequery--資料查詢)
- [useMutation — 資料變更](#usemutation--資料變更)
- [快取策略](#快取策略)

---

## 基本概念

Vue 版的 TanStack Query API 與 React 版幾乎相同，但在響應式整合上更符合 Vue 慣用方式。

### 註冊插件 (`main.ts`)

已在 boilerplate 的 `main.ts` 中配置：

```typescript
import { VueQueryPlugin } from "@tanstack/vue-query";
app.use(VueQueryPlugin);
```

---

## useQuery — 資料查詢

```vue
<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const {
  data: users,
  isLoading,
  error,
} = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    const res = await fetch("/api/users");
    return res.json();
  },
});
</script>

<template>
  <div v-if="isLoading">載入中...</div>
  <div v-else-if="error">發生錯誤</div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

### 帶參數與響應式式請求

在 Vue 中，如果 `queryKey` 包含一個 `ref`，當 `ref` 改變時，查詢會自動重新觸發。

```typescript
const userId = ref("1");

const { data } = useQuery({
  queryKey: ["users", userId], // 當 userId 變更，Query 自動刷新
  queryFn: () => fetchUser(userId.value),
});
```

---

## useMutation — 資料變更

```vue
<script setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient();

const { mutate, isPending } = useMutation({
  mutationFn: (newUserData) => postUser(newUserData),
  onSuccess: () => {
    // 使快取失效並重新抓取
    queryClient.invalidateQueries({ queryKey: ["users"] });
  },
});

const handleSave = () => {
  mutate({ name: "Vue User" });
};
</script>
```

---

## 快取策略

與 React 版相同：

- `staleTime`: 資料多久後變舊 (不觸發背景刷新)。
- `gcTime`: 閒置資料在記憶體保留時間。

```typescript
useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  staleTime: 1000 * 60 * 5, // 5 分鐘
});
```
