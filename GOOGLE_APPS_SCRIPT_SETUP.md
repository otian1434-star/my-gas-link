# 申請帳號資料串接 Google 試算表

這個做法會保留論壇自己的申請頁外觀，玩家不會看到 Google 表單。玩家送出後，資料會寫入你自己的 Google 試算表。

## 設定步驟

1. 到 Google Drive 新增一份 Google 試算表，例如命名為「曜舞天堂申請資料」。
2. 在試算表上方選單點「擴充功能」>「Apps Script」。
3. 刪除原本的範例程式，貼上本專案 `GOOGLE_APPS_SCRIPT_ACCOUNT_APPLICATION.gs` 的內容。
4. 點「儲存」。
5. 點右上角「部署」>「新增部署作業」。
6. 類型選「網頁應用程式」。
7. 「執行身分」選「我」。
8. 「誰可以存取」選「任何人」。
9. 部署後複製結尾是 `/exec` 的 Web App 網址。
10. 把那個 `/exec` 網址貼到 `config.js`：

```js
registrationForm: {
  provider: "auto",
  appsScript: {
    endpoint: "貼上你的 /exec 網址",
    token: "",
  },
},
```

## 只讓自己看到資料

試算表不要公開分享，分享權限維持「只有你」或只邀請你信任的管理員。網站前台只負責送資料，玩家看不到試算表內容。

如果你設定了 `TOKEN`，也要把同一串文字填到 `config.js` 的 `token`。這只是基本防誤送，不是完整的私密密碼，真正的保護仍是試算表分享權限。
