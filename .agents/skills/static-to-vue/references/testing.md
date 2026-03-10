# Vitest + Playwright 測試

## 目錄

- [測試策略](#測試策略)
- [Vitest 單元/元件測試](#vitest-單元元件測試)
- [Playwright E2E 測試](#playwright-e2e-測試)
- [測試目錄結構](#測試目錄結構)

---

## 測試策略

| 測試類型 | 工具                    | 範圍                           |
| -------- | ----------------------- | ------------------------------ |
| 單元測試 | Vitest                  | 純函式、工具函式、Pinia stores |
| 元件測試 | Vitest + Vue Test Utils | Vue 元件渲染與互動             |
| E2E 測試 | Playwright              | 完整使用者流程                 |

---

## Vitest 單元/元件測試

### 元件測試 (Vue Test Utils)

```typescript
// components/ui/AppButton.test.ts
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import AppButton from "./AppButton.vue";

describe("AppButton", () => {
  it("正確渲染 slot 文字", () => {
    const wrapper = mount(AppButton, {
      slots: { default: "送出" },
    });
    expect(wrapper.text()).toContain("送出");
  });

  it("點擊時發出 click 事件", async () => {
    const wrapper = mount(AppButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("disabled 狀態下不應發出事件", async () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeUndefined();
  });
});
```

### Pinia Store 測試

```typescript
import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "./theme";

describe("Theme Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("初始狀態", () => {
    const theme = useThemeStore();
    expect(theme.isDark).toBe(false);
  });
});
```

---

## Playwright E2E 測試

與 React 版完全相同，API 不受前端框架影響。

```typescript
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test("首頁顯示正確標題", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("歡迎使用 Vue App");
});
```

---

## 測試目錄結構

```
src/
├── components/
│   └── ui/
│       ├── AppButton.vue
│       └── AppButton.test.ts     ← 元件測試
├── lib/
│   ├── utils.ts
│   └── utils.test.ts             ← 單元測試
├── stores/
│   ├── theme.ts
│   └── theme.test.ts             ← Store 測試
└── test/
    └── setup.ts                  ← Vitest 全域設定
e2e/
├── home.spec.ts                  ← E2E 測試
└── contact.spec.ts
```
