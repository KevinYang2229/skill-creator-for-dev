# Vitest + Playwright 測試

## 目錄

- [測試策略](#測試策略)
- [Vitest 單元/元件測試](#vitest-單元元件測試)
- [Playwright E2E 測試](#playwright-e2e-測試)
- [測試目錄結構](#測試目錄結構)

---

## 測試策略

| 測試類型 | 工具                     | 範圍                             |
| -------- | ------------------------ | -------------------------------- |
| 單元測試 | Vitest                   | 純函式、工具函式、Zustand stores |
| 元件測試 | Vitest + Testing Library | React 元件渲染與互動             |
| E2E 測試 | Playwright               | 完整使用者流程                   |

---

## Vitest 單元/元件測試

### 設定

已在 `vite.config.ts` 中整合：

```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
  css: true,
}
```

### 純函式測試

```typescript
// lib/utils.ts
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
  }).format(price);
}

// lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./utils";

describe("formatPrice", () => {
  it("格式化台幣金額", () => {
    expect(formatPrice(1000)).toBe("$1,000");
  });

  it("處理零值", () => {
    expect(formatPrice(0)).toBe("$0");
  });
});
```

### React 元件測試

```tsx
// components/ui/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("渲染按鈕文字", () => {
    render(<Button>送出</Button>);
    expect(screen.getByRole("button", { name: "送出" })).toBeInTheDocument();
  });

  it("點擊觸發 onClick", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>點我</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("disabled 狀態不觸發 onClick", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        不可點
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### Zustand Store 測試

```typescript
// stores/theme.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useThemeStore } from "./theme";

describe("useThemeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({ isDark: false });
  });

  it("初始為淺色模式", () => {
    expect(useThemeStore.getState().isDark).toBe(false);
  });

  it("toggle 切換主題", () => {
    useThemeStore.getState().toggle();
    expect(useThemeStore.getState().isDark).toBe(true);
  });
});
```

---

## Playwright E2E 測試

### 設定

`playwright.config.ts` 已在 boilerplate 中配置。

### 執行

```bash
# 執行所有 E2E 測試
npm run e2e

# 使用 UI 模式（除錯用）
npm run e2e:ui
```

### 基本測試

```typescript
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test.describe("首頁", () => {
  test("顯示歡迎標題", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("導航至關於頁面", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "關於" }).click();
    await expect(page).toHaveURL("/about");
  });
});
```

### 表單測試

```typescript
// e2e/contact.spec.ts
test("送出聯繫表單", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("姓名").fill("測試使用者");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByRole("button", { name: "送出" }).click();
  await expect(page.getByText("送出成功")).toBeVisible();
});
```

### 深淺色切換測試

```typescript
test("切換深色模式", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /切換/ }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});
```

---

## 測試目錄結構

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx     ← 元件測試（與元件同層）
├── lib/
│   ├── utils.ts
│   └── utils.test.ts           ← 單元測試（與原始檔同層）
├── stores/
│   ├── theme.ts
│   └── theme.test.ts           ← Store 測試
└── test/
    └── setup.ts                ← 全域設定
e2e/
├── home.spec.ts                ← E2E 測試
└── contact.spec.ts
```

### 命名慣例

- 單元/元件測試：`*.test.ts(x)`
- E2E 測試：`*.spec.ts`
- 測試工具/helper：`test/` 目錄下
