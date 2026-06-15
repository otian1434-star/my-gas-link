# 後台文章排版範例

後台文章現在可以直接在發文畫面排版，不需要先到外部格式化工具複製再貼回來。

- `文章內文`：適合一般文章，可直接用後台欄位內的按鈕、範本、即時預覽排版。
- `自訂 HTML 區塊`：適合更自由的版面，例如雙欄、提示框、按鈕、表格、影片。
- 後台預覽已套用前台文章樣式，並提供桌面 / 手機預覽切換。
- 建議優先使用 `文章內文` 的美化按鈕；它會輸出官方短碼，前台會自動轉成統一暗金風格且手機自動排版。

## 文章內文快捷語法

```md
# 大標題
## 副標題
### 小標題

[TAG:活動] 標籤文字

- 清單項目
- 清單項目

1. 編號項目
2. 編號項目

**金色粗體**
`代碼文字`
> 引用文字

!!! 紅色警示
??? 藍色提示
+++ 綠色完成

---
===

| 欄位一 | 欄位二 |
| --- | --- |
| 內容 | 內容 |
```

## 內文美化短碼

後台按鈕會自動插入這些短碼，不需要手打。短碼會在前台轉成官方樣式。

```md
[[HERO:重點活動標題|這裡輸入活動說明或公告重點|查看詳情|/pages/events.html]]

[[GRID:活動時間|2026/06/01 至 2026/06/07|活動獎勵|登入獎勵、推廣獎勵、限定道具]]

[[PANEL:重點說明|這裡輸入需要被框起來的補充內容。]]

[[BUTTON:前往查看|/pages/news.html]]
```

- `HERO`：大型重點橫幅，適合活動主打、重要公告。
- `GRID`：桌面雙欄、手機自動單欄。
- `PANEL`：單張資訊卡片。
- `BUTTON`：官方金色按鈕。

## 提示框

```html
<div class="cms-callout">
  <strong>重點提醒</strong><br>
  這裡可以放公告重點、注意事項或活動提醒。
</div>
```

```html
<div class="cms-callout red">
  <strong>重要警告</strong><br>
  請務必詳閱規章，違規將依公告處理。
</div>
```

## 自訂 HTML 雙欄內容

```html
<div class="cms-grid">
  <div class="cms-panel">
    <h3>活動時間</h3>
    <p>2026/06/01 至 2026/06/07</p>
  </div>
  <div class="cms-panel">
    <h3>活動獎勵</h3>
    <p>登入獎勵、推廣獎勵、限定道具。</p>
  </div>
</div>
```

## 大型重點區塊

```html
<div class="cms-hero-strip">
  <h2>端午限定活動</h2>
  <p>活動期間完成指定任務，即可領取限定獎勵。</p>
  <a class="cms-button" href="/pages/events.html">查看活動</a>
</div>
```

## 表格

```html
<table>
  <thead>
    <tr>
      <th>項目</th>
      <th>內容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>經驗倍率</td>
      <td>x3（內掛 x1）</td>
    </tr>
    <tr>
      <td>掉落倍率</td>
      <td>x1</td>
    </tr>
  </tbody>
</table>
```

## YouTube 影片

```html
<iframe
  width="100%"
  height="360"
  src="https://www.youtube.com/embed/影片ID"
  title="YouTube video"
  frameborder="0"
  allowfullscreen>
</iframe>
```

## 安全提醒

自訂 HTML 只給可信任管理者使用。前台會移除 `<script>` 和 `onclick` 這類危險內容，但仍建議不要貼來源不明的 HTML。
