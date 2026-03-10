# 狀態管理 → Zustand

## 目錄

- [何時使用 Zustand](#何時使用-zustand)
- [基本 Store 建立](#基本-store-建立)
- [Slice Pattern](#slice-pattern)
- [Persist Middleware](#persist-middleware)
- [與 React Context 的差異](#與-react-context-的差異)
- [最佳實踐](#最佳實踐)

---

## 何時使用 Zustand

| 狀態類型               | 方案                                   |
| ---------------------- | -------------------------------------- |
| 元件內部狀態           | `useState`                             |
| 父子元件共享           | Props 傳遞                             |
| 跨多元件共享的 UI 狀態 | Zustand                                |
| 全域使用者/認證狀態    | Zustand + persist                      |
| 伺服器資料（API 回應） | TanStack Query（見 `server-state.md`） |
| 表單狀態               | React Hook Form（見 `forms.md`）       |

---

## 基本 Store 建立

```javascript
// ❌ 原始 vanilla JS — 全域狀態
const appState = {
  sidebarOpen: false,
  notifications: [],
};

function toggleSidebar() {
  appState.sidebarOpen = !appState.sidebarOpen;
  document.querySelector(".sidebar").classList.toggle("open");
}
```

```typescript
// ✅ Zustand store
import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  notifications: [],
  addNotification: (n) =>
    set((s) => ({ notifications: [...s.notifications, n] })),
  removeNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
}));
```

### 在元件中使用

```tsx
function Sidebar() {
  // 選擇性訂閱 — 僅在 sidebarOpen 變化時重新渲染
  const isOpen = useUIStore((s) => s.sidebarOpen);
  return <aside className={isOpen ? "open" : ""}>...</aside>;
}

function ToggleButton() {
  const toggle = useUIStore((s) => s.toggleSidebar);
  return <button onClick={toggle}>☰</button>;
}
```

---

## Slice Pattern

大型應用將 store 拆分為多個 slice：

```typescript
// stores/auth.ts
interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthSlice>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

```typescript
// stores/cart.ts
interface CartSlice {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

export const useCartStore = create<CartSlice>((set, get) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));
```

---

## Persist Middleware

```typescript
import { persist } from "zustand/middleware";

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "zh-TW",
      fontSize: 16,
      setLanguage: (lang) => set({ language: lang }),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "settings-storage", // localStorage key
      partialize: (state) => ({
        language: state.language,
        fontSize: state.fontSize,
      }), // 僅持久化部分狀態
    },
  ),
);
```

---

## 與 React Context 的差異

| 面向       | Zustand                     | React Context                      |
| ---------- | --------------------------- | ---------------------------------- |
| 重新渲染   | 選擇性訂閱，精準更新        | 任何 value 變化都觸發全部 consumer |
| 樣板碼     | 極少                        | 需要 Provider + Context + Hook     |
| DevTools   | 支援                        | 需自行實作                         |
| Middleware | persist, devtools, immer... | 無                                 |
| 適用場景   | 中大型共享狀態              | 依賴注入、極簡共享                 |

---

## 最佳實踐

1. **選擇性訂閱**：永遠使用 selector 而非整個 store

```tsx
// ✅ 僅訂閱需要的欄位
const count = useStore((s) => s.count);

// ❌ 訂閱整個 store — 任何改變都觸發重新渲染
const store = useStore();
```

2. **Action 與 State 分離命名**：state 用名詞，action 用動詞
3. **一個 Store 一個領域**：避免巨大的單一 store
4. **衍生值用 `get()`**：在 store 內計算衍生值
