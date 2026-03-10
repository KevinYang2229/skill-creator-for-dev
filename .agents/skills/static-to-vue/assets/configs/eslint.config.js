import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default tseslint.config(
  { ignores: ["dist"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": "warn",
      /* 強制 const / === */
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
      /* 限制巢狀層級 */
      "max-depth": ["warn", 3],
      /* 限制函式參數 */
      "max-params": ["warn", 3],
      /* 禁止 console（生產環境） */
      "no-console": "warn",
    },
  },
);
