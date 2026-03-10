# Skill Creator for Dev

一個專為現代 Web 開發者打造的 AI Agent 技能集，旨在透過標準化的技能（Skills），極大化 AI 助手的開發輔助能力。

---

## 🚀 快速開始

1. **環境要求**: 確保您的開發環境支援 [Antigravity](https://github.com/google/antigravity) 引擎（如已整合該協議的 IDE）。
2. **匯入專案**: 將本專案作為 Workspace 開啟。
3. **開始使用**:
   - 詢問 AI：「依照附件建立一個頁面」

---

## 🧩 核心技能說明

本專案提供多種專業技能，針對不同的開發階段提供深度優化。

### 1. [Skill Creator](.agents/skills/skill-creator/SKILL.md)

_AI 技能開發指引_

- ✅ **規範化**: 提供統一的 `SKILL.md` 模板與結構。
- ✅ **最佳實踐**: 教導如何撰寫精簡且高效的觸發描述。
- ✅ **資源整合**: 指引如何打包 scripts 與 assets 資源。

### 2. [Static Web Assistant](.agents/skills/static-web-assistant/SKILL.md)

_現代靜態網頁開發助手_

- ✅ **樣板生成**: 快速複製包含 SASS 與 ES Module 的標準化模板。
- ✅ **程式碼審查**: 自動檢查 HTML/JS/SASS 是否符合現代編碼規範。
- ✅ **遵循規範**: 預置 BEM 命名、WCAG 無障礙與 SEO 最佳實踐。

### 3. [Static to React](.agents/skills/static-to-react/SKILL.md)

_靜態轉 React 框架助手_

- ✅ **現代化轉換**: 將舊有 HTML 專案遷移至 Vite + React + TS。
- ✅ **技術棧整合**: 整合 Tailwind CSS v4, TanStack Router/Query, Zustand。
- ✅ **單元測試**: 自動為產出的元件撰寫 Vitest 測試。

### 4. [Static to Vue](.agents/skills/static-to-vue/SKILL.md)

_靜態轉 Vue 3 框架助手_

- ✅ **SFC 轉換**: 將 HTML 片段精準轉換為 Vue Single File Components。
- ✅ **技術棧整合**: 使用 Vite, Pinia, Vue Router 4, VeeValidate。
- ✅ **開發與測試**: 遵循 `<script setup>` 語法並整合 Playwright E2E。

---

## 📊 技術規範總覽

| 類別         | 採用的技術與規範       | 說明                             |
| :----------- | :--------------------- | :------------------------------- |
| **建構工具** | Vite / npm             | 確保極速的開發體驗與建構效率     |
| **CSS 方案** | Tailwind CSS v4 / SASS | 同時兼顧實用優先與模組化編寫     |
| **測試框架** | Vitest / Playwright    | 確保邏輯與 UI 交互的穩定性       |
| **無障礙**   | WCAG 2.1 AA            | 產出的網頁均應符合基礎無障礙規範 |
| **代碼標準** | ESLint / Prettier      | 統一的代碼風格，降低協作成本     |

---

## 📂 目錄結構

```text
.
├── .agents/
│   └── skills/     # 核心 AI 技能定義檔 (*.skill / SKILL.md)
├── README.md       # 本專案說明文件
└── .gitignore      # 環境配置忽略清單
```
