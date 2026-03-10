# 表單 → VeeValidate + Zod

## 目錄

- [基本轉換](#基本轉換)
- [Zod 驗證 Schema](#zod-驗證-schema)
- [常見表單元素](#常見表單元素)
- [錯誤處理與顯示](#錯誤處理與顯示)

---

## 基本轉換

Vue 推薦使用 `VeeValidate` 處理複雜表單，搭配 `Zod` 進行型別安全驗證。

```vue
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

/** 驗證 Schema */
const contactSchema = z.object({
  name: z.string().min(2, "姓名至少 2 個字元"),
  email: z.string().email("格式錯誤"),
});

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(contactSchema),
});

// 綁定欄位屬性 (v-model)
const [name, nameProps] = defineField("name");
const [email, emailProps] = defineField("email");

const onSubmit = handleSubmit(async (values) => {
  console.log("送出資料:", values);
});
</script>

<template>
  <form @submit="onSubmit">
    <div>
      <label for="name">姓名</label>
      <input id="name" v-model="name" v-bind="nameProps" />
      <p class="error">{{ errors.name }}</p>
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="email" v-bind="emailProps" />
      <p class="error">{{ errors.email }}</p>
    </div>

    <button type="submit" :disabled="isSubmitting">送出</button>
  </form>
</template>
```

---

## Zod 驗證 Schema

與 React 版本完全相同，Schema 可共用：

```typescript
const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  age: z.number().min(18),
});
```

---

## 常見表單元素

### Select

```vue
<select v-model="category" v-bind="categoryProps">
  <option value="">請選擇</option>
  <option value="tech">科技</option>
</select>
```

### Checkbox / Radio

```vue
<!-- 單選 Checkbox -->
<input type="checkbox" v-model="agree" v-bind="agreeProps" />

<!-- Radio Group -->
<input type="radio" value="male" v-model="gender" />
<input type="radio" value="female" v-model="gender" />
```

---

## 錯誤處理與顯示

### 建立錯誤訊息元件

```vue
<!-- ErrorMessage.vue -->
<script setup>
defineProps(["message"]);
</script>

<template>
  <span v-if="message" class="mt-1 text-sm text-red-500" role="alert">
    {{ message }}
  </span>
</template>
```

### 搭配元件使用

```vue
<AppInput v-model="email" label="Email" />
<ErrorMessage :message="errors.email" />
```

---

## 進階：Field 與 Form 元件

VeeValidate 也提供元件式的用法，適合更宣告式的開發：

```vue
<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <Field name="email" type="email" />
    <ErrorMessage name="email" />
    <button>送出</button>
  </Form>
</template>
```
