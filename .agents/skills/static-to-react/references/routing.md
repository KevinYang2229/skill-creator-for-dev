# 多頁面 → TanStack Router

## 目錄

- [基本設定](#基本設定)
- [頁面轉換對照](#頁面轉換對照)
- [巢狀路由與 Layout](#巢狀路由與-layout)
- [動態路由](#動態路由)
- [導航轉換](#導航轉換)
- [SEO Meta 標籤](#seo-meta-標籤)

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

### 路由檔案結構

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return <h1>關於我們</h1>;
}
```

---

## 頁面轉換對照

| 靜態站             | TanStack Router                  |
| ------------------ | -------------------------------- |
| `index.html`       | `routes/index.tsx`               |
| `about.html`       | `routes/about.tsx`               |
| `contact.html`     | `routes/contact.tsx`             |
| `blog/index.html`  | `routes/blog/index.tsx`          |
| `blog/post-1.html` | `routes/blog/$postId.tsx` (動態) |

### 轉換步驟

1. 將每個 HTML 頁面的 `<main>` 內容提取為 route 元件
2. 共用的 `<header>` / `<footer>` 移至 `__root.tsx`
3. `<a href="/about">` → `<Link to="/about">`
4. 移除重複的 HTML 骨架（`<html>`, `<head>`, `<body>`）

---

## 巢狀路由與 Layout

```tsx
// routes/__root.tsx — 全站共用
import { Outlet, Link } from "@tanstack/react-router";

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

```tsx
// routes/blog/$postId.tsx
export const Route = createFileRoute("/blog/$postId")({
  component: BlogPost,
});

function BlogPost() {
  const { postId } = Route.useParams();
  return <article>文章 ID: {postId}</article>;
}
```

### Search Params（查詢參數）

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

## 導航轉換

```html
<!-- 原始 HTML -->
<a href="/about" class="nav-link">關於</a>
<a href="/" class="nav-link active">首頁</a>
```

```tsx
import { Link } from '@tanstack/react-router';

<Link to="/about" className="nav-link" activeProps={{ className: 'active' }}>
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

  const handleLogin = async () => {
    await login();
    navigate({ to: "/dashboard" });
  };
}
```

---

## SEO Meta 標籤

在 TanStack Router 中使用 `meta` 與 `head` 設定：

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
