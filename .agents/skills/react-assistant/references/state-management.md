# Zustand 狀態管理

## 目錄

- [Store 建立](#store-建立)
- [Middleware](#middleware)
- [Selector 模式](#selector-模式)
- [Store 劃分策略](#store-劃分策略)
- [非同步操作](#非同步操作)
- [測試](#測試)

---

## Store 建立

### 基本 Store

```typescript
import { create } from "zustand";

/** 計數器狀態介面 */
interface CounterState {
  /** 計數值 */
  count: number;
  /** 增加計數 */
  increment: () => void;
  /** 減少計數 */
  decrement: () => void;
  /** 重設計數 */
  reset: () => void;
}

/** 計數器 Store */
export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

### 在元件中使用

```tsx
function Counter() {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

---

## Middleware

### persist — localStorage 持久化

```typescript
import { persist, createJSONStorage } from "zustand/middleware";

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "zh-TW",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

### devtools — Redux DevTools 整合

```typescript
import { devtools } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      login: (user) => set({ user }, false, "auth/login"),
      logout: () => set({ user: null }, false, "auth/logout"),
    }),
    { name: "AuthStore" },
  ),
);
```

### 組合多個 Middleware

```typescript
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        /* ... */
      }),
      { name: "app-storage" },
    ),
    { name: "AppStore" },
  ),
);
```

---

## Selector 模式

避免不必要的 re-render：

```tsx
// ❌ 訂閱整個 Store — 任何屬性變更都會 re-render
const store = useUserStore();

// ✅ 只訂閱需要的屬性
const userName = useUserStore((s) => s.name);
const updateName = useUserStore((s) => s.updateName);

// ✅ 多個屬性使用 shallow 比較
import { useShallow } from "zustand/react/shallow";

const { name, email } = useUserStore(
  useShallow((s) => ({ name: s.name, email: s.email })),
);
```

---

## Store 劃分策略

### 依業務領域劃分

```
stores/
├── theme.ts      ← 主題切換（isDark, toggle）
├── auth.ts       ← 認證狀態（user, login, logout）
├── ui.ts         ← UI 狀態（isSidebarOpen, activeModal）
└── cart.ts       ← 購物車（items, addItem, removeItem）
```

### 劃分原則

- **單一職責**：每個 Store 只管理一個業務領域
- **避免巢狀**：保持 Store 結構扁平
- **獨立 import**：不使用 barrel exports，直接引入各 store
- **Server State 不放 Zustand**：API 資料使用 TanStack Query

---

## 非同步操作

```typescript
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.login(credentials);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
```

---

## 測試

```typescript
import { useCounterStore } from "@/stores/counter";

describe("useCounterStore", () => {
  /** 每次測試前重設 Store */
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  it("應該正確增加計數", () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it("應該正確減少計數", () => {
    useCounterStore.setState({ count: 5 });
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(4);
  });
});
```
