# React Hook Form + Zod 表單處理

## 目錄

- [基本設定](#基本設定)
- [Zod Schema 定義](#zod-schema-定義)
- [Register 模式](#register-模式)
- [Controller 模式](#controller-模式)
- [動態表單](#動態表單)
- [錯誤處理](#錯誤處理)
- [表單元件封裝](#表單元件封裝)

---

## 基本設定

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/** 登入表單 Schema */
const loginSchema = z.object({
  email: z.string().email("請輸入有效的電子郵件"),
  password: z.string().min(8, "密碼至少 8 個字元"),
});

type LoginFormData = z.infer<typeof loginSchema>;

/** 登入表單元件 */
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  /** 表單送出處理 */
  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">電子郵件</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password">密碼</label>
        <input id="password" type="password" {...register("password")} />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "登入中..." : "登入"}
      </button>
    </form>
  );
}
```

---

## Zod Schema 定義

### 常見驗證模式

```typescript
// lib/validators.ts
import { z } from "zod";

/** 使用者註冊 Schema */
export const registerSchema = z
  .object({
    name: z.string().min(2, "姓名至少 2 個字元").max(50),
    email: z.string().email("請輸入有效的電子郵件"),
    password: z
      .string()
      .min(8, "密碼至少 8 個字元")
      .regex(/[A-Z]/, "需包含至少一個大寫字母")
      .regex(/[0-9]/, "需包含至少一個數字"),
    confirmPassword: z.string(),
    age: z.coerce.number().int().min(18, "需年滿 18 歲").optional(),
    role: z.enum(["user", "admin"]).default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
```

### 動態 Schema

```typescript
/** 根據使用者角色動態調整驗證 */
const getProfileSchema = (isAdmin: boolean) =>
  z.object({
    name: z.string().min(2),
    department: isAdmin
      ? z.string().min(1, "管理員需填寫部門")
      : z.string().optional(),
  });
```

---

## Register 模式

適用於原生 HTML input 元素：

```tsx
<input
  type="text"
  {...register("name")}
  className="rounded-lg border px-4 py-2"
/>;

{
  /* 數值轉換 */
}
<input type="number" {...register("age", { valueAsNumber: true })} />;
```

---

## Controller 模式

適用於第三方元件或自訂元件：

```tsx
import { Controller } from "react-hook-form";

<Controller
  name="category"
  control={control}
  render={({ field, fieldState }) => (
    <Select {...field} options={categories} error={fieldState.error?.message} />
  )}
/>;
```

---

## 動態表單

使用 `useFieldArray` 處理動態欄位：

```tsx
import { useFieldArray } from "react-hook-form";

const schema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().min(1, "請輸入品名"),
        quantity: z.coerce.number().min(1, "數量至少 1"),
      }),
    )
    .min(1, "至少需要一個項目"),
});

function OrderForm() {
  const { control, register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { items: [{ name: "", quantity: 1 }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.name`)} placeholder="品名" />
          <input {...register(`items.${index}.quantity`)} type="number" />
          <button type="button" onClick={() => remove(index)}>
            刪除
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", quantity: 1 })}>
        新增項目
      </button>
      <button type="submit">送出</button>
    </form>
  );
}
```

---

## 錯誤處理

### 全域錯誤

```tsx
const {
  setError,
  formState: { errors },
} = useForm();

// 設定 Server 端錯誤
const onSubmit = async (data: FormData) => {
  try {
    await submitForm(data);
  } catch (error) {
    setError("root", { message: "伺服器錯誤，請稍後再試" });
  }
};

// 顯示全域錯誤
{
  errors.root && (
    <div className="rounded-lg bg-red-50 p-4 text-red-600">
      {errors.root.message}
    </div>
  );
}
```

---

## 表單元件封裝

### 通用 FormField 元件

```tsx
interface FormFieldProps {
  /** 欄位標籤 */
  label: string;
  /** 錯誤訊息 */
  error?: string;
  /** 子元素 */
  children: React.ReactNode;
}

/** 通用表單欄位包裹 */
function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```
