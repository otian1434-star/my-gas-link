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
  lineCommunity:  "https://line.me/ti/g2/isRv4MoNBwp1W2ww7zcXZrJesAE3878R2RLijA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",  // 玩家討論區（LINE 社群）

  // ── 遊戲下載連結（換論壇時更換）──────────────────────────────
  download: {
    mainUrl:      "",
    backup1:      "",   // RAR
    backup2:      "",   // 7Z
    backup3:      "",   // ZIP
    patchUrl:     "",   // 合併補丁
    noBlinkPatch: "https://drive.google.com/file/d/119_5OrCMO-p78mp8gWumjdO3OZpeUqdo/view?usp=sharing", // 功能性補丁
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
      { label: "玩家討論區", icon: "💬", url: "https://line.me/ti/g2/isRv4MoNBwp1W2ww7zcXZrJesAE3878R2RLijA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default", style: "line" },
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

  // ── 全站音樂播放器（自架 MP3，無外部服務）─────────────────────
  // 用法：把 MP3 放進 assets/media/music/，再到下方 tracks 依序列出。
  //   - url：音檔路徑（站內相對路徑或完整 https 網址皆可）
  //   - cover：封面圖（可省略，省略時顯示預設音符圖示）
  //   - artist：演出者（可省略）
  musicPlayer: {
    enabled: true,
    title: "曜舞音樂",
    autoplay: true,   // 嘗試自動播放；瀏覽器會擋住「未互動前的有聲播放」，
                      // 所以會在使用者第一次點擊／捲動頁面時自動開始。
    loop: true,       // 整個清單循環
    shuffle: true,    // 隨機播放順序
    volume: 0.7,      // 預設音量 0 ~ 1
    // 隨機播放（shuffle: true）；要改歌名直接改 title 即可
    tracks: [
      { title: "背景音樂 1",  url: "assets/media/music/music0.mp3" },
      { title: "背景音樂 2",  url: "assets/media/music/music10.mp3" },
      { title: "背景音樂 3",  url: "assets/media/music/music12.mp3" },
      { title: "背景音樂 4",  url: "assets/media/music/music13.mp3" },
      { title: "背景音樂 5",  url: "assets/media/music/music14.mp3" },
      { title: "背景音樂 6",  url: "assets/media/music/music16.mp3" },
      { title: "背景音樂 7",  url: "assets/media/music/music18.mp3" },
      { title: "背景音樂 8",  url: "assets/media/music/music23.mp3" },
      { title: "背景音樂 9",  url: "assets/media/music/music27.mp3" },
      { title: "背景音樂 10", url: "assets/media/music/music28.mp3" },
      { title: "背景音樂 11", url: "assets/media/music/music37.mp3" },
      { title: "背景音樂 12", url: "assets/media/music/music50.mp3" },
    ],
  },

  // ── 申辦帳號表單 ────────────────────────────────────────────
  // provider: "auto" 會在 Apps Script 網址設定後送到 Google 試算表，否則保留 Netlify Forms 收件。
  registrationForm: {
    provider: "auto", // auto | appsScript | netlify
    appsScript: {
      endpoint: "https://script.google.com/macros/s/AKfycbwP5pmmCMGgcr__owE1SHVYgQ4RMUHtZWr5UtOpxqgSbmZhaVtxHhrK2W_CUeB_tXo2/exec", // Google Apps Script Web App /exec 網址
      token: "",    // 選填，需與 Apps Script 內的 TOKEN 相同
    },
  },

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
    "⚡ 經驗 x3（內掛 x1）",
    "💰 金幣 x1",
    "🎁 掉落 x1",
    "🛡️ 強化 x2",
    "⚖️ IP 限制 3 開",
  ],

  // ── 客服資訊 ──────────────────────────────────────────────────
  lineId:   "@184jiknt",
  teamName: "曜舞天堂管理團隊",
};

// ================================================================
// ⭐ 後台設定覆蓋
// 上面是「預設值／後備」；實際以後台 CMS 編輯的 data/site.json 為準。
// 讀不到或失敗時自動沿用上面的預設值，網站照常運作（雙重保險）。
// ================================================================
(function () {
  function deepMergeConfig(target, src) {
    if (!src || typeof src !== 'object') return;
    Object.keys(src).forEach(function (key) {
      var sv = src[key];
      var tv = target[key];
      if (sv && typeof sv === 'object' && !Array.isArray(sv) &&
          tv && typeof tv === 'object' && !Array.isArray(tv)) {
        deepMergeConfig(tv, sv);          // 巢狀物件：逐層合併
      } else if (sv !== undefined) {
        target[key] = sv;                  // 陣列與一般值：直接覆蓋
      }
    });
  }

  window.FORUM_CONFIG_READY = new Promise(function (resolve) {
    var settled = false;
    function finish() { if (settled) return; settled = true; resolve(FORUM_CONFIG); }
    setTimeout(finish, 2500);              // 安全逾時，避免 fetch 卡住導致頁面不渲染
    try {
      var p = window.location.pathname;
      var base = (p.indexOf('/pages/') >= 0 || p.indexOf('/admin/') >= 0) ? '../' : './';
      fetch(base + 'data/site.json', { cache: 'no-store' })
        .then(function (r) { return (r && r.ok) ? r.json() : null; })
        .then(function (data) { if (data) deepMergeConfig(FORUM_CONFIG, data); })
        .catch(function () {})
        .then(finish);
    } catch (e) { finish(); }
  });
})();
