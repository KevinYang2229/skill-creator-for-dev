# Sitemap JSON Schema

中間檔 `sitemap.json` 是唯一的真實來源（source of truth）。Mermaid 檔永遠從它重新產生 —— **絕對不要手動編輯 `.mmd`**。

## Schema

```json
{
  "site": {
    "name": "string —— 網站名稱",
    "base_url": "string —— 例如 https://example.com",
    "language": "string —— 例如 zh-TW, en"
  },
  "root": { "<node>" }
}
```

每個 `<node>`：

```json
{
  "id": "string —— 穩定 slug，樹內唯一，[a-z0-9_]",
  "name": "string —— 顯示名稱，保留原站語言",
  "url": "string —— 根相對（/products）或絕對網址",
  "type": "string —— page-types.md 裡的其中一種",
  "thumbnail": "string —— 截圖檔案路徑或空字串",
  "notes": "string —— 簡短觀察，1-2 句",
  "url_inferred": false,
  "link_source": "nav | footer | breadcrumb | in-page | cta",
  "children": [ "<node>", ... ]
}
```

### 欄位規則

- `id` —— 必須唯一。用 URL path 的 kebab/snake 形式。根節點固定為 `home`。
- `url` —— 若不明，從 label 推斷，並設定 `url_inferred: true`。
- `type` —— 決定 Mermaid 節點形狀。見 [page-types.md](page-types.md)。
- `thumbnail` —— 只有當使用者實際提供該頁的截圖時才填檔名。僅被當成連結提到的頁面請留空。
- `notes` —— 保持精簡。記錄圖上看不到的資訊：「需登入」、「hero 輪播」、「三種定價方案」等。
- `link_source` —— 連結是在哪裡被發現的。產生器不會渲染它，但有助於使用者審核覆蓋率。
- `children` —— 子頁階層。葉節點填空陣列。

## 範例

```json
{
  "site": {
    "name": "Example Shop",
    "base_url": "https://shop.example.com",
    "language": "zh-TW"
  },
  "root": {
    "id": "home",
    "name": "首頁",
    "url": "/",
    "type": "landing",
    "thumbnail": "screenshots/home.png",
    "notes": "Hero 輪播 + 熱門商品 + 電子報訂閱",
    "url_inferred": false,
    "link_source": "in-page",
    "children": [
      {
        "id": "products",
        "name": "商品列表",
        "url": "/products",
        "type": "list",
        "thumbnail": "screenshots/products.png",
        "notes": "左側分類 filter，卡片式商品格線",
        "url_inferred": false,
        "link_source": "nav",
        "children": [
          {
            "id": "product_detail",
            "name": "商品詳情",
            "url": "/products/:id",
            "type": "detail",
            "thumbnail": "",
            "notes": "含加入購物車、規格選擇、評論區",
            "url_inferred": true,
            "link_source": "in-page",
            "children": []
          }
        ]
      },
      {
        "id": "cart",
        "name": "購物車",
        "url": "/cart",
        "type": "flow",
        "thumbnail": "",
        "notes": "需登入才能結帳",
        "url_inferred": false,
        "link_source": "nav",
        "children": []
      },
      {
        "id": "contact",
        "name": "聯絡我們",
        "url": "/contact",
        "type": "form",
        "thumbnail": "",
        "notes": "",
        "url_inferred": true,
        "link_source": "footer",
        "children": []
      }
    ]
  }
}
```
