# TanStack Router 路由設計

## 目錄

- [基本設定](#基本設定)
- [路由檔案結構](#路由檔案結構)
- [巢狀路由與 Layout](#巢狀路由與-layout)
- [動態路由](#動態路由)
- [導航](#導航)
- [SEO Meta 標籤](#seo-meta-標籤)
- [Route Loader](#route-loader)

---

## 基本設定

TanStack Router 使用 file-based routing，由 `@tanstack/router-vite-plugin` 自動產生路由樹。

### 路由檔案放在 `src/routes/`

```
src/routes/
├── __root.tsx      ← 根 Layout（全站共用）
├── index.tsx       ← / (首頁)
├── about.tsx       ← /about
├── contact.tsx     ← /contact
└── blog/
    ├── index.tsx   ← /blog
    └── $postId.tsx ← /blog/:postId
```

---

## 路由檔案結構

每個路由檔案匯出 `Route` 常數：

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

/** 關於頁面 */
function AboutPage() {
  return <h1>關於我們</h1>;
}
```

---

## 巢狀路由與 Layout

### 根 Layout

```tsx
// routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main>
        <Outlet /> {/* 子路由渲染於此 */}
      </main>
      <Footer />
    </>
  ),
});
```

### Layout Route（無路徑 Layout）

以底線 `_` 開頭的檔名為 Layout Route，不產生 URL 路徑：

```
routes/
├── _dashboard.tsx          ← Layout（不產生 URL 路徑）
├── _dashboard/
│   ├── index.tsx           ← /dashboard
│   ├── settings.tsx        ← /dashboard/settings
│   └── analytics.tsx       ← /dashboard/analytics
```

```tsx
// routes/_dashboard.tsx
export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ),
});
```

---

## 動態路由

以 `$` 開頭的檔名為動態路由參數：

```tsx
// routes/blog/$postId.tsx
export const Route = createFileRoute("/blog/$postId")({
  component: BlogPost,
});

/** 部落格文章頁面 */
function BlogPost() {
  const { postId } = Route.useParams();
  return <article>文章 ID: {postId}</article>;
}
```

### Search Params（查詢參數）

使用 Zod 驗證查詢參數：

```tsx
import { z } from "zod";

const searchSchema = z.object({
  page: z.number().default(1),
  q: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  component: SearchPage,
});

/** 搜尋頁面 */
function SearchPage() {
  const { page, q } = Route.useSearch();
  return (
    <div>
      搜尋：{q}，第 {page} 頁
    </div>
  );
}
```

---

## 導航

### 宣告式導航

```tsx
import { Link } from "@tanstack/react-router";

<Link to="/about" className="nav-link" activeProps={{ className: "active" }}>
  關於
</Link>

<Link to="/" className="nav-link" activeOptions={{ exact: true }}>
  首頁
</Link>
```

### 程式化導航

```tsx
import { useNavigate } from "@tanstack/react-router";

function LoginForm() {
  const navigate = useNavigate();

  /** 登入成功後導航至 Dashboard */
  const handleLogin = async () => {
    await login();
    navigate({ to: "/dashboard" });
  };
}
```

---

## SEO Meta 標籤

使用 `head` 設定各路由的 Meta：

```tsx
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "關於我們 — 品牌名稱" },
      { name: "description", content: "了解我們的團隊與願景" },
      { property: "og:title", content: "關於我們" },
    ],
  }),
  component: AboutPage,
});
```

---

## Route Loader

在路由進入前預先載入資料：

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  loader: async () => {
    const stats = await fetchDashboardStats();
    return { stats };
  },
  component: DashboardPage,
});

/** Dashboard 頁面 */
function DashboardPage() {
  const { stats } = Route.useLoaderData();
  return <div>總用戶數：{stats.totalUsers}</div>;
}
```

### 搭配 TanStack Query

```tsx
export const Route = createFileRoute("/users")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(usersQueryOptions());
  },
  component: UsersPage,
});
```
