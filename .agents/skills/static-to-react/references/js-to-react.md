# Vanilla JS → React Hooks / 狀態管理

## 目錄

- [DOM 操作 → 宣告式渲染](#dom-操作--宣告式渲染)
- [Event Listeners → 事件處理](#event-listeners--事件處理)
- [querySelector → useRef](#queryselector--useref)
- [全域變數 → useState / Zustand](#全域變數--usestate--zustand)
- [非同步操作 → Hooks](#非同步操作--hooks)
- [常見模式轉換](#常見模式轉換)

---

## DOM 操作 → 宣告式渲染

### 直接操作 DOM → State 驅動

```javascript
// ❌ 原始 vanilla JS
const counter = document.getElementById("counter");
let count = 0;
document.getElementById("btn").addEventListener("click", () => {
  count++;
  counter.textContent = count;
});
```

```tsx
// ✅ React
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}
```

### classList 操作 → 條件 className

```javascript
// ❌ vanilla JS
element.classList.toggle("active");
element.classList.add("visible");
```

```tsx
// ✅ React
const [isActive, setIsActive] = useState(false);
<div className={isActive ? "active" : ""} />;
```

---

## Event Listeners → 事件處理

### addEventListener → JSX 事件屬性

```javascript
// ❌ vanilla JS
document.getElementById("btn").addEventListener("click", handleClick);
window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll);
```

```tsx
// ✅ React — 元素事件
<button onClick={handleClick}>Click</button>;

// ✅ React — 全域事件用 useEffect
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

### 事件委派 → 直接綁定

```javascript
// ❌ vanilla JS — 事件委派
document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.matches(".list-item")) {
    handleItemClick(e.target.dataset.id);
  }
});
```

```tsx
// ✅ React — 直接在元素上綁定
{
  items.map((item) => (
    <li key={item.id} onClick={() => handleItemClick(item.id)}>
      {item.name}
    </li>
  ));
}
```

---

## querySelector → useRef

```javascript
// ❌ vanilla JS
const input = document.querySelector("#search-input");
input.focus();
input.value = "";
```

```tsx
// ✅ React
const inputRef = useRef<HTMLInputElement>(null);

const handleReset = () => {
  inputRef.current?.focus();
  // value 透過 state 控制，非直接操作 DOM
};

<input
  ref={inputRef}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>;
```

---

## 全域變數 → useState / Zustand

### 區域變數 → useState

```javascript
// ❌ vanilla JS
let isMenuOpen = false;
function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  menuElement.classList.toggle("open", isMenuOpen);
}
```

```tsx
// ✅ React — 區域狀態
const [isMenuOpen, setIsMenuOpen] = useState(false);
<nav className={isMenuOpen ? "open" : ""}>
  <button onClick={() => setIsMenuOpen((prev) => !prev)}>Menu</button>
</nav>;
```

### 跨元件共享 → Zustand

```javascript
// ❌ vanilla JS — 全域變數
window.appState = { user: null, theme: "light" };
```

```tsx
// ✅ Zustand store → 見 state-management.md
import { useAuthStore } from "@/stores/auth";

function UserInfo() {
  const user = useAuthStore((s) => s.user);
  return <span>{user?.name}</span>;
}
```

---

## 非同步操作 → Hooks

### fetch → TanStack Query

```javascript
// ❌ vanilla JS
async function loadUsers() {
  const res = await fetch("/api/users");
  const data = await res.json();
  renderUsers(data);
}
loadUsers();
```

```tsx
// ✅ TanStack Query → 見 server-state.md
function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((r) => r.json()),
  });

  if (isLoading) return <p>載入中...</p>;
  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### setInterval / setTimeout → useEffect

```javascript
// ❌ vanilla JS
setInterval(updateClock, 1000);
```

```tsx
// ✅ React
useEffect(() => {
  const id = setInterval(updateClock, 1000);
  return () => clearInterval(id); // 清理！
}, []);
```

---

## 常見模式轉換

### IntersectionObserver

```tsx
function useIntersectionObserver(ref: RefObject<Element>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}
```

### localStorage 讀寫

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

### Media Query

```tsx
function useMediaQuery(query: string) {
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
