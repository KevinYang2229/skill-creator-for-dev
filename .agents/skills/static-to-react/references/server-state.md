# Server State → TanStack Query

## 目錄

- [基本概念](#基本概念)
- [useQuery — 資料查詢](#usequery--資料查詢)
- [useMutation — 資料變更](#usemutation--資料變更)
- [快取策略](#快取策略)
- [常見模式](#常見模式)

---

## 基本概念

靜態網站的 `fetch` 呼叫轉換為 TanStack Query，獲得：

- 自動快取與重新驗證
- Loading / Error 狀態管理
- 背景更新與樂觀更新
- 請求去重

### QueryClient 設定

已在 boilerplate 的 `main.tsx` 中配置，無需額外設定。

---

## useQuery — 資料查詢

```javascript
// ❌ 原始 vanilla JS
let users = [];
async function fetchUsers() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";
  try {
    const res = await fetch("/api/users");
    users = await res.json();
    renderUsers(users);
  } catch (err) {
    showError(err.message);
  } finally {
    loading.style.display = "none";
  }
}
fetchUsers();
```

```tsx
// ✅ TanStack Query
import { useQuery } from "@tanstack/react-query";

/** 取得所有使用者 */
function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("取得使用者失敗");
      return res.json() as Promise<User[]>;
    },
  });
}

function UserList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <p>載入中...</p>;
  if (error) return <p>錯誤：{error.message}</p>;

  return (
    <ul>
      {users?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### 帶參數查詢

```tsx
function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => fetch(`/api/users/${id}`).then((r) => r.json()),
    enabled: !!id, // id 存在時才發送請求
  });
}
```

---

## useMutation — 資料變更

```javascript
// ❌ 原始 vanilla JS
async function createUser(userData) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (res.ok) {
    fetchUsers(); // 重新載入列表
    showSuccess("新增成功");
  }
}
```

```tsx
// ✅ TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserInput) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("新增失敗");
      return res.json();
    },
    onSuccess: () => {
      // 使 users 快取失效 → 自動重新抓取
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

---

## 快取策略

### 常用設定

```tsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  staleTime: 1000 * 60 * 5, // 5 分鐘內不重新抓取
  gcTime: 1000 * 60 * 30, // 閒置 30 分鐘後清除快取
  refetchOnWindowFocus: true, // 視窗聚焦時重新抓取（預設）
  retry: 2, // 失敗重試次數
});
```

### 全域預設（已在 boilerplate 中設定）

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});
```

---

## 常見模式

### API Client 封裝

```typescript
// lib/api.ts
const API_BASE = import.meta.env.VITE_API_URL || "/api";

/** 通用 fetch 封裝 */
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
```

### Query Key Factory

```typescript
// lib/queryKeys.ts
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: Filters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};
```

### Optimistic Update

```tsx
useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] });
    const prev = queryClient.getQueryData(["todos"]);
    queryClient.setQueryData(["todos"], (old: Todo[]) =>
      old.map((t) => (t.id === newTodo.id ? { ...t, ...newTodo } : t)),
    );
    return { prev };
  },
  onError: (_err, _new, context) => {
    queryClient.setQueryData(["todos"], context?.prev);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});
```
