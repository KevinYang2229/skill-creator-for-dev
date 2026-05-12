# 元件設計模式

## 目錄

- [元件分類](#元件分類)
- [Props 型別設計](#props-型別設計)
- [組合模式](#組合模式)
- [Custom Hooks 拆分](#custom-hooks-拆分)
- [效能優化](#效能優化)
- [錯誤邊界](#錯誤邊界)

---

## 元件分類

### UI 元件（Presentational）

純展示元件，不包含業務邏輯，放在 `components/ui/`：

```tsx
interface ButtonProps {
  /** 按鈕變體 */
  variant?: "primary" | "secondary" | "ghost";
  /** 按鈕尺寸 */
  size?: "sm" | "md" | "lg";
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children: React.ReactNode;
  /** 點擊事件 */
  onClick?: () => void;
}

/** 基礎按鈕元件 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors";
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100",
    ghost:
      "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Layout 元件

頁面佈局結構，放在 `components/layout/`：

```tsx
interface PageLayoutProps {
  /** 頁面標題 */
  title: string;
  /** 子元素 */
  children: React.ReactNode;
}

/** 標準頁面佈局 */
export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
```

### Feature 元件

包含業務邏輯的功能元件，直接放在路由檔案中或 `components/` 下按功能分組：

```tsx
/** 使用者資料卡片（含資料取得邏輯） */
function UserProfileCard({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading) return <Skeleton />;
  if (!user) return null;

  return (
    <Card>
      <Avatar src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </Card>
  );
}
```

---

## Props 型別設計

### 基本原則

```tsx
// ✅ 使用 interface，命名為 ComponentNameProps
interface CardProps {
  /** 卡片標題 */
  title: string;
  /** 子元素 */
  children: React.ReactNode;
}

// ✅ 擴充原生 HTML 元素 Props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 錯誤訊息 */
  error?: string;
  /** 輸入欄位標籤 */
  label: string;
}

// ✅ 使用 Discriminated Union 處理多態
type AlertProps =
  | { variant: "success"; onDismiss: () => void }
  | { variant: "error"; retryAction: () => void }
  | { variant: "info" };
```

### Ref 轉發

```tsx
import { forwardRef } from "react";

/** 可轉發 Ref 的 Input 元件 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => (
    <div>
      <label>{label}</label>
      <input ref={ref} {...rest} />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  ),
);
Input.displayName = "Input";
```

---

## 組合模式

### 複合元件（Compound Components）

```tsx
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/** Tabs 容器 */
function Tabs({
  defaultTab,
  children,
}: {
  defaultTab: string;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

/** Tab 觸發按鈕 */
function TabTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      className={ctx.activeTab === value ? "border-b-2 border-blue-500" : ""}
      onClick={() => ctx.setActiveTab(value)}
    >
      {children}
    </button>
  );
}

/** Tab 內容面板 */
function TabContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = useContext(TabsContext)!;
  return ctx.activeTab === value ? <div>{children}</div> : null;
}

Tabs.Trigger = TabTrigger;
Tabs.Content = TabContent;
```

使用方式：

```tsx
<Tabs defaultTab="profile">
  <Tabs.Trigger value="profile">個人資料</Tabs.Trigger>
  <Tabs.Trigger value="settings">設定</Tabs.Trigger>
  <Tabs.Content value="profile">
    <ProfileForm />
  </Tabs.Content>
  <Tabs.Content value="settings">
    <SettingsForm />
  </Tabs.Content>
</Tabs>
```

---

## Custom Hooks 拆分

將邏輯從元件中抽離，放在 `hooks/`：

```tsx
// hooks/useMediaQuery.ts

/** 監聽 CSS 媒體查詢 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
```

### Hook 設計原則

- 以 `use` 前綴命名
- 單一職責：一個 Hook 只做一件事
- 回傳值優先使用物件（非陣列），方便解構
- 參數超過 2 個時使用 Options 物件

---

## 效能優化

### React.memo

對純展示元件且 Props 不常變動時使用：

```tsx
const ExpensiveList = memo(function ExpensiveList({
  items,
}: {
  items: Item[];
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});
```

### React.lazy + Suspense

延遲載入頁面級元件：

```tsx
const AdminPanel = lazy(() => import("@/components/AdminPanel"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AdminPanel />
    </Suspense>
  );
}
```

### useMemo / useCallback

```tsx
// ✅ 計算成本高的衍生值
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items],
);

// ✅ 傳給子元件的穩定回呼
const handleSubmit = useCallback(
  (data: FormData) => {
    submitForm(data);
  },
  [submitForm],
);
```

---

## 錯誤邊界

```tsx
import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  /** 備援 UI */
  fallback: ReactNode;
  /** 子元素 */
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** 錯誤邊界元件 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary 捕獲錯誤:", error, info);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
```
