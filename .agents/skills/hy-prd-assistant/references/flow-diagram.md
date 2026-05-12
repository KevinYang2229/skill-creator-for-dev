# 流程圖規範（Excalidraw）

PRD 中的流程圖一律使用 **Excalidraw**（手繪風、精緻、可重新編輯）。禁止用 Mermaid 程式碼塊產出流程圖 — Mermaid 在 Word 無法正確渲染，且樣式單調。

每張流程圖產出兩個檔案：

- `.excalidraw`（JSON 原始檔，可重開編輯）
- `.png`（高解析度渲染結果，供 md / Word 引用）

**兩者都存放於 `PRD_assets/` 目錄**（與 PRD md 同層）。

---

## 前置條件（只在第一次建立 PRD 時檢查）

### 1. 確認 `excalidraw-diagram` skill 已安裝

```bash
ls ~/.claude/skills/excalidraw-diagram/references/render_excalidraw.py
```

若檔案不存在，告知使用者需先安裝 `excalidraw-diagram` skill，並暫停此流程。

### 2. 確認渲染環境就緒

```bash
cd ~/.claude/skills/excalidraw-diagram/references
test -d .venv && echo "venv ok" || uv sync
uv run python -c "import playwright" 2>&1 | head -1
```

若 `.venv` 尚未建立或 playwright 尚未安裝，執行：

```bash
cd ~/.claude/skills/excalidraw-diagram/references
uv sync
uv run playwright install chromium
```

---

## 核心工作流（每張流程圖必做）

### 步驟 A：讀取 excalidraw-diagram skill 的規範

在產出任何 JSON 前，**務必先 Read 這兩個檔案**取得權威顏色與 element 模板：

- `~/.claude/skills/excalidraw-diagram/references/color-palette.md` — 語意配色（start/end/decision/error/warning...）
- `~/.claude/skills/excalidraw-diagram/references/element-templates.md` — 各元素 JSON 範本

不要憑記憶填顏色。每次都從 palette 讀最新值。

### 步驟 B：設計 layout

依流程複雜度選擇布局：

| 節點數 | 布局 | 備註 |
|---|---|---|
| ≤ 8 | **LR 橫向一條線** | 主流程最常用 |
| 9–16 | **Snake（Z 字型）** | 每列 4–5 節點，左右交替 |
| > 16 | **拆成多張子流程** | 不要擠在一張 |

決策分支（diamond）需畫出 **兩條路徑**，兩條路徑最終都要有明確終點或回流節點。

### 步驟 C：產出 `.excalidraw` JSON

依循 `~/.claude/skills/excalidraw-diagram/SKILL.md` 的方法論：

- **roughness: 1**（PRD 固定用手繪風，不要 0）
- **fontFamily: 3**（中文手寫體）
- **strokeWidth: 2**
- **opacity: 100**（永遠不透明）
- 矩形加 `"roundness": {"type": 3}`
- 文字元素綁定容器時設 `containerId`，容器設 `boundElements`

完整格式詳見本章「標準節點規格」。

### 步驟 D：渲染 PNG

```bash
cd ~/.claude/skills/excalidraw-diagram/references
uv run python render_excalidraw.py "<絕對路徑>/PRD_assets/flow-XXX.excalidraw" --scale 2
```

`--scale 2` 產出 2× 高解析度，適合嵌入 Word 與印刷。

### 步驟 E：在 md 中引用

```markdown
#### 流程圖

![主流程：請假申請從發起到送出](PRD_assets/flow-main.png)
```

**不要**在 md 中寫 ` ```mermaid ... ``` ` 程式碼塊。

### 步驟 F：自我檢查（Read PNG）

產出 PNG 後用 Read 工具開啟檢視：

- [ ] 每個節點文字皆清晰、未被截斷
- [ ] 沒有元素重疊
- [ ] 箭頭連到正確目標、未穿過其他節點
- [ ] 分支皆有「是/否」「通過/不通過」等 label
- [ ] 所有路徑都有終點（不可有孤立箭頭）

若有問題，編輯 JSON 修正後重新渲染。典型 2–4 次迭代可完成。

---

## 檔案命名規則

| 圖類型 | 檔名 | 範例 |
|---|---|---|
| 第 4 章「主流程」 | `flow-main.excalidraw/.png` | 請假申請從發起到送出 |
| 第 5.x 功能流程 | `flow-<功能 slug>.excalidraw/.png` | `flow-leave-form.png`、`flow-approve.png` |
| 子流程 | `flow-<功能 slug>-<sub>.excalidraw/.png` | `flow-leave-form-upload.png` |

`<功能 slug>` 用英文小寫、連字號，對應功能清單的次要功能。

---

## 節點形狀語意（固定對照表）

| 形狀 | Excalidraw type | 用途 |
|---|---|---|
| 圓角矩形（橢圓近似） | `ellipse` | 起點（開始）、終點（成功/失敗/返回） |
| 圓角矩形 | `rectangle` + `roundness: {type:3}` | 一般動作 / 步驟 |
| 菱形 | `diamond` | 判斷 / 決策分岔 |
| 虛線圓角矩形 | `rectangle` + `strokeStyle: "dashed"` | 選填 / 可跳過的步驟 |

---

## 節點語意配色（取自 excalidraw-diagram skill）

以下為對照表，實際值以 `~/.claude/skills/excalidraw-diagram/references/color-palette.md` 為準：

