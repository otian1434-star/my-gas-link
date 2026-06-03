# 後台文章排版範例

後台文章可以分成兩種寫法：

- `Markdown 內文`：適合一般文章，可用工具列插入標題、粗體、連結、圖片、清單。
- `自訂 HTML 區塊`：適合更自由的版面，例如雙欄、提示框、按鈕、表格、影片。

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

## 雙欄內容

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
      <td>x10</td>
    </tr>
    <tr>
      <td>掉寶倍率</td>
      <td>x4</td>
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
