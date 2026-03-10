/**
 * nav.js — 導航元件邏輯
 * 處理行動裝置漢堡選單的開關
 */

/**
 * 初始化導航功能
 * 綁定漢堡選單按鈕的點擊事件，切換行動導航的顯示狀態
 */
export function initNav() {
  const toggleBtnEl = document.querySelector(".header__menu-toggle");
  const navEl = document.querySelector(".header__nav");

  if (!toggleBtnEl || !navEl) {
    return;
  }

  toggleBtnEl.addEventListener("click", () => {
    const isExpanded = toggleBtnEl.getAttribute("aria-expanded") === "true";

    toggleBtnEl.setAttribute("aria-expanded", String(!isExpanded));
    navEl.classList.toggle("header__nav--open");

    // 更新 aria-hidden 狀態
    navEl.setAttribute("aria-hidden", String(isExpanded));
  });

  // 點擊導航外部時關閉選單
  document.addEventListener("click", (event) => {
    const isClickInside =
      navEl.contains(event.target) || toggleBtnEl.contains(event.target);

    if (!isClickInside && navEl.classList.contains("header__nav--open")) {
      toggleBtnEl.setAttribute("aria-expanded", "false");
      navEl.classList.remove("header__nav--open");
      navEl.setAttribute("aria-hidden", "true");
    }
  });

  // ESC 鍵關閉選單
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navEl.classList.contains("header__nav--open")
    ) {
      toggleBtnEl.setAttribute("aria-expanded", "false");
      navEl.classList.remove("header__nav--open");
      navEl.setAttribute("aria-hidden", "true");
      toggleBtnEl.focus();
    }
  });
}
