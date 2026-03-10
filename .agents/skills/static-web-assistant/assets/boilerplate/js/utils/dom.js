/**
 * dom.js — DOM 操作工具模組
 * 提供常用的 DOM 查詢與操作輔助函式
 */

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

/**
 * 建立 HTML 元素並設定屬性
 * @param {string} tag - 標籤名稱
 * @param {Object} [attrs={}] - 屬性物件
 * @param {string} [textContent=''] - 文字內容
 * @returns {HTMLElement} 建立的元素
 */
export function createElement(tag, attrs = {}, textContent = "") {
  const el = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });

  if (textContent) {
    el.textContent = textContent;
  }

  return el;
}

/**
 * Debounce 函式 — 延遲執行高頻觸發的回呼
 * @param {Function} fn - 要延遲執行的函式
 * @param {number} [delay=250] - 延遲毫秒數
 * @returns {Function} 包裝後的函式
 */
export function debounce(fn, delay = 250) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle 函式 — 限制高頻觸發的回呼執行頻率
 * @param {Function} fn - 要限頻的函式
 * @param {number} [limit=250] - 最小間隔毫秒數
 * @returns {Function} 包裝後的函式
 */
export function throttle(fn, limit = 250) {
  let inThrottle = false;

  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
