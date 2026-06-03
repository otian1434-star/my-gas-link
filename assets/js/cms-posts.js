(function () {
  'use strict';

  function root() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
  }

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function stripHTML(value) {
    return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  function sortPosts(posts) {
    return posts.slice().sort(function (a, b) {
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      return String(b.date || '').localeCompare(String(a.date || ''));
    });
  }

  function loadPosts() {
    return fetch(root() + 'data/posts.json', { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('posts not found');
        return res.json();
      })
      .then(function (data) {
        return sortPosts((data.posts || []).filter(function (post) {
          return post.published !== false;
        }));
      });
  }

  function renderAnnouncements(target, fallbackConfig) {
    loadPosts().then(function (posts) {
      if (!posts.length) throw new Error('empty posts');
      const tagMap = { '公告': 'tag-sys', '活動': 'tag-event', '更新': 'tag-update', '規章': 'tag-sys', '攻略': 'tag-new', '下載': 'tag-update', '制裁名單': 'tag-sys' };
      target.innerHTML = posts.slice(0, 4).map(function (post, index) {
        const tagClass = tagMap[post.category] || 'tag-event';
        return '<a class="ann-card" href="pages/news.html#post-' + index + '">' +
          '<div class="ann-card-meta">' +
          '<span class="ann-tag ' + tagClass + '">' + escapeHTML(post.category) + '</span>' +
          '<span class="ann-date">' + escapeHTML(post.date) + '</span>' +
          '</div>' +
          '<div class="ann-card-title">' + escapeHTML(post.title) + '</div>' +
          '<div class="ann-card-excerpt">' + escapeHTML(post.excerpt || stripHTML(post.body || post.customHtml || '')) + '</div>' +
          '<div class="ann-card-more">閱讀更多 →</div>' +
          '</a>';
      }).join('');
    }).catch(function () {
      renderFallbackAnnouncements(target, fallbackConfig);
    });
  }

  function renderFallbackAnnouncements(target, C) {
    if (C.updates && C.updates.length) {
      const tagMap = { '開服': 'tag-new', '活動': 'tag-event', '系統': 'tag-sys', '更新': 'tag-update' };
      target.innerHTML = C.updates.slice(0, 4).map(function (u) {
        const tagClass = tagMap[u.tag] || 'tag-event';
        return '<a class="ann-card" href="pages/updates.html">' +
          '<div class="ann-card-meta">' +
          '<span class="ann-tag ' + tagClass + '">' + escapeHTML(u.tag) + '</span>' +
          '<span class="ann-date">' + escapeHTML(u.date) + '</span>' +
          '</div>' +
          '<div class="ann-card-title">' + escapeHTML(u.title || String(u.content || '').substring(0, 30)) + '</div>' +
          '<div class="ann-card-excerpt">' + escapeHTML(u.content) + '</div>' +
          '<div class="ann-card-more">閱讀更多 →</div>' +
          '</a>';
      }).join('');
    } else {
      target.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:30px 0;letter-spacing:2px;">暫無公告</p>';
    }
  }

  function markdownLite(value) {
    var html = escapeHTML(value)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*)$/gm, '<h2>$1</h2>')
      .replace(/^&gt; (.*)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^---$/gm, '<hr>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\- (.*)$/gm, '<li>$1</li>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>');
    html = html.replace(/(<li>.*?<\/li>)(<br>)?/gs, function (match) {
      return '<ul>' + match.replace(/<br>/g, '') + '</ul>';
    });
    return html;
  }

  function sanitizeTrustedHTML(value) {
    var template = document.createElement('template');
    template.innerHTML = String(value || '');
    template.content.querySelectorAll('script').forEach(function (node) {
      node.remove();
    });
    template.content.querySelectorAll('*').forEach(function (node) {
      Array.from(node.attributes).forEach(function (attr) {
        var name = attr.name.toLowerCase();
        var value = String(attr.value || '').trim().toLowerCase();
        if (name.indexOf('on') === 0 || value.indexOf('javascript:') === 0) {
          node.removeAttribute(attr.name);
        }
      });
    });
    return template.innerHTML;
  }

  function renderPostBody(post) {
    var parts = [];
    if (post.coverImage) {
      parts.push('<img class="post-cover" src="' + escapeHTML(post.coverImage) + '" alt="' + escapeHTML(post.title) + '">');
    }
    if (post.body || post.excerpt) {
      parts.push('<div class="cms-markdown"><p>' + sanitizeTrustedHTML(markdownLite(post.body || post.excerpt || '')) + '</p></div>');
    }
    if (post.customHtml) {
      parts.push('<div class="cms-custom-html">' + sanitizeTrustedHTML(post.customHtml) + '</div>');
    }
    return parts.join('');
  }

  function renderNewsList(target) {
    loadPosts().then(function (posts) {
      target.innerHTML = posts.length ? posts.map(function (post, index) {
        return '<article class="post-card post-layout-' + escapeHTML(post.layout || 'standard') + '" id="post-' + index + '">' +
          '<h2>' + escapeHTML(post.title) + '</h2>' +
          '<div class="post-meta"><span>' + escapeHTML(post.category) + '</span><span>' + escapeHTML(post.date) + '</span>' + (post.pinned ? '<span>置頂</span>' : '') + '</div>' +
          '<div class="post-body cms-rich">' + renderPostBody(post) + '</div>' +
          '</article>';
      }).join('') : '<div class="notice blue">目前尚無文章。</div>';
    }).catch(function () {
      target.innerHTML = '<div class="notice red">文章資料讀取失敗，請確認 data/posts.json 是否存在。</div>';
    });
  }

  window.ForumCmsPosts = {
    loadPosts,
    renderAnnouncements,
    renderNewsList,
  };
})();
