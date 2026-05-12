---
name: svn-convention
description: >-
  Subversion (SVN) 版控助理，協助根據 svn diff 輸出產生符合 Conventional Commits 格式的 commit message。
  用於：(1) 根據 svn diff 或 svn status 分析變更內容並產出 commit message，
  (2) 審查 SVN commit message 是否符合 Conventional Commits 格式，
  (3) 協助執行 svn commit 指令。
  當使用者提到 svn commit、svn diff、subversion commit message、SVN 版控、
  svn 提交訊息、SVN 變更紀錄時觸發此技能。
---

# SVN Convention Assistant

協助根據 SVN diff 產出符合 Conventional Commits 規範的 commit message。

## Core Workflow

### 1. 取得變更資訊

依序執行以下指令收集變更：

```bash
# 查看變更檔案清單
svn status

# 查看具體差異
svn diff
```

若 diff 內容過長，可限定範圍：

```bash
svn diff <specific-file-or-directory>
```

### 2. 分析變更並判斷 Commit Type

根據變更內容判斷 type（決策流程）：

1. 修復 bug？ → `fix`
2. 新增功能 / 新畫面？ → `feat`
3. 重構（不改行為）？ → `refactor`
4. 純格式 / 排版（空白、縮排、CSS）？ → `style`
5. 文件更新？ → `docs`
6. 新增 / 修改測試？ → `test`
7. 效能優化？ → `perf`
8. 建置系統 / 依賴變更？ → `build`
9. CI 設定？ → `ci`
10. 其他雜務（設定、套件）？ → `chore`

### 3. 產出 Commit Message

使用 Conventional Commits 格式：

```
<type>(<scope>): <subject>

<body>
```

**規則：**

- `type`: 必填，與變更性質對應（見上方決策流程）
- `scope`: 選填，影響範圍（模組、元件名）
- `subject`: 必填，中文描述、不加句號、≤ 72 字元
- `body`: **必填**，以條列方式（`-` 開頭）列出具體變更內容
- 一個 commit 只做一件事；若變更涉及多件事，建議拆分

### 4. 執行 Commit

產出指令供使用者執行：

```bash
svn commit -m "<type>(<scope>): <subject>

<body>"
```

若訊息含多行，使用 heredoc 或檔案方式：

```bash
svn commit -F commit_msg.txt
```

## SVN 目錄結構參考

SVN 標準專案結構：

```
project-root/
├── trunk/        ← 主開發線（相當於 Git 的 main）
├── branches/     ← 分支
│   ├── feature/login-api
│   └── bugfix/fix-timeout
└── tags/         ← 版本標記（唯讀快照）
    ├── v1.0.0
    └── v1.1.0
```

分支操作：

```bash
# 建立 branch
svn copy ^/trunk ^/branches/feature/login-api -m "feat: 建立 login-api 分支"

# 合併 branch 回 trunk
cd trunk-working-copy
svn merge ^/branches/feature/login-api
svn commit -m "feat(auth): 合併 login-api 功能至 trunk"
```

## Detailed Reference

- **完整 commit type 對照表、SVN 指令速查、commit message 範例、常見錯誤**: See [conventions.md](references/conventions.md)
