# Git Conventions Reference

## Table of Contents

1. [Branch Naming](#branch-naming)
2. [Commit Message](#commit-message)
3. [Tag / Versioning](#tag--versioning)
4. [Common Mistakes](#common-mistakes)

---

## Branch Naming

### Format

```
<type>/<short-description>
```

- `<short-description>`: 使用 **kebab-case**（小寫 + 連字號），簡短描述目的
- 禁止中文、空白、底線；長度建議 ≤ 50 字元

### Branch Types

| Type        | Purpose              | Example                 | When to Use                                    |
| ----------- | -------------------- | ----------------------- | ---------------------------------------------- |
| `feature/`  | 新功能開發           | `feature/login-api`     | 新增功能、畫面                                 |
| `bugfix/`   | 一般 bug 修復        | `bugfix/login-error`    | 修復程式錯誤、跑版                             |
| `hotfix/`   | 緊急修復（正式環境） | `hotfix/payment-crash`  | 線上緊急問題修復                               |
| `release/`  | 發版版本             | `release/v1.2.0`        | 版本發布                                       |
| `refactor/` | 重構                 | `refactor/user-service` | 改善結構、效能，不改變外在行為                 |
| `style/`    | 程式碼風格 / 樣式    | `style/format-html`     | 空白、縮排、分號、純 CSS/SCSS 排版（不影響邏輯）|
| `chore/`    | 雜務（設定、CI）     | `chore/update-deps`     | 更新套件、`.gitignore`、建置腳本               |
| `docs/`     | 文件                 | `docs/api-spec`         | 修改 README、API 文件                          |

### Selection Decision Tree

1. 是否為線上緊急問題？ → `hotfix/`
2. 是否為 bug 修復？ → `bugfix/`
3. 是否為新功能或新畫面？ → `feature/`
4. 是否為版本發布？ → `release/`
5. 是否只改結構 / 效能、不改行為？ → `refactor/`
6. 是否只改格式 / 排版（空白、縮排、CSS）？ → `style/`
7. 是否只改文件（README、API spec）？ → `docs/`
8. 其他（CI、套件、設定檔）？ → `chore/`

---

## Commit Message

### Format (Conventional Commits)

```
<type>(<scope>): <subject>

<body>
<footer>      ← optional
```

### Rules

- **type**: 必填，與 branch type 對應（見下表）
- **scope**: 選填，影響範圍（模組、元件名）
- **subject**: 必填，中文描述、不加句號、≤ 72 字元
- **body**: **必填**，以條列方式（`-` 開頭）列出具體變更內容
- **footer**: 選填，`BREAKING CHANGE:` 或 issue reference（`Closes #123`）

### Commit Types

| Type         | Description                          | Maps to Branch     |
| ------------ | ------------------------------------ | ------------------ |
| `feat`       | 新增功能                             | `feature/`         |
| `fix`        | 修復 bug                             | `bugfix/`, `hotfix/` |
| `refactor`   | 重構（不改外在行為）                 | `refactor/`        |
| `style`      | 格式調整（空白、縮排、分號）         | `style/`           |
| `chore`      | 雜務（CI、套件、設定）               | `chore/`           |
| `docs`       | 文件更新                             | `docs/`            |
| `test`       | 新增 / 修改測試                      | any                |
| `perf`       | 效能優化                             | `refactor/`        |
| `build`      | 建置系統 / 外部依賴變更              | `chore/`           |
| `ci`         | CI 設定變更                          | `chore/`           |
| `revert`     | 還原先前 commit                      | any                |

### Commit Message Examples

```
feat(auth): 新增 JWT refresh token 端點

- 實作自動 token 刷新機制，防止 session 過期
- 新增 /api/auth/refresh 路由
Closes #42
```

```
fix(cart): 修復購物車數量更新的競爭條件

- 加入 debounce 防止連續點擊造成數量不一致
- 修正 API 回傳後未正確更新 state 的問題
```

```
chore(deps): 升級 eslint 至 v9.0.0

- 更新 eslint 設定檔以相容新版 flat config
- 移除已棄用的 rules
```

```
style(global): 統一縮排為 2 spaces

- 調整所有 HTML 檔案縮排
- 更新 .editorconfig 設定
```

```
docs(readme): 新增本地開發環境設定說明

- 補充 Node.js 版本需求
- 新增 docker-compose 啟動步驟
```

---

## Tag / Versioning

### Semantic Versioning Format

```
v<MAJOR>.<MINOR>.<PATCH>
```

| Segment | Increment When                        | Example          |
| ------- | ------------------------------------- | ---------------- |
| MAJOR   | 有不相容的 API 變更 (breaking change) | `v2.0.0`         |
| MINOR   | 新增向下相容的功能                    | `v1.3.0`         |
| PATCH   | 向下相容的 bug 修復                   | `v1.3.1`         |

### Pre-release Tags

```
v1.2.0-alpha.1
v1.2.0-beta.2
v1.2.0-rc.1
```

---

## Common Mistakes

| ❌ Wrong                           | ✅ Correct                          | Reason                          |
| ---------------------------------- | ----------------------------------- | ------------------------------- |
| `feature/LoginAPI`                 | `feature/login-api`                 | 使用 kebab-case                 |
| `fix: 修復登入`                    | `fix(auth): 修復登入驗證失敗問題`   | 需加 scope 並具體描述           |
| `update code`                      | `refactor(user): 抽取驗證邏輯`     | 需要 type prefix + 具體描述     |
| `feat: 新增登入並修復 bug`         | 拆成兩個 commit                     | 一個 commit 只做一件事          |
| 只寫標題沒有 body                  | 標題 + body 條列變更內容            | body 為必填                     |
| `v1.2`                             | `v1.2.0`                            | 三段式版號                      |
| `Feature/add-search`               | `feature/add-search`                | type 全小寫                     |
