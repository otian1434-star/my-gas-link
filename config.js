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
    mainUrl:      "",
    backup1:      "",   // RAR
    backup2:      "",   // 7Z
    backup3:      "",   // ZIP
    patchUrl:     "",   // 合併補丁
    noBlinkPatch: "https://drive.google.com/file/d/1aMc_XsVz8gBuUirB10IgCQRhVWyobJw_/view?usp=sharing", // 功能性補丁
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
      { label: "全站搜尋", icon: "查", url: "pages/search.html", style: "dark" },
      { label: "最新文章", icon: "NEWS", url: "pages/news.html", style: "dark" },
    ],
  },

  // ── 左右側懸浮圖片 ───────────────────────────────────────────
  sideBanners: {
    enabled: true,
    left: {
      image: "assets/media/side-line-official.png",
      url: "https://lin.ee/u799TqF",
      alt: "官方 LINE@",
    },
    right: {
      image: "assets/media/side-auto-sponsor.png",
      url: "",
      alt: "自動贊助",
    },
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
  updates: [],

  // ── 首頁 Hero 倍率說明（可自行修改）──────────────────────────
  heroBadges: [
    "✦ 3.81 內掛版",
    "⚡ 經驗 x3",
    "💰 金幣 x1",
    "🎁 掉落 x2",
    "🛡️ 強化 x2",
    "⚖️ IP 限制 3 開",
  ],

  // ── 客服資訊 ──────────────────────────────────────────────────
  lineId:   "@184jiknt",
  teamName: "曜舞天堂管理團隊",
};
