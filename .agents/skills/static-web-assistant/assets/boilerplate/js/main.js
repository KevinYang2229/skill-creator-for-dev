/**
 * main.js — 應用程式主入口
 * 負責匯入模組與初始化
 */

import { initNav } from "./components/nav.js";

/**
 * 初始化應用程式
 * 進入點函式，負責呼叫各模組的初始化方法
 */
function init() {
  initNav();
}

// 等待 DOM 載入完成後初始化
document.addEventListener("DOMContentLoaded", init);
