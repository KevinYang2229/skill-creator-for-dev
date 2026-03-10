# 多頁面 → Vue Router 4

## 目錄

- [基本設定](#基本設定)
- [頁面轉換對照](#頁面轉換對照)
- [佈局 (Layout) 模式](#佈局-layout-模式)
- [動態路由](#動態路由)
- [導航轉換](#導航轉換)
- [SEO 與 Meta](#seo-與-meta)

---

## 基本設定

Vue Router 4 是 Vue 的官方路由解決方案。

### 路由宣告 (`src/router/index.ts`)

```typescript
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"), // 懶加載
    },
  ],
});

export default router;
```

---

## 頁面轉換對照

| 靜態站             | Vue Router 頁面元件           |
| ------------------ | ----------------------------- |
| `index.html`       | `views/HomeView.vue`          |
| `about.html`       | `views/AboutView.vue`         |
| `contact.html`     | `views/ContactView.vue`       |
| `blog/index.html`  | `views/blog/BlogListView.vue` |
| `blog/post-1.html` | `views/blog/BlogPostView.vue` |

### 轉換步驟

1. 將 HTML `<main>` 內容提取至對應的 `View.vue`。
2. 將 `<header>` / `<footer>` 移至 `App.vue` 或 Layout 元件。
3. `<a href="/about">` → `<RouterLink to="/about">`。

---

## 佈局 (Layout) 模式

### 方法一：直接在 App.vue (簡單結構)

```vue
<!-- App.vue -->
<template>
  <AppHeader />
  <RouterView />
  <!-- 頁面內容渲染點 -->
  <AppFooter />
</template>
```

### 方法二：巢狀路由 (複雜結構)

```typescript
{
  path: '/dashboard',
  component: () => import('@/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('@/views/DashboardHome.vue'),
    },
    {
      path: 'settings',
      component: () => import('@/views/Settings.vue'),
    }
  ]
}
```

---

## 動態路由

```typescript
{
  path: '/blog/:id',
  component: () => import('@/views/BlogPostView.vue'),
  props: true // 將 id 作為 props 傳入元件
}
```

在元件中取得：

```vue
<script setup>
const props = defineProps(["id"]);
// 或使用 useRoute()
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.params.id);
</script>
```

---

## 導航轉換

```vue
<!-- 聲明式 -->
<RouterLink to="/about" active-class="active">關於</RouterLink>

<!-- 程式化 -->
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goToProfile = () => {
  router.push({ name: "profile", params: { username: "john" } });
};
</script>
```

---

## SEO 與 Meta

可以使用 `vue-router` 的 `meta` 欄位搭配導航守衛，或使用 `@unhead/vue` (Nuxt 模式)。

```typescript
// 簡單做法：導航守衛
router.afterEach((to) => {
  const title = to.meta.title || "預設標題";
  document.title = `${title} - 我的 Vue App`;
});
```
