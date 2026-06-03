// ================================================================
// ⭐ 論壇設定檔 config.js
// 每個社團換皮只需修改本檔案，無需動其他程式碼
// ================================================================

const FORUM_CONFIG = {

  // ── 論壇基本資訊 ─────────────────────────────────────────────
  forumName:     "曜天堂",                          // 短名稱（Logo 顯示）
  forumFullName: "曜天堂私服論壇",                   // 完整名稱
  forumSlogan:   "唯我獨尊 · 經典 3.81 手動天M版",   // 標語
  serverVersion: "3.81 手動（天M版）",               // 遊戲版本

  // ── 社群連結（換論壇時更換這兩個網址）─────────────────────────
  lineOfficial:   "https://lin.ee/a3TiZsP",           // LINE@ 官方客服
  lineCommunity:  "https://line.me/R/ti/g/XXXXXXX",   // LINE 社群（請更換）

  // ── 遊戲下載連結（換論壇時更換）──────────────────────────────
  download: {
    mainUrl:      "https://drive.google.com/file/d/1o2wGKAOAE8RIOhlehR7A6Ff4NnFjg1jX/view?usp=sharing",
    backup1:      "https://drive.google.com/file/d/1gug6qp5LI3ltfWfszCkK5EPTmHCXfDXO/view?usp=sharing",   // RAR
    backup2:      "https://drive.google.com/file/d/1nr-4SAbhiBJJxVYNEjsEamXGsgtMcMUf/view?usp=sharing",   // 7Z
    backup3:      "https://drive.google.com/file/d/13wXA5qHVQV_omyxbpSB2OLUM8nZbaeJR/view?usp=sharing",   // ZIP
    patchUrl:     "https://drive.google.com/file/d/1D17aQ55m-EelK-GHRi3dqRusNa53vMUu/view?usp=sharing",   // 合併補丁
    noBlinkPatch: "https://drive.google.com/file/d/1TRQIhnKG8R2qW5IvPa2AxPOymUbsALGV/view?usp=drive_link",// 不閃爍補丁
    updateDate:   "2026/02/14",
    anyDeskUrl:   "https://anydesk.com/zh-tw/downloads/windows",
  },

  // ── 贊助連結（換論壇時更換）──────────────────────────────────
  sponsorUrl: "#",   // ← 填入贊助頁面 URL

  // ── 申辦帳號 Google Form（換論壇時更換）─────────────────────
  // 建立 Google Forms 表單後填入 URL，表單欄位：電子信箱、手機號碼
  // 表單回覆設定「限制存取」，只有管理員帳號可查看資料
  registerFormUrl: "https://docs.google.com/forms/d/e/XXXXXX/viewform",  // ← 填入你的 Google Form URL

  // ── 彈窗公告（可關閉或修改內容）─────────────────────────────
  popup: {
    enabled:  true,
    title:    "📢 最新公告",
    content:  `⚔️ <strong>曜天堂</strong> 正式開服！<br><br>
               📅 <strong>開服時間：</strong>2026/02/28 20:00<br>
               🎁 開服禮包 · 全員贈送<br>
               💬 加入官方LINE獲取最新消息`,
    btnText:  "加入官方 LINE@",
    btnUrl:   "https://lin.ee/a3TiZsP",
    showOnce: true,   // true = 每次瀏覽只顯示一次
  },

  // ── 首頁更新歷程（最新在前，最多顯示 5 筆）───────────────────
  updates: [
    { date: "2026/02/28", tag: "開服", title: "【開服】曜天堂正式開服公告", content: "曜天堂正式開服！感謝全體玩家的支持，讓我們一起創造傳說！" },
    { date: "2026/02/14", tag: "維護", title: "【維護】遊戲懶人包更新", content: "遊戲懶人包更新，新增打字不閃爍補丁，建議全員更新。" },
    { date: "2026/02/11", tag: "封測", title: "【封測】封測正式啟動", content: "封測正式啟動！推文回報系統同步開放，好禮等你來領。" },
  ],

  // ── 首頁 Hero 倍率說明（可自行修改）──────────────────────────
  heroBadges: [
    "✦ 版本 3.81",
    "⚡ 經驗 x10",
    "💰 金幣 x3",
    "🎁 掉寶 x2",
    "🛡️ 強化 x2",
    "⚖️ IP 限制 3 開",
  ],

  // ── 客服資訊 ──────────────────────────────────────────────────
  lineId:   "@021ngtgv",
  teamName: "曜天堂管理團隊",
};
