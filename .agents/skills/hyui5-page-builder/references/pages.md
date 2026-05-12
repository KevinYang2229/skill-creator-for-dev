# HyUI5 頁型總覽

每種頁型都有既有 demo 檔（在 HyUI5 專案根目錄），骨架檔放在 `assets/boilerplate/pages/`。

## 首頁類

| 檔名 | 用途 | 特徵 |
|---|---|---|
| `mp.html` | 標準首頁 | 主視覺 swiper + 多個 section，**無** breadcrumb / pageTitle |
| `mp2.html` | 首頁變體 | 區塊配置不同 |
| `mp_w.html` | 白底首頁 | 視覺底色為白 |
| `mp_template.html` | 首頁切版工具 | 純 flex 示範，可當新首頁起點 |

**骨架**：`assets/boilerplate/pages/mp-shell.html`

## 內頁類（標準頁）

| 檔名 | 用途 | 特徵 |
|---|---|---|
| `cp.html` | 內容頁 | 一篇完整文章，`.contentGroup` 內多組圖文 |
| `np.html` | 節點頁 | 同 cp 但**多左側** `<aside class="sideNav">` |
| `lp.html` | 列表頁（條列） | `div.listGroup > ul > li > a` |
| `lp2.html` | 列表頁（卡片） | `div.blockTypeB / blockTypeC` |
| `lp_table.html` | 列表頁（表格） | `div.tableList > table` |
| `lp_album.html` | 相簿列表 | `div.albumList` 縮圖格狀 |
| `thumbs_album.html` | 相簿+縮圖輪播 | swiper thumbs mode |
| `fp.html` | 轉寄友人 | 簡化 form |
| `qp.html` | 意見信箱 | 較完整 form + 必填驗證 |
| `sitemap.html` | 網站地圖 | 多層 `<ul>` 列出站內結構 |
| `404.html` | 錯誤頁 | 獨立短頁面，不含 header/footer |

**骨架**：`pages/cp-shell.html`、`pages/np-shell.html`、`pages/lp-shell.html`

## 元件展示頁（不當作真實頁型，拿來查元件用法）

| 檔名 | 內容 |
|---|---|
| `button.html` | 所有按鈕變體 |
| `icon.html` | 預設 icon class 對照表 |
| `form.html` | 所有 form 狀態 |
| `tabs.html` | tab 各變體與 API |
| `accordion.html` | accordion API |
| `popup.html` | popup 所有尺寸 |

## 內頁共同骨架

```
<main>
  <a class="accessKeyItem" href="#aC" id="aC" accesskey="C" aria-label="主要內容區">:::</a>
  <div class="innerPage">
    <div class="container">
      [<aside class="sideNav">...</aside>]         ← 僅 np
      <div class="mainContentBox">
        <nav class="breadcrumb">...</nav>
        <h2 class="pageTitle">...</h2>
        <div class="functionPanel">...</div>       ← 可選功能列
        <div class="tagBox">...</div>              ← 可選分類
        <div class="mainContent">
          ... 頁型差異主要在這裡 ...
        </div>
      </div>
    </div>
  </div>
</main>
```

## 首頁骨架（不同）

```
<main>
  <a class="accessKeyItem" href="#aC" id="aC" accesskey="C">:::</a>
  <section>
    <div class="container">
      <div class="flexTpl_12 flexFull">
        <div class="col"> [mpSlider] </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="flexTpl_12">
        <div class="col">
          <h2 class="sectionTitle">...</h2>
          <div class="blockTypeA"> ... </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 更多 section 以此類推 -->
</main>
```

## 選型決策表

- 要顯示一篇文章/說明 → `cp`
- 上述但需左側章節選單 → `np`
- 公告/新聞列表（帶編號） → `lp`
- 列表需要欄位對齊（日期/部門/編號） → `lp_table`
- 商品/活動/圖卡列表 → `lp2` 或 `lp_album`
- 聯絡表單 → `qp`
- 站內結構索引 → `sitemap`
- 單篇文章需要 tab 或 accordion 切換區塊 → `cp` + `tabs.html` / `accordion.html` 元件
