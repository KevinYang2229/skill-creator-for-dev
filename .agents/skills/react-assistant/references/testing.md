# 測試規範（Vitest + Playwright）

## 目錄

- [測試策略](#測試策略)
- [Vitest 單元測試](#vitest-單元測試)
- [元件測試](#元件測試)
- [Hook 測試](#hook-測試)
- [Mock 技巧](#mock-技巧)
- [Playwright E2E 測試](#playwright-e2e-測試)

---

## 測試策略

| 層級     | 工具                       | 目標                  |
| -------- | -------------------------- | --------------------- |
| 單元測試 | Vitest                     | 工具函式、Store、邏輯 |
| 元件測試 | Vitest + React Testing Lib | UI 元件行為           |
| E2E 測試 | Playwright                 | 完整使用者流程        |

### 檔案命名

```
Button.tsx       → Button.test.tsx（同目錄）
useAuth.ts       → useAuth.test.ts（同目錄）
e2e/             → login.spec.ts（獨立目錄）
```

---

## Vitest 單元測試

### 工具函式測試

```typescript
// lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { formatCurrency, truncate } from "./utils";

describe("formatCurrency", () => {
  it("應正確格式化新台幣", () => {
    expect(formatCurrency(1234)).toBe("NT$ 1,234");
  });

  it("應處理零值", () => {
    expect(formatCurrency(0)).toBe("NT$ 0");
  });
});

describe("truncate", () => {
  it("超過長度應截斷並加省略號", () => {
    expect(truncate("這是一段很長的文字", 5)).toBe("這是一段很...");
  });

  it("未超過長度應原樣返回", () => {
    expect(truncate("短文字", 10)).toBe("短文字");
  });
});
```

### Zustand Store 測試

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { useCounterStore } from "@/stores/counter";

describe("useCounterStore", () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  it("increment 應增加計數", () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });
});
```

---

## 元件測試

```tsx
// components/ui/Button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("應渲染按鈕文字", () => {
    render(<Button>送出</Button>);
    expect(screen.getByRole("button", { name: "送出" })).toBeInTheDocument();
  });

  it("點擊應觸發 onClick", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>點我</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("disabled 狀態不應觸發 onClick", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        點我
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### 查詢優先順序

```tsx
// ✅ 優先使用無障礙查詢
screen.getByRole("button", { name: "送出" });
screen.getByLabelText("電子郵件");
screen.getByPlaceholderText("搜尋...");
screen.getByText("歡迎回來");

// ⚠️ 次要選擇
screen.getByTestId("submit-button");
```

---

## Hook 測試

```tsx
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("初始值應為 0", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("increment 應增加計數", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it("應接受自訂初始值", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});
```

---

## Mock 技巧

### Mock API 呼叫

```typescript
import { vi } from "vitest";
import { api } from "@/lib/api";

vi.mock("@/lib/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

it("應顯示使用者列表", async () => {
  vi.mocked(api.get).mockResolvedValue([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ]);

  render(<UserList />);

  expect(await screen.findByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
});
```

### Mock Zustand Store

```typescript
import { useAuthStore } from "@/stores/auth";

beforeEach(() => {
  useAuthStore.setState({
    user: { id: "1", name: "Test User" },
    isLoading: false,
  });
});
```

---

## Playwright E2E 測試

### 基本頁面測試

```typescript
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test.describe("首頁", () => {
  test("應顯示標題", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("應能導航到關於頁面", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "關於" }).click();
    await expect(page).toHaveURL("/about");
  });
});
```

### 表單 E2E 測試

```typescript
// e2e/login.spec.ts
test("登入流程", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("電子郵件").fill("user@example.com");
  await page.getByLabel("密碼").fill("password123");
  await page.getByRole("button", { name: "登入" }).click();

  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByText("歡迎回來")).toBeVisible();
});
```

### 執行指令

```bash
# 執行所有 E2E 測試
npm run e2e

# 開啟 UI 模式
npm run e2e:ui

# 執行特定測試
npx playwright test e2e/login.spec.ts
```
