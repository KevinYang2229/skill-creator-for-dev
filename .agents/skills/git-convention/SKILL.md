---
name: git-convention
description: >-
  Git 標準規範助理，協助產出符合團隊規範的 branch 名稱、commit message、tag 版本號。
  用於：(1) 建立新 branch 時決定正確的 type prefix 與命名，
  (2) 撰寫或審查 commit message 是否符合 Conventional Commits 格式，
  (3) 產出符合 Semantic Versioning 的 tag，
  (4) 審查現有 branch / commit 是否符合規範。
  當使用者提到 git branch 命名、commit message、git tag、版本號、
  Conventional Commits、Semantic Versioning、git 規範、git 工作流程、
  branch naming convention 時觸發此技能。
---

# Git Convention Assistant

協助產出與審查符合團隊規範的 Git branch 名稱、commit message 與 tag。

## Core Workflow

### 1. Branch Naming

判斷 branch type 的決策流程：

1. 線上緊急問題？ → `hotfix/<description>`
2. Bug 修復？ → `bugfix/<description>`
3. 新功能 / 新畫面？ → `feature/<description>`
4. 版本發布？ → `release/v<semver>`
5. 重構（不改行為）？ → `refactor/<description>`
6. 純格式 / 排版？ → `style/<description>`
7. 文件更新？ → `docs/<description>`
8. 其他（CI、套件、設定）？ → `chore/<description>`

命名規則：kebab-case、全小寫、≤ 50 字元、禁止中文與空白。

### 2. Commit Message

使用 Conventional Commits 格式：

```
<type>(<scope>): <subject>

<body>
```

- `type` 必須與變更性質對應（`feat`, `fix`, `refactor`, `style`, `chore`, `docs`, `test`, `perf`, `build`, `ci`, `revert`）
- `subject` 使用中文描述、不加句號、≤ 72 字元
- `body` **必填**，以條列方式列出具體變更內容（用 `-` 開頭）
- 一個 commit 只做一件事

### 3. Tag / Versioning

使用 Semantic Versioning：`v<MAJOR>.<MINOR>.<PATCH>`

- MAJOR: breaking change
- MINOR: 新增向下相容功能
- PATCH: bug 修復

## Detailed Reference

- **完整規範表格、commit type 對照、常見錯誤範例**: See [conventions.md](references/conventions.md)
