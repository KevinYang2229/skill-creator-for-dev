# 表單 → React Hook Form + Zod

## 目錄

- [基本轉換](#基本轉換)
- [Zod 驗證 Schema](#zod-驗證-schema)
- [常見表單元素](#常見表單元素)
- [錯誤處理與顯示](#錯誤處理與顯示)
- [進階模式](#進階模式)

---

## 基本轉換

```html
<!-- 原始 HTML -->
<form id="contact-form">
  <label for="name">姓名</label>
  <input type="text" id="name" name="name" required minlength="2" />
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />
  <button type="submit">送出</button>
</form>

<script>
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // 手動驗證...
  });
</script>
```

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/** 表單驗證 Schema */
const contactSchema = z.object({
  name: z.string().min(2, "姓名至少 2 個字元"),
  email: z.string().email("請輸入有效的 Email"),
});

type ContactForm = z.infer<typeof contactSchema>;

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="name">姓名</label>
      <input id="name" {...register("name")} />
      {errors.name && <p role="alert">{errors.name.message}</p>}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...register("email")} />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "送出中..." : "送出"}
      </button>
    </form>
  );
}
```

---

## Zod 驗證 Schema

### HTML 驗證屬性 → Zod 對照

| HTML 屬性          | Zod 驗證                       |
| ------------------ | ------------------------------ |
| `required`         | `.min(1, '必填')`              |
| `minlength="3"`    | `.min(3, '最少 3 字元')`       |
| `maxlength="100"`  | `.max(100, '最多 100 字元')`   |
| `min="0"`          | `.min(0)`                      |
| `max="100"`        | `.max(100)`                    |
| `type="email"`     | `.email('無效 Email')`         |
| `type="url"`       | `.url('無效 URL')`             |
| `pattern="[0-9]+"` | `.regex(/[0-9]+/, '僅限數字')` |

### 常見 Schema 模式

```typescript
const registerSchema = z
  .object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8, "密碼至少 8 個字元"),
    confirmPassword: z.string(),
    age: z.coerce.number().min(18, "必須年滿 18 歲"),
    agree: z.literal(true, { errorMap: () => ({ message: "請同意條款" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密碼不一致",
    path: ["confirmPassword"],
  });
```

---

## 常見表單元素

### Select

```html
<select name="category" required>
  <option value="">請選擇</option>
  <option value="tech">科技</option>
</select>
```

```tsx
<select {...register("category")}>
  <option value="">請選擇</option>
  <option value="tech">科技</option>
</select>
```

### Checkbox

```html
<input type="checkbox" name="agree" required />
```

```tsx
<input type="checkbox" {...register("agree")} />
```

### Radio

```tsx
<input type="radio" value="male" {...register('gender')} />
<input type="radio" value="female" {...register('gender')} />
```

### Textarea

```tsx
<textarea {...register("message")} rows={4} />
```

---

## 錯誤處理與顯示

### 通用錯誤訊息元件

```tsx
interface FieldErrorProps {
  message?: string;
}

function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-500">
      {message}
    </p>
  );
}

// 使用
<FieldError message={errors.email?.message} />;
```

---

## 進階模式

### Controller（非原生元件）

```tsx
import { Controller } from "react-hook-form";

<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <CustomSelect
      value={field.value}
      onChange={field.onChange}
      options={options}
    />
  )}
/>;
```

### 動態欄位（useFieldArray）

```tsx
import { useFieldArray } from "react-hook-form";

const { fields, append, remove } = useFieldArray({
  control,
  name: "items",
});

{
  fields.map((field, index) => (
    <div key={field.id}>
      <input {...register(`items.${index}.name`)} />
      <button type="button" onClick={() => remove(index)}>
        刪除
      </button>
    </div>
  ));
}
<button type="button" onClick={() => append({ name: "" })}>
  新增
</button>;
```
