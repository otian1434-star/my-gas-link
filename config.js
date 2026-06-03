// ================================================================
// ⭐ 論壇設定檔 config.js
// 每個社團換皮只需修改本檔案，無需動其他程式碼
// ================================================================

const FORUM_CONFIG = {

  // ── 論壇基本資訊 ─────────────────────────────────────────────
  forumName:     "曜舞天堂",                        // 短名稱（Logo 顯示）
  forumFullName: "曜舞天堂 經典不敗",                // 完整名稱
  forumSlogan:   "經典不敗 · 3.81 內掛版",          // 標語
  serverVersion: "3.81 內掛版",                    // 遊戲版本
  heroTitle:     "曜舞天堂",
  heroSubTitle:  "經典不敗",
  heroVideo:     "assets/media/hero-bg.mp4",
  heroImage:     "assets/media/hero-characters.png",
  brandLogo:     "assets/media/brand-logo.png",

  // ── 社群連結（換論壇時更換）───────────────────────────────────
  lineOfficial:   "https://lin.ee/8Dy3o36",           // LINE@ 官方客服：@184jiknt
  lineCommunity:  "",                                 // LINE 社群，沒有可留空

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
  sponsorUrl: "pages/sponsor.html",   // ← 填入贊助頁面 URL

  // ── 浮動快捷視窗 ─────────────────────────────────────────────
  floatingPanel: {
    enabled: true,
    title: "曜舞快捷",
    note: "官方客服 · 贊助入口 · 下載資訊",
    links: [
      { label: "LINE 官方客服", icon: "LINE", url: "https://lin.ee/8Dy3o36", style: "line" },
      { label: "贊助連結", icon: "SP", url: "pages/sponsor.html", style: "gold" },
      { label: "遊戲下載", icon: "DL", url: "pages/download.html", style: "blue" },
      { label: "最新文章", icon: "NEWS", url: "pages/news.html", style: "dark" },
    ],
  },

  // ── 申辦帳號表單 ────────────────────────────────────────────
  // register.html 使用 Netlify Forms 收件，資料在 Netlify 專案 Forms 頁面查看。

  // ── 彈窗公告（可關閉或修改內容）─────────────────────────────
  popup: {
    enabled:  false,
    title:    "📢 最新公告",
    content:  `⚔️ <strong>曜舞天堂</strong> 正式開服！<br><br>
               📅 <strong>開服時間：</strong>2026/02/28 20:00<br>
               🎁 開服禮包 · 全員贈送<br>
               💬 加入官方LINE獲取最新消息`,
    btnText:  "加入官方 LINE@",
    btnUrl:   "https://lin.ee/8Dy3o36",
    showOnce: true,   // true = 每次瀏覽只顯示一次
  },

  // ── 首頁更新歷程（最新在前，最多顯示 5 筆）───────────────────
  updates: [
    { date: "2026/02/28", tag: "開服", title: "【開服】曜舞天堂正式開服公告", content: "曜舞天堂正式開服！感謝全體玩家的支持，讓我們一起創造傳說！" },
    { date: "2026/02/14", tag: "維護", title: "【維護】遊戲懶人包更新", content: "遊戲懶人包更新，新增打字不閃爍補丁，建議全員更新。" },
    { date: "2026/02/11", tag: "封測", title: "【封測】封測正式啟動", content: "封測正式啟動！推文回報系統同步開放，好禮等你來領。" },
  ],

  // ── 首頁 Hero 倍率說明（可自行修改）──────────────────────────
  heroBadges: [
    "✦ 3.81 內掛版",
    "⚡ 經驗 x10",
    "💰 金幣 x3",
    "🎁 掉寶 x2",
    "🛡️ 強化 x2",
    "⚖️ IP 限制 3 開",
  ],

  // ── 客服資訊 ──────────────────────────────────────────────────
  lineId:   "@184jiknt",
  teamName: "曜舞天堂管理團隊",
};
