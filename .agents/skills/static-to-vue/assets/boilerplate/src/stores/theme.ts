import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 主題 Store
 * 使用 persist 插件將深淺色設定儲存至 localStorage
 */
export const useThemeStore = defineStore(
  "theme",
  () => {
    /** 當前是否為深色模式 */
    const isDark = ref(false);

    /** 切換深淺色主題 */
    function toggle() {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle("dark", isDark.value);
    }

    /** 設定特定主題 */
    function setDark(val: boolean) {
      isDark.value = val;
      document.documentElement.classList.toggle("dark", val);
    }

    return { isDark, toggle, setDark };
  },
  {
    persist: true,
  },
);
