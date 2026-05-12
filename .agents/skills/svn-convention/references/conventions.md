# SVN Conventions Reference

## Table of Contents

1. [Commit Type 對照表](#commit-type-對照表)
2. [Commit Message 範例](#commit-message-範例)
3. [SVN 常用指令速查](#svn-常用指令速查)
4. [常見錯誤](#常見錯誤)

---

## Commit Type 對照表

| Type       | Description                  | 適用情境                                       |
| ---------- | ---------------------------- | ---------------------------------------------- |
| `feat`     | 新增功能                     | 新增功能、畫面、API 端點                       |
| `fix`      | 修復 bug                     | 修復程式錯誤、跑版、邏輯錯誤                   |
| `refactor` | 重構（不改外在行為）         | 改善結構、抽取方法、簡化邏輯                   |
| `style`    | 格式調整（空白、縮排、分號） | 純排版、CSS 調整、不影響邏輯                   |
| `chore`    | 雜務（設定、套件）           | 更新套件、`.svnignore`、建置腳本、svn:ignore   |
| `docs`     | 文件更新                     | 修改 README、API 文件、註解                    |
| `test`     | 新增 / 修改測試              | 單元測試、整合測試                             |
| `perf`     | 效能優化                     | 減少查詢次數、快取優化、演算法改善             |
| `build`    | 建置系統 / 外部依賴變更      | Maven/Gradle/npm 設定、Dockerfile              |
| `ci`       | CI 設定變更                  | Jenkins、GitLab CI、GitHub Actions pipeline    |
| `revert`   | 還原先前 commit              | 使用 `svn merge -c -REV` 還原                  |

---

## Commit Message 範例

### feat

```
feat(auth): 新增 JWT refresh token 端點

- 實作自動 token 刷新機制，防止 session 過期
- 新增 /api/auth/refresh 路由
```

### fix

```
fix(cart): 修復購物車數量更新的競爭條件

- 加入 debounce 防止連續點擊造成數量不一致
- 修正 API 回傳後未正確更新 state 的問題
```

### refactor

```
refactor(user): 抽取驗證邏輯至共用模組

- 將重複的表單驗證程式碼抽取至 ValidationHelper
- 統一錯誤訊息格式
```

### style

```
style(global): 統一縮排為 2 spaces

- 調整所有 HTML 檔案縮排
- 更新 .editorconfig 設定
```

### chore

```
chore(deps): 升級 eslint 至 v9.0.0

- 更新 eslint 設定檔以相容新版 flat config
- 移除已棄用的 rules
```

### docs

```
docs(readme): 新增本地開發環境設定說明

- 補充 Node.js 版本需求
- 新增 docker-compose 啟動步驟
```

### 多檔案變更

```
feat(form): 新增私車公用申請表單頁面

- 新增 private_car_application.html 申請表單
- 新增 private_car_application_preview.html 預覽頁
- 套用共用表單元件與驗證邏輯
```

---

## SVN 常用指令速查

### 基本操作

```bash
# 檢出專案
svn checkout <repo-url> <local-dir>

# 更新工作副本
svn update

# 查看狀態
svn status

# 查看差異
svn diff
svn diff <file>

# 提交變更
svn commit -m "<message>"
svn commit -F commit_msg.txt    # 多行訊息用檔案

# 新增 / 刪除檔案
svn add <file>
svn delete <file>
```

### 分支操作

```bash
# 建立分支
svn copy ^/trunk ^/branches/<type>/<name> -m "<type>: 建立 <name> 分支"

# 合併分支回 trunk
cd trunk-working-copy
svn merge ^/branches/<type>/<name>
svn commit -m "<type>(<scope>): 合併 <name> 至 trunk"

# 建立 tag
svn copy ^/trunk ^/tags/v<MAJOR>.<MINOR>.<PATCH> -m "chore: 標記 v<version>"
```

### 歷史查詢

```bash
# 查看日誌
svn log -l 10
svn log <file>

# 查看特定 revision 差異
svn diff -c <revision>

# 還原特定 revision
svn merge -c -<revision> .
svn commit -m "revert: 還原 r<revision> 的變更"
```

---

## 常見錯誤

| ❌ Wrong                            | ✅ Correct                              | Reason                      |
| ----------------------------------- | --------------------------------------- | --------------------------- |
| `修改了一些東西`                    | `fix(auth): 修復登入驗證失敗問題`       | 需要 type prefix + 具體描述 |
| `update code`                       | `refactor(user): 抽取驗證邏輯`          | 需要 type prefix + 中文描述 |
| `feat: 新增登入並修復 bug`          | 拆成兩個 commit                         | 一個 commit 只做一件事      |
| 只寫標題沒有 body                   | 標題 + body 條列變更內容                | body 為必填                 |
| `svn commit -m "done"`              | `svn commit -m "feat(form): 完成表單"`  | 需有意義的描述              |
| 一次 commit 20 個不相關的檔案       | 依功能分批 commit                       | 保持 commit 原子性          |
