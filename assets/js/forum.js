/* ================================================================
   曜舞天堂 - 全站共用 JS  forum.js
   頂部水平導覽列版本
   ================================================================ */

(function () {
  'use strict';

  function init() {
    if (typeof FORUM_CONFIG === 'undefined') { setTimeout(init, 30); return; }
    buildHeader();
    removeOldNav();
    buildFooter();
    buildFloatingPanel();
    initPopup();
    highlightNav();
    addPageHdrLine();
  }

  /* 判斷根路徑 */
  function root() {
    const path = window.location.pathname;
    return (path.includes('/pages/') || path.includes('/admin/')) ? '../' : './';
  }

  /* ================================================================
     HEADER（頂部導覽列）
  ================================================================ */
  function buildHeader() {
    const C = FORUM_CONFIG;
    const r = root();

    const headerHTML = `
    <header id="top-header">
      <a href="${r}index.html" class="logo-area">
        ${C.brandLogo ? `<img class="logo-img" src="${resolveLink(C.brandLogo, r)}" alt="${escapeHTML(C.forumName)}">` : '<span class="logo-icon">⚔️</span>'}
        <span class="logo-text">${C.forumName}</span>
      </a>
      <div class="logo-divider"></div>

      <nav id="main-nav">
        <!-- 首頁 -->
        <div class="nav-item">
          <a class="nav-link-top" href="${r}index.html">首頁</a>
        </div>
        <!-- 遊戲下載 -->
        <div class="nav-item">
          <a class="nav-link-top" href="${r}pages/download.html">遊戲下載</a>
        </div>
        <!-- 版本設定 -->
        <div class="nav-item">
          <a class="nav-link-top" href="${r}pages/version.html">版本設定</a>
        </div>
        <!-- 公告 -->
        <div class="nav-item">
          <button class="nav-link-top">公告 <span class="nav-arrow">▶</span></button>
          <div class="nav-dropdown">
            <a href="${r}pages/updates.html">📋 更新歷程</a>
            <a href="${r}pages/news.html">📰 最新文章</a>
            <a href="${r}pages/events.html">🎉 活動公告</a>
            <div class="nav-dd-divider"></div>
            <div class="nav-dd-label">規章制度</div>
            <a href="${r}pages/disclaimer.html">🦊 免責聲明</a>
            <a href="${r}pages/rules.html">⛔ 遊戲管理規章</a>
            <a href="${r}pages/anti-cheat.html">🚫 外掛懲處條例</a>
            <a href="${r}pages/anti-detect.html">😈 防外掛偵測</a>
            <div class="nav-dd-divider"></div>
            <div class="nav-dd-label">服務說明</div>
            <a href="${r}pages/job-transfer.html">🛡️ 轉職服務</a>
            <a href="${r}pages/accelerator.html">🤔 加速器迷思</a>
            <a href="${r}pages/office.html">💻 OFFICE 安裝</a>
          </div>
        </div>
        <!-- 遊戲資料 -->
        <div class="nav-item">
          <button class="nav-link-top">遊戲資料 <span class="nav-arrow">▶</span></button>
          <div class="nav-dropdown">
            <div class="nav-dd-label">遊戲特色</div>
            <a href="${r}pages/features-jobs.html">⚔️ 職業之力</a>
            <a href="${r}pages/features-job-skills.html">📚 職業特色技能</a>
            <a href="${r}pages/features-mage-summon.html">✨ 法師召喚系統</a>
            <a href="${r}pages/features-pet.html">🐾 寵物系統</a>
            <a href="${r}pages/features-prestige.html">🏆 威望系統</a>
            <a href="${r}pages/features-hecate.html">🌙 赫卡特介紹</a>
            <a href="${r}pages/features-online-bag.html">🎁 在線福袋</a>
            <a href="${r}pages/features-main-quest.html">📜 主線任務勳章</a>
            <a href="${r}pages/features-pendant.html">📿 傲慢的掛飾</a>
            <a href="${r}pages/features-hexagram.html">🔯 六芒星徽章</a>
            <a href="${r}pages/features-horse.html">🗿 戰馬雕像</a>
            <a href="${r}pages/features-high-pet.html">🪄 高寵介紹</a>
            <div class="nav-dd-divider"></div>
            <div class="nav-dd-label">裝備道具</div>
            <a href="${r}pages/weapons-overview.html">⚔️ 武器總覽</a>
            <a href="${r}pages/weapons-craft.html">⚒️ 武器防具製作</a>
            <a href="${r}pages/weapons-enhance.html">📜 強化說明</a>
            <a href="${r}pages/weapons-elemental.html">🔥 屬性強化卷軸</a>
            <a href="${r}pages/armor-overview.html">🛡️ 防具總覽</a>
            <a href="${r}pages/armor-craft.html">⚒️ 防具製作</a>
            <div class="nav-dd-divider"></div>
            <div class="nav-dd-label">圖鑑</div>
            <a href="${r}pages/boss-schedule.html">🌍 世界BOSS時刻表</a>
            <a href="${r}pages/boss-drops.html">🎁 BOSS掉落物</a>
            <a href="${r}pages/boss-collection.html">🖼️ BOSS收藏圖鑑</a>
            <a href="${r}pages/dolls-guide.html">🧸 娃娃介紹</a>
            <a href="${r}pages/dolls-list.html">🧸 娃娃圖鑑清單</a>
            <a href="${r}pages/dolls-sacred.html">✨ 聖物系統</a>
            <a href="${r}pages/transform-guide.html">🎭 變身圖鑑大全</a>
            <a href="${r}pages/transform-list.html">📖 變身收藏清單</a>
            <a href="${r}pages/map.html">🗺️ 地圖介紹</a>
          </div>
        </div>
        <!-- 道具 -->
        <div class="nav-item">
          <button class="nav-link-top">道具介紹 <span class="nav-arrow">▶</span></button>
          <div class="nav-dropdown">
            <a href="${r}pages/items-gacha.html">🎁 神奇扭蛋</a>
            <a href="${r}pages/items-dragon-eye.html">👁️ 四龍之魔眼</a>
            <a href="${r}pages/items-vip-card.html">👑 貴賓卡</a>
            <a href="${r}pages/items-candle.html">🕯️ 回憶蠟燭</a>
            <a href="${r}pages/items-pvp-badge.html">🛡️ 戰場PVP徽章</a>
          </div>
        </div>
        <!-- 玩家服務 -->
        <div class="nav-item">
          <button class="nav-link-top">玩家服務 <span class="nav-arrow">▶</span></button>
          <div class="nav-dropdown">
            <a href="${r}pages/sponsor.html">💎 贊助說明</a>
            <a href="${r}pages/faq.html">❓ 常見問題</a>
            <a href="${r}pages/promo.html">📜 推文說明</a>
            <a href="${r}pages/stream.html">🎥 直播說明</a>
            <div class="nav-dd-divider"></div>
            <a href="${r}admin/">網站後台</a>
          </div>
        </div>
      </nav>

      <div class="header-right">
        <a href="${C.lineOfficial}" target="_blank" rel="noopener" class="btn-line-o">
          LINE<span class="btn-label"> 官方客服</span>
        </a>
        <a href="${C.lineCommunity}" target="_blank" rel="noopener" class="btn-line-c">
          LINE<span class="btn-label"> 社群</span>
        </a>
        <a href="${r}register.html" class="btn-register">
          📝<span class="btn-label"> 申辦帳號</span>
        </a>
        <a href="${r}admin/" class="btn-admin">
          後台
        </a>
        <button class="btn-hamburger" id="hamburger-btn" onclick="forumToggleMobile()" aria-label="選單">☰</button>
      </div>
    </header>

    <!-- 行動版選單 -->
    <div id="mobile-menu">
      <div class="mob-section">主要</div>
      <a class="mob-link" href="${r}index.html">🏠 首頁</a>
      <a class="mob-link" href="${r}pages/download.html">📥 遊戲下載</a>
      <a class="mob-link" href="${r}pages/version.html">🔧 版本設定</a>
      <a class="mob-link" href="${r}pages/updates.html">📋 更新歷程</a>
      <a class="mob-link" href="${r}pages/news.html">📰 最新文章</a>
      <a class="mob-link" href="${r}pages/events.html">🎉 活動公告</a>

      <div class="mob-section">系統公告</div>
      <a class="mob-link mob-sub" href="${r}pages/disclaimer.html">🦊 免責聲明</a>
      <a class="mob-link mob-sub" href="${r}pages/rules.html">⛔ 遊戲管理規章</a>
      <a class="mob-link mob-sub" href="${r}pages/anti-cheat.html">🚫 外掛懲處條例</a>
      <a class="mob-link mob-sub" href="${r}pages/anti-detect.html">😈 防外掛偵測</a>
      <a class="mob-link mob-sub" href="${r}pages/job-transfer.html">🛡️ 轉職服務</a>
      <a class="mob-link mob-sub" href="${r}pages/accelerator.html">🤔 加速器迷思</a>
      <a class="mob-link mob-sub" href="${r}pages/office.html">💻 OFFICE 安裝</a>

      <div class="mob-section">遊戲特色</div>
      <a class="mob-link mob-sub" href="${r}pages/features-jobs.html">⚔️ 職業之力</a>
      <a class="mob-link mob-sub" href="${r}pages/features-job-skills.html">📚 職業特色技能</a>
      <a class="mob-link mob-sub" href="${r}pages/features-mage-summon.html">✨ 法師召喚系統</a>
      <a class="mob-link mob-sub" href="${r}pages/features-pet.html">🐾 寵物系統</a>
      <a class="mob-link mob-sub" href="${r}pages/features-prestige.html">🏆 威望系統</a>
      <a class="mob-link mob-sub" href="${r}pages/features-hecate.html">🌙 赫卡特介紹</a>
      <a class="mob-link mob-sub" href="${r}pages/features-online-bag.html">🎁 在線福袋</a>
      <a class="mob-link mob-sub" href="${r}pages/features-main-quest.html">📜 主線任務勳章</a>
      <a class="mob-link mob-sub" href="${r}pages/features-pendant.html">📿 傲慢的掛飾</a>
      <a class="mob-link mob-sub" href="${r}pages/features-hexagram.html">🔯 六芒星徽章</a>
      <a class="mob-link mob-sub" href="${r}pages/features-horse.html">🗿 戰馬雕像</a>
      <a class="mob-link mob-sub" href="${r}pages/features-high-pet.html">🪄 高寵介紹</a>

      <div class="mob-section">裝備道具</div>
      <a class="mob-link mob-sub" href="${r}pages/weapons-overview.html">⚔️ 武器總覽</a>
      <a class="mob-link mob-sub" href="${r}pages/weapons-craft.html">⚒️ 武器防具製作</a>
      <a class="mob-link mob-sub" href="${r}pages/weapons-enhance.html">📜 強化說明</a>
      <a class="mob-link mob-sub" href="${r}pages/weapons-elemental.html">🔥 屬性強化卷軸</a>
      <a class="mob-link mob-sub" href="${r}pages/armor-overview.html">🛡️ 防具總覽</a>
      <a class="mob-link mob-sub" href="${r}pages/armor-craft.html">⚒️ 防具製作</a>
      <a class="mob-link mob-sub" href="${r}pages/items-gacha.html">🎁 神奇扭蛋</a>
      <a class="mob-link mob-sub" href="${r}pages/items-dragon-eye.html">👁️ 四龍之魔眼</a>
      <a class="mob-link mob-sub" href="${r}pages/items-vip-card.html">👑 貴賓卡</a>
      <a class="mob-link mob-sub" href="${r}pages/items-candle.html">🕯️ 回憶蠟燭</a>
      <a class="mob-link mob-sub" href="${r}pages/items-pvp-badge.html">🛡️ 戰場PVP徽章</a>

      <div class="mob-section">圖鑑</div>
      <a class="mob-link mob-sub" href="${r}pages/boss-schedule.html">🌍 世界BOSS時刻表</a>
      <a class="mob-link mob-sub" href="${r}pages/boss-drops.html">🎁 BOSS掉落物</a>
      <a class="mob-link mob-sub" href="${r}pages/boss-collection.html">🖼️ BOSS收藏圖鑑</a>
      <a class="mob-link mob-sub" href="${r}pages/dolls-guide.html">🧸 娃娃介紹</a>
      <a class="mob-link mob-sub" href="${r}pages/dolls-list.html">🧸 娃娃圖鑑清單</a>
      <a class="mob-link mob-sub" href="${r}pages/dolls-sacred.html">✨ 聖物系統</a>
      <a class="mob-link mob-sub" href="${r}pages/transform-guide.html">🎭 變身圖鑑大全</a>
      <a class="mob-link mob-sub" href="${r}pages/transform-list.html">📖 變身收藏清單</a>
      <a class="mob-link mob-sub" href="${r}pages/map.html">🗺️ 地圖介紹</a>

      <div class="mob-section">玩家服務</div>
      <a class="mob-link mob-sub" href="${r}pages/sponsor.html">💎 贊助說明</a>
      <a class="mob-link mob-sub" href="${r}pages/faq.html">❓ 常見問題</a>
      <a class="mob-link mob-sub" href="${r}pages/promo.html">📜 推文說明</a>
      <a class="mob-link mob-sub" href="${r}pages/stream.html">🎥 直播說明</a>
      <a class="mob-link" href="${r}register.html">📝 申辦帳號</a>
      <a class="mob-link" href="${r}admin/">網站後台</a>
    </div>`;

    const slot = document.getElementById('header-slot');
    if (slot) slot.outerHTML = headerHTML;

    // 動態 title
    const h1 = document.querySelector('.page-hdr h1');
    const pageTitle = h1 ? h1.textContent.replace(/^[^\w\u4e00-\u9fff]+/, '') : '';
    document.title = (pageTitle ? pageTitle + ' · ' : '') + C.forumFullName;
  }

  /* 移除舊側欄 slot */
  function removeOldNav() {
    const slot = document.getElementById('nav-slot');
    if (slot) slot.remove();
  }

  /* 頁面標題裝飾線 */
  function addPageHdrLine() {
    const hdr = document.querySelector('.page-hdr');
    if (hdr && !hdr.querySelector('.page-hdr-line')) {
      const line = document.createElement('div');
      line.className = 'page-hdr-line';
      hdr.appendChild(line);
    }
  }

  /* ================================================================
     FOOTER
  ================================================================ */
  function buildFooter() {
    const C = FORUM_CONFIG;
    const r = root();
    const footerHTML = `
    <footer id="site-footer">
      <div class="footer-inner">
        <div>
          <div class="footer-col-title">⚔️ ${C.forumName}</div>
          <ul class="footer-links">
            <li><span style="color:var(--text-muted);font-size:12px;">${C.forumSlogan || '天堂私服論壇'}</span></li>
            <li><a href="${C.lineOfficial}" target="_blank" rel="noopener">LINE 官方客服</a></li>
            <li><a href="${C.lineCommunity}" target="_blank" rel="noopener">LINE 社群</a></li>
            <li><a href="${r}register.html">📝 申辦帳號</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">遊戲資訊</div>
          <ul class="footer-links">
            <li><a href="${r}pages/download.html">遊戲下載</a></li>
            <li><a href="${r}pages/version.html">版本設定</a></li>
            <li><a href="${r}pages/updates.html">更新歷程</a></li>
            <li><a href="${r}pages/events.html">活動公告</a></li>
            <li><a href="${r}pages/faq.html">常見問題</a></li>
            <li><a href="${r}pages/boss-schedule.html">BOSS時刻表</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">規章與服務</div>
          <ul class="footer-links">
            <li><a href="${r}pages/disclaimer.html">免責聲明</a></li>
            <li><a href="${r}pages/rules.html">遊戲管理規章</a></li>
            <li><a href="${r}pages/anti-cheat.html">外掛懲處條例</a></li>
            <li><a href="${r}pages/sponsor.html">贊助說明</a></li>
            <li><a href="${r}pages/promo.html">推文說明</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-copy">
        © ${new Date().getFullYear()} ${C.forumFullName} · 本站為私人架設，與 NC 公司無關 · 遊戲資產版權歸原著作權人所有
      </div>
    </footer>`;

    const slot = document.getElementById('footer-slot');
    if (slot) slot.outerHTML = footerHTML;
  }

  /* ================================================================
     浮動快捷視窗
  ================================================================ */
  function buildFloatingPanel() {
    const C = FORUM_CONFIG;
    if (!C.floatingPanel || !C.floatingPanel.enabled) return;
    const r = root();
    const links = C.floatingPanel.links || [];
    const panelOpen = window.matchMedia && window.matchMedia('(max-width: 640px)').matches ? '' : 'open';
    const html = `
    <div id="floating-panel" class="${panelOpen}">
      <button class="float-toggle" onclick="forumToggleFloat()" aria-label="快捷連結">
        <span>快捷</span>
      </button>
      <div class="float-box">
        <div class="float-head">
          <div>
            <strong>${escapeHTML(C.floatingPanel.title || '快捷連結')}</strong>
            <span>${escapeHTML(C.floatingPanel.note || '')}</span>
          </div>
          <button onclick="forumToggleFloat()" aria-label="收合">×</button>
        </div>
        <div class="float-links">
          ${links.map(link => {
            const url = resolveLink(link.url || '#', r);
            const external = /^https?:\/\//.test(url);
            return `<a class="float-link ${escapeHTML(link.style || 'dark')}" href="${url}" ${external ? 'target="_blank" rel="noopener"' : ''}>
              <span>${escapeHTML(link.icon || 'GO')}</span>
              <strong>${escapeHTML(link.label || '連結')}</strong>
            </a>`;
          }).join('')}
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function resolveLink(url, r) {
    if (/^(https?:|mailto:|tel:|#)/.test(url)) return url;
    return r + url.replace(/^\.\//, '');
  }

  /* ================================================================
     彈出公告
  ================================================================ */
  function initPopup() {
    const C = FORUM_CONFIG;
    if (!C.popup || !C.popup.enabled) return;
    if (C.popup.showOnce && sessionStorage.getItem('popup-shown')) return;

    const overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
    overlay.className = 'open';
    overlay.innerHTML = `
      <div class="popup-box" onclick="event.stopPropagation()">
        <button class="popup-close" onclick="forumClosePopup()">✕</button>
        <div class="popup-title">${C.popup.title}</div>
        <div class="popup-content">${C.popup.content}</div>
        <button class="popup-btn" onclick="forumClosePopup()">我已閱讀，關閉公告</button>
      </div>`;
    overlay.addEventListener('click', forumClosePopup);
    document.body.appendChild(overlay);

    if (C.popup.showOnce) sessionStorage.setItem('popup-shown', '1');
  }

  /* ================================================================
     導覽高亮
  ================================================================ */
  function highlightNav() {
    const path = window.location.pathname;
    document.querySelectorAll('#main-nav .nav-link-top[href], .nav-dropdown a').forEach(a => {
      if (a.getAttribute('href') && path.endsWith(a.getAttribute('href').replace(/^.*\//, ''))) {
        a.classList.add('active');
      }
    });
    document.querySelectorAll('#mobile-menu .mob-link').forEach(a => {
      if (a.getAttribute('href') && path.endsWith(a.getAttribute('href').replace(/^.*\//, ''))) {
        a.style.color = 'var(--gold)';
      }
    });
  }

  // 啟動
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/* ================================================================
   全域函式
================================================================ */
function forumToggleMobile() {
  const m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('open');
}
function forumClosePopup() {
  const o = document.getElementById('popup-overlay');
  if (o) o.classList.remove('open');
}
function forumToggleFloat() {
  const p = document.getElementById('floating-panel');
  if (p) p.classList.toggle('open');
}
