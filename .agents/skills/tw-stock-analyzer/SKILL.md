---
name: tw-stock-analyzer
description: 台股短線投資分析助手，整合技術面、籌碼面與基本面三大構面，協助判斷個股是否適合短線操作。用於：(1) 分析特定個股的短線進場時機，(2) 依據多構面條件篩選適合短線操作的個股，(3) 產出結構化的 Markdown 分析報告含評分與操作建議。當使用者提到台股分析、短線操作、技術面分析、籌碼面分析、法人買賣超、融資融券、KD/KDJ/MACD/RSI 指標、選股策略、個股健診、乖離率、條件篩選等關鍵字時觸發此技能。
---

# 台股短線分析助手

整合技術面（40%）、籌碼面（35%）、基本面（25%）三大構面，產出標準化 Markdown 報告，協助短線操作決策。

## 使用流程

根據使用者需求，選擇對應流程執行。

### 流程一：個股分析

分析特定個股是否適合短線進場。

1. 取得使用者指定的股票代號與名稱
2. 載入 [data-sources.md](references/data-sources.md) 查詢搜尋關鍵字
3. 使用 `search_web` 搜尋技術面、籌碼面、基本面最新資料
4. 依序載入分析指引：
   - [technical-analysis.md](references/technical-analysis.md) — 技術面（含 KDJ、RSI 9T、乖離率、5日前高、10日漲幅）
   - [chip-analysis.md](references/chip-analysis.md) — 籌碼面
   - [fundamental-analysis.md](references/fundamental-analysis.md) — 基本面
5. 依各構面評分標準計算分數
6. 載入 [report-template.md](references/report-template.md) 產出報告

### 流程二：條件篩選（Phase 2）

依據 Phase 2 先決條件篩選適合短線操作的個股。

1. 確認篩選條件（預設使用 report-template.md 中的 Phase 2 先決條件）：
   - 股價 30 ~ 250 元，且高於 20MA 與 50MA
   - 殖利率 > 1%
   - EPS 比前一季高
   - 排除交易量 ≤ 1000 張
   - 排除特定類股（建材營造、生技、玻璃、造紙、橡膠、運動休閒、居家生活、綠能環保、證券）
2. 載入 [data-sources.md](references/data-sources.md) 取得搜尋關鍵字
3. 搜尋符合條件的個股清單
4. 對每檔候選個股取得 Phase 2 欄位資料：
   - 收盤價、漲跌/漲跌幅、破5日前高、量能、KDJ、MACD、RSI 9T、EPS、殖利率、產業別、乖離率、10日漲幅
5. 依據收盤價將個股分為「百元以上區間」與「百元(含)以下區間」兩類。
6. 在各區間內，依三大構面評分，以**加權分數排序**（無分數者置底以漲跌幅排序）
7. 載入 [report-template.md](references/report-template.md) 使用 Phase 2 多股比較表格模板產出報告，分別列出兩個區間的推薦清單。

### 流程三：追蹤更新

追蹤先前分析過的個股最新狀態。

1. 確認使用者要追蹤的個股
2. 搜尋最新收盤資料與籌碼動態
3. 更新評分與操作建議
4. 標示與上次分析的變化

---

## 參考文件索引

| 文件                                                          | 用途                                           | 載入時機     |
| ------------------------------------------------------------- | ---------------------------------------------- | ------------ |
| [technical-analysis.md](references/technical-analysis.md)     | MA/KDJ/MACD/RSI 9T/布林/成交量/乖離率/10日漲幅 | 分析技術面時 |
| [chip-analysis.md](references/chip-analysis.md)               | 法人/融資券/籌碼集中度/分點判讀規則            | 分析籌碼面時 |
| [fundamental-analysis.md](references/fundamental-analysis.md) | 營收/獲利/估值/題材判讀規則                    | 分析基本面時 |
| [report-template.md](references/report-template.md)           | 報告格式、評分權重、Phase 2 篩選條件           | 產出報告時   |
| [data-sources.md](references/data-sources.md)                 | 資料來源網站與搜尋關鍵字                       | 搜尋資料時   |

---

## 資料搜尋策略

1. 使用 `search_web` 工具搜尋即時資料
2. 每個構面至少搜尋 2 ~ 3 次，確保資料涵蓋完整
3. 搜尋關鍵字格式參考 data-sources.md
4. 優先搜尋近 5 個交易日的資料
5. 若資料不足，明確標註於報告中
6. 股價落於 30 ~ 250 元之間
7. 排除交易量 ≤ 1000 張

### 搜尋順序建議

```
第一輪：{代號} 技術分析 KD MACD RSI → 取得技術指標
第二輪：{代號} 三大法人 融資融券 → 取得籌碼資料
第三輪：{代號} 月營收 EPS 本益比 → 取得基本面數據
第四輪：{代號} 主力券商 集保分散 → 補充籌碼細節（視需要）
第五輪：{代號} 乖離率 10日漲幅 → 補充 Phase 2 指標（視需要）
```

---

## 注意事項

- 所有輸出使用**繁體中文**
- 報告必須包含**免責聲明**
- 資料日期必須明確標註
- 無法取得的數據需標註「資料不足」而非自行推測
- 評分需嚴格依據 references 中的評分標準
- 短線操作建議必須包含**停損價位**
- Phase 2 篩選結果須附帶 wantgoo 技術分析連結：`https://www.wantgoo.com/stock/{股號}/technical-chart`
