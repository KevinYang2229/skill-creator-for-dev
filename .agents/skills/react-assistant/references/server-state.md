# TanStack Query Server State 管理

## 目錄

- [基本查詢](#基本查詢)
- [Mutation](#mutation)
- [快取策略](#快取策略)
- [樂觀更新](#樂觀更新)
- [Infinite Query](#infinite-query)
- [Prefetch](#prefetch)
- [API Client 封裝](#api-client-封裝)

---

## 基本查詢

### Query Options Factory

將查詢選項集中管理：

```typescript
// lib/queries/users.ts
import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";

/** 使用者列表查詢選項 */
export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: () => api.get<User[]>("/users"),
  });

/** 單一使用者查詢選項 */
export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["users", userId],
    queryFn: () => api.get<User>(`/users/${userId}`),
    enabled: !!userId,
  });
```

### 在元件中使用

```tsx
import { useQuery } from "@tanstack/react-query";
import { usersQueryOptions } from "@/lib/queries/users";

/** 使用者列表元件 */
function UserList() {
  const { data: users, isLoading, error } = useQuery(usersQueryOptions());

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Mutation

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

/** 建立使用者 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => api.post<User>("/users", data),
    onSuccess: () => {
      // 使快取失效，觸發重新查詢
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

使用方式：

```tsx
function CreateUserForm() {
  const { mutate, isPending } = useCreateUser();

  const handleSubmit = (data: CreateUserInput) => {
    mutate(data, {
      onSuccess: () => toast.success("建立成功"),
      onError: (error) => toast.error(error.message),
    });
  };
}
```

---

## 快取策略

### QueryClient 全域設定

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 分鐘內不重新取得
      gcTime: 1000 * 60 * 30, // 30 分鐘後垃圾回收
      retry: 1, // 失敗重試 1 次
      refetchOnWindowFocus: false, // 視窗聚焦不重新取得
    },
  },
});
```

### 個別查詢覆寫

```typescript
export const dashboardQueryOptions = () =>
  queryOptions({
    queryKey: ["dashboard"],
    queryFn: () => api.get("/dashboard"),
    staleTime: 1000 * 30, // 30 秒（需要更即時）
    refetchInterval: 1000 * 60, // 每分鐘自動重取
  });
```

---

## 樂觀更新

```typescript
export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => api.patch(`/todos/${todoId}/toggle`),
    onMutate: async (todoId) => {
      // 取消進行中的查詢
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // 儲存前一個快照
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      // 樂觀更新 UI
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((todo) =>
          todo.id === todoId ? { ...todo, done: !todo.done } : todo,
        ),
      );

      return { previousTodos };
    },
    onError: (_err, _todoId, context) => {
      // 失敗時回復快取
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      // 完成後重新驗證
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
```

---

## Infinite Query

```typescript
import { useInfiniteQuery } from "@tanstack/react-query";

/** 無限捲動文章列表 */
export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      api.get<PaginatedResponse<Post>>(`/posts?cursor=${pageParam}`),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
```

使用方式：

```tsx
function PostFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  return (
    <>
      {data?.pages.flatMap((page) =>
        page.items.map((post) => <PostCard key={post.id} post={post} />),
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "載入中..." : "載入更多"}
        </button>
      )}
    </>
  );
}
```

---

## Prefetch

### Route Loader 中預取

```tsx
export const Route = createFileRoute("/users/$userId")({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(userQueryOptions(params.userId));
  },
  component: UserDetailPage,
});
```

### Hover 預取

```tsx
function UserLink({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  return (
    <Link
      to="/users/$userId"
      params={{ userId }}
      onMouseEnter={() => {
        queryClient.prefetchQuery(userQueryOptions(userId));
      }}
    >
      {children}
    </Link>
  );
}
```

---

## API Client 封裝

```typescript
// lib/api.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

/** API 錯誤 */
class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** 通用 API Client */
export const api = {
  /** GET 請求 */
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  },

  /** POST 請求 */
  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  },

  /** PATCH 請求 */
  async patch<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new ApiError(res.status, await res.text());
    return res.json();
  },

  /** DELETE 請求 */
  async delete(path: string): Promise<void> {
    const res = await fetch(`${BASE_URL}${path}`, { method: "DELETE" });
    if (!res.ok) throw new ApiError(res.status, await res.text());
  },
};
```
