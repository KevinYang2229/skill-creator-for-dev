# JavaScript 編碼規範

## 目錄

- [模組系統](#模組系統)
- [命名規範](#命名規範)
- [函式設計](#函式設計)
- [DOM 操作](#dom-操作)
- [錯誤處理](#錯誤處理)
- [事件處理](#事件處理)
- [程式風格](#程式風格)

---

## 模組系統

### ES Module

所有 JS 檔案採用 ES Module 模式組織：

```javascript
// utils/dom.js — DOM 操作工具模組
/**
 * 依選擇器取得單一元素
 * @param {string} selector - CSS 選擇器
 * @param {Element} [parent=document] - 父容器
 * @returns {Element|null} 匹配的元素
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * 依選擇器取得所有匹配元素
 * @param {string} selector - CSS 選擇器
 * @param {Element} [parent=document] - 父容器
 * @returns {Element[]} 匹配的元素陣列
 */
export function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
```

```javascript
// main.js — 主程式入口
import { qs, qsa } from "./utils/dom.js";
import { initNav } from "./components/nav.js";

/** 初始化應用程式 */
function init() {
  initNav();
}

document.addEventListener("DOMContentLoaded", init);
```

### 模組拆分原則

- 每個模組聚焦單一職責
- 工具類函式放 `utils/` 目錄
- UI 元件邏輯放 `components/` 目錄
- HTML 引用時加 `type="module"`：`<script type="module" src="js/main.js"></script>`

---

## 命名規範

| 類型         | 規則                  | 範例                                 |
| ------------ | --------------------- | ------------------------------------ |
| 變數 / 函式  | camelCase             | `userName`, `getUserData`            |
| 常數         | UPPER_SNAKE_CASE      | `MAX_RETRY_COUNT`, `API_BASE_URL`    |
| 類別         | PascalCase            | `UserProfile`, `NavController`       |
| 私有成員     | `_` 前綴              | `_internalState`                     |
| DOM 元素參照 | 加 `El` 後綴          | `headerEl`, `submitBtnEl`            |
| Boolean      | `is`/`has`/`can` 前綴 | `isVisible`, `hasError`, `canSubmit` |
| 事件處理器   | `handle` / `on` 前綴  | `handleClick`, `onSubmit`            |

---

## 函式設計

### 原則

- **單一職責**：一個函式只做一件事
- **純函式優先**：相同輸入產生相同輸出，無副作用
- **參數不超過 3 個**，超過時使用物件解構

```javascript
// ✅ 好：使用物件解構處理多參數
/**
 * 建立使用者卡片
 * @param {Object} options - 卡片選項
 * @param {string} options.name - 使用者名稱
 * @param {string} options.avatar - 頭像 URL
 * @param {string} [options.role='member'] - 使用者角色
 * @returns {HTMLElement} 卡片元素
 */
function createUserCard({ name, avatar, role = "member" }) {
  const cardEl = document.createElement("article");
  cardEl.className = "user-card";
  cardEl.innerHTML = `
    <img class="user-card__avatar" src="${avatar}" alt="${name}">
    <h3 class="user-card__name">${name}</h3>
    <span class="user-card__role">${role}</span>
  `;
  return cardEl;
}

// ❌ 差：參數過多、職責混亂
function createCard(name, avatar, role, container, animate, callback) {
  /* ... */
}
```

### 註解規範

- 所有公開函式必須有 JSDoc 註解
- 註解使用**中文**
- 描述參數型別、用途與回傳值

---

## DOM 操作

### 最佳實踐

```javascript
// ✅ 使用 DocumentFragment 批次操作 DOM
/**
 * 將項目列表渲染到容器中
 * @param {string[]} items - 項目文字陣列
 * @param {Element} containerEl - 目標容器
 */
function renderList(items, containerEl) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });

  containerEl.appendChild(fragment);
}

// ✅ 使用 template 元素複製結構
/**
 * 從 template 建立元件實例
 * @param {string} templateId - template 元素的 ID
 * @returns {DocumentFragment} 複製的內容
 */
function createFromTemplate(templateId) {
  const template = document.getElementById(templateId);
  return template.content.cloneNode(true);
}
```

### 規則

- 優先使用 `textContent` 而非 `innerHTML`（防 XSS）
- 批次 DOM 操作使用 `DocumentFragment`
- 快取 DOM 查詢結果，避免重複查詢
- 使用 `dataset` 存取 `data-*` 屬性

---

## 錯誤處理

```javascript
// ✅ 適當的錯誤處理
/**
 * 從 API 載入使用者資料
 * @param {string} userId - 使用者 ID
 * @returns {Promise<Object>} 使用者資料
 * @throws {Error} 當 API 回應非 2xx 時拋出
 */
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`API 回應錯誤：${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`載入使用者 ${userId} 資料失敗：`, error);
    throw error;
  }
}
```

---

## 事件處理

### 事件委派

```javascript
// ✅ 使用事件委派處理動態列表
/**
 * 初始化列表項目的點擊事件
 * @param {Element} listEl - 列表容器元素
 * @param {Function} onItemClick - 項目點擊回呼
 */
function initListEvents(listEl, onItemClick) {
  listEl.addEventListener("click", (event) => {
    const itemEl = event.target.closest("[data-item-id]");
    if (!itemEl) return;

    onItemClick(itemEl.dataset.itemId, itemEl);
  });
}
```

### 規則

- 動態生成的元素使用**事件委派**
- 頁面卸載時移除不需要的事件監聽器
- 高頻事件 (`scroll`, `resize`, `input`) 使用 `debounce` / `throttle`
- 使用 `AbortController` 管理可取消的事件監聽

---

## 程式風格

- 使用 `const` 為預設，需重新賦值時用 `let`，禁用 `var`
- 使用嚴格相等 `===` / `!==`
- 使用 Template Literal 組合字串
- 使用 Optional Chaining `?.` 與 Nullish Coalescing `??`
- 使用解構賦值取出物件/陣列元素
- 避免巢狀超過 3 層的條件判斷（Early Return 模式）

```javascript
// ✅ Early Return 模式
/**
 * 處理表單提交
 * @param {Event} event - 提交事件
 */
function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get("email");

  if (!email) {
    showError("請輸入電子郵件");
    return;
  }

  if (!isValidEmail(email)) {
    showError("電子郵件格式不正確");
    return;
  }

  submitForm(formData);
}
```