| 節點用途 | fill | stroke | 文字色 |
|---|---|---|---|
| 開始（start） | `#fed7aa` | `#c2410c` | `#374151` |
| 一般步驟（主流程） | `#93c5fd` 或 `#60a5fa` | `#1e3a5f` | `#374151` |
| 決策（diamond） | `#fef3c7` | `#b45309` | `#78350f` |
| 重設 / 返回操作 | `#fee2e2` | `#dc2626` | `#7f1d1d` |
| 錯誤 / 失敗 | `#fecaca` | `#b91c1c` | `#7f1d1d` |
| 成功 / 送出完成 | `#a7f3d0` | `#047857` | `#064e3b` |
| 選填 / Optional（dashed） | `#dbeafe` | `#1e40af` | `#1e40af` |
| 人員 / AI 互動 | `#ddd6fe` | `#6d28d9` | `#4c1d95` |

箭頭 stroke 原則：**跟隨來源節點的語意色**（例：從決策節點出去的「失敗」箭頭用 `#b91c1c`）。

---

## 標準節點規格（複製即用）

以下是產出 PRD 流程圖時的推薦尺寸。座標自行調整。

```json
// 開始 / 終點（ellipse）
{
  "type": "ellipse",
  "x": 40, "y": 160,
  "width": 120, "height": 60,
  "strokeColor": "#c2410c",
  "backgroundColor": "#fed7aa",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "boundElements": [{"id": "t_start", "type": "text"}]
}

// 一般步驟（rectangle）
{
  "type": "rectangle",
  "x": 200, "y": 150,
  "width": 180, "height": 80,
  "strokeColor": "#1e3a5f",
  "backgroundColor": "#93c5fd",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100,
  "roundness": {"type": 3}
}

// 決策（diamond）
{
  "type": "diamond",
  "x": 420, "y": 135,
  "width": 180, "height": 110,
  "strokeColor": "#b45309",
  "backgroundColor": "#fef3c7",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "roughness": 1,
  "opacity": 100
}

// 選填步驟（dashed）
{
  "type": "rectangle",
  "strokeColor": "#1e40af",
  "backgroundColor": "#dbeafe",
  "strokeStyle": "dashed",
  "strokeWidth": 2,
  "roughness": 1,
  "roundness": {"type": 3}
}
```

其餘完整欄位請從 `~/.claude/skills/excalidraw-diagram/references/element-templates.md` 複製。

---

## 箭頭規則

- **水平主流程**：`points: [[0,0], [<gap>,0]]`，直線。
- **垂直串接**：`points: [[0,0], [0,<gap>]]`。
- **L 型彎折（分支到上下層）**：`points: [[0,0], [<half>,0], [<half>,<dy>], [<dx>,<dy>]]`。
- **迴路（錯誤回到前節點）**：繞過中間節點走外圈，typical `points: [[0,0], [<right>,0], [<right>,<-up>], [<-left>,<-up>]]`。

每個 arrow 建議加 `startBinding` + `endBinding`（`focus: 0, gap: 2`），這樣之後在 Excalidraw App 編輯時箭頭會自動跟隨節點。

分支箭頭必備 label：用獨立 `text` 元素放在箭頭附近（不綁容器），例：「是 / 否」「通過 / 不通過」「核准 / 退回」。

---

## 兩個必備範例模板

### 範例 1：LR 主流程（8 節點以內）

```text
[開始] → [目錄] → [點擊功能] → [填寫] → [點擊確定] → <驗證?>
                                  ↑                         ↓ 通過
                      [重填] ←────┘                      [成功]
                                                            ↓ 不通過
                                                     [錯誤] ←─ 迴路回 [填寫]
```

參考 `PRD_assets/flow-main.excalidraw` 範例（若已存在）。

### 範例 2：Snake TD 子流程（9-16 節點）

```text
Row 1:  [開始] → [step 1] → [step 2] → <分支?>
                                           ↓
Row 2:  [step 6] ← [step 5] ← [step 4] ←──┘
        ↓
Row 3:  [step 7] → [step 8] → <驗證?> ─→ [成功]
                                   └─→ [錯誤] ─(繞右側迴路)─→ [step 7]
```

每列節點間距建議 `200px`，列間距 `180px`。

---

## 迴路箭頭路由（重要）

錯誤/返回迴路容易穿過其他節點。路由原則：

1. 起點向**外側**（畫布右側或左側）先延伸出去
2. 沿外側向上/下到目標列
3. 再水平回到目標節點
4. 畫布寬度要足夠容納外側通道（通常需 +100~150px 邊距）

錯誤示範：起點直接往目標畫，箭頭穿過 3 個節點 → **不可**。
正確示範：起點 → 右邊 100px → 上方到目標列 → 左進入目標。

---

## 完整 JSON 結構

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [ /* 所有節點、文字、箭頭、label */ ],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": 20
  },
  "files": {}
}
```

---

## 禁止事項

- ❌ 不要用 ` ```mermaid ` 程式碼塊代替 Excalidraw
- ❌ 不要用 `roughness: 0`（PRD 固定手繪感）
- ❌ 不要省略 `startBinding` / `endBinding`
- ❌ 不要自訂配色（必須從 palette 選）
- ❌ 分支不畫 label（是/否 / 通過/不通過 必標）
- ❌ 流程末端留孤立箭頭（每條路徑都要有終點）
- ❌ 節點文字超過 10 字仍塞進一格（請用 `\n` 斷行）

---

## 產出後檢查清單

- [ ] `.excalidraw` 與 `.png` 都存在於 `PRD_assets/`
- [ ] PNG 用 Read 工具開啟看過，無重疊、無截斷
- [ ] md 用 `![alt](PRD_assets/flow-xxx.png)` 引用
- [ ] 每條箭頭都有端點（不懸空）
- [ ] 每個 diamond 都有至少 2 條分支 + label
- [ ] 所有節點配色從 palette 選，無自訂色
