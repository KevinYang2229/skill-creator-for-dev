# Skill Creator for Dev

一套放在 `.agents/skills/` 的 AI Agent 技能集，主要用來把常見開發任務沉澱成可重複使用的工作流程、規範、模板與輔助腳本。

這個 repository 適合用來管理個人或團隊的開發技能包，例如：建立 React / Vue / FastAPI 專案、產出 PRD 或 API 規格、生成 HyUI5 政府網站頁面、審查程式碼、產生版控訊息、分析台股資料等。

## 適用情境

- 想讓 AI Agent 在特定任務中遵循固定流程與團隊規範
- 想把常用的專案模板、文件模板、檢核表與 scripts 打包成技能
- 想集中管理多個可被 Codex / Claude 類 Agent 讀取的 `SKILL.md`
- 想建立可維護、可擴充、可複製到其他環境的開發技能庫

## 快速開始

1. 將本專案放在 AI Agent 可讀取的 workspace 中。
2. 確認技能都位於 `.agents/skills/<skill-name>/SKILL.md`。
3. 在對話中直接描述任務，Agent 會依照 `SKILL.md` frontmatter 的 `description` 判斷是否觸發對應技能。

範例：

```text
幫我建立一個 Vite + React + TypeScript 專案
```

```text
根據這份 PRD 產出 API 規格
```

```text
依照這張截圖產生 HyUI5 頁面
```

```text
根據目前 git diff 幫我產生 commit message
```

## 目錄結構

```text
.
├── .agents/
│   └── skills/
│       ├── api-spec-generator/
│       │   └── SKILL.md
│       ├── react-assistant/
│       │   └── SKILL.md
│       └── ...
├── .gitignore
└── README.md
```

每個技能目錄至少包含：

```text
skill-name/
└── SKILL.md
```

可選擇加入：

```text
skill-name/
├── SKILL.md
├── assets/       # 模板、範例檔、靜態資源
├── references/   # 規範、檢核表、補充文件
└── scripts/      # 可重複執行的輔助腳本
```

## 技能索引

| 技能 | 用途 | 主要觸發情境 |
| --- | --- | --- |
| [api-spec-generator](.agents/skills/api-spec-generator/SKILL.md) | 產出 RESTful API 規格文件 | API spec、API 文件、根據 PRD / 截圖設計 endpoint |
| [code-review-router](.agents/skills/code-review/SKILL.md) | 根據變更特性選擇合適 CLI 做 code review | 自動審查目前 git diff |
| [excalidraw-diagram](.agents/skills/excalidraw-diagram/SKILL.md) | 產生 Excalidraw 視覺化圖表 | 架構圖、流程圖、概念圖、系統關係圖 |
| [git-convention](.agents/skills/git-convention/SKILL.md) | 產生與審查 Git branch、commit、tag 命名 | Conventional Commits、branch naming、Semantic Versioning |
| [hy-prd-assistant](.agents/skills/hy-prd-assistant/SKILL.md) | 撰寫 Web 應用與內部系統 PRD | 會議記錄轉 PRD、需求訪談轉 PRD、PRD 補完 |
| [hyui-assistant](.agents/skills/hyui-assistant/SKILL.md) | 建立與審查 HyUI5 靜態網頁 | 政府網站、HyUI5、WCAG、RWD 頁面 |
| [hyui5-page-builder](.agents/skills/hyui5-page-builder/SKILL.md) | 依設計稿快速組裝 HyUI5 頁面 | Figma / 截圖轉 HyUI5、mp / lp / cp / np 頁型 |
| [playwright-cli](.agents/skills/playwright-cli/SKILL.md) | 自動化瀏覽器操作與測試 | 網頁測試、表單填寫、截圖、資料擷取 |
| [python-backend-assistant](.agents/skills/python-backend-assistant/SKILL.md) | 建立、擴充、審查 FastAPI 後端專案 | Python API、FastAPI、SQLAlchemy、Alembic、LLM API wrapper |
| [python-tw-stock-microservice](.agents/skills/python-tw-stock-microservice/SKILL.md) | 建立台股分析 Python 微服務 | FastAPI + uv + ruff + pytest 台股資料服務 |
| [react-assistant](.agents/skills/react-assistant/SKILL.md) | 建立與擴充現代 React 專案 | Vite、React、TypeScript、TanStack、Zustand |
| [sitemap-from-screenshots](.agents/skills/sitemap-from-screenshots/SKILL.md) | 從截圖產生網站資訊架構圖 | sitemap、IA、FigJam Mermaid flowchart |
| [skill-creator](.agents/skills/skill-creator/SKILL.md) | 建立或更新 Agent skill | 新增技能、調整 `SKILL.md`、整理 assets / references / scripts |
| [static-to-react](.agents/skills/static-to-react/SKILL.md) | 將靜態網站轉成 React 專案或元件 | HTML / CSS / vanilla JS 轉 React |
| [static-to-vue](.agents/skills/static-to-vue/SKILL.md) | 將靜態網站轉成 Vue 3 專案或元件 | HTML / CSS / vanilla JS 轉 Vue SFC |
| [static-web-assistant](.agents/skills/static-web-assistant/SKILL.md) | 建立與審查現代靜態網站 | HTML、JS、SASS、SEO、a11y、RWD |
| [svn-convention](.agents/skills/svn-convention/SKILL.md) | 根據 SVN diff 產生 commit message | SVN commit、svn diff、Subversion 變更紀錄 |
| [tw-stock-analyzer](.agents/skills/tw-stock-analyzer/SKILL.md) | 產出台股短線操作分析報告 | 技術面、籌碼面、基本面、短線選股 |
| [yt-search](.agents/skills/yt-search/SKILL.md) | 搜尋 YouTube 並回傳結構化結果 | YouTube 搜尋、影片列表查詢 |

## 技能設計原則

每個技能都應該讓 Agent 更穩定地完成一類任務，而不是只放一段泛用提示詞。

建議遵循：

- `description` 要寫清楚觸發時機、任務範圍與產出格式
- `SKILL.md` 只放核心流程，細節規範拆到 `references/`
- 重複性高或容易出錯的操作放到 `scripts/`
- 模板、範例、boilerplate 放到 `assets/`
- 技能內的連結使用相對路徑，方便整包搬移
- 產出文件預設使用繁體中文，除非技能本身有其他語言需求

## 新增技能

建議結構：

```text
.agents/skills/<new-skill>/
├── SKILL.md
├── assets/
├── references/
└── scripts/
```

`SKILL.md` 基本格式：

```markdown
---
name: new-skill
description: 清楚描述這個技能的用途、觸發時機與預期產出。
---

# New Skill

## 使用時機

說明什麼情況下應該使用這個技能。

## 工作流程

1. 收集必要資訊
2. 讀取相關 references
3. 產出或修改檔案
4. 執行驗證
```

如果要建立新的技能，優先使用 [skill-creator](.agents/skills/skill-creator/SKILL.md) 作為撰寫指引。

## 維護建議

- 新增或移除技能後，同步更新本 README 的技能索引
- 修改技能觸發條件時，優先調整 frontmatter 的 `description`
- 大型規範不要全部塞進 `SKILL.md`，改放到 `references/`
- 有實作模板的技能，請確認 `assets/` 內的 boilerplate 可直接複製使用
- 有腳本的技能，請在 `SKILL.md` 中寫明執行方式、依賴與錯誤處理

## License

此專案目前未指定授權條款。若要公開散布或讓團隊共用，建議補上明確的 license。
