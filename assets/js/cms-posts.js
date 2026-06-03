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

  function inlineMarkdown(value) {
    var text = escapeHTML(value);
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/\[TAG:([^\]]+)\]/g, function (_, tag) {
      var colorMap = { '開服': 'red', '活動': 'red', '維護': 'blue', '更新': 'blue', '重要': 'red', '提示': 'blue', '完成': 'green', '成功': 'green' };
      var cls = colorMap[tag] || 'gold';
      return '<span class="cms-tag ' + cls + '">' + escapeHTML(tag) + '</span>';
    });
    return text;
  }

  function markdownLite(value) {
    var lines = String(value || '').split('\n');
    var html = '';
    var inUl = false;
    var inOl = false;
    var inTable = false;

    function closeList() {
      if (inUl) { html += '</ul>'; inUl = false; }
      if (inOl) { html += '</ol>'; inOl = false; }
    }

    function closeTable() {
      if (inTable) { html += '</tbody></table>'; inTable = false; }
    }

    lines.forEach(function (line) {
      var trimmed = line.trim();

      if (trimmed.indexOf('|') === 0 && trimmed.lastIndexOf('|') === trimmed.length - 1) {
        var cells = trimmed.slice(1, -1).split('|').map(function (cell) { return cell.trim(); });
        if (cells.every(function (cell) { return /^[-: ]+$/.test(cell); })) return;
        closeList();
        if (!inTable) {
          html += '<table><thead><tr>';
          cells.forEach(function (cell) { html += '<th>' + inlineMarkdown(cell) + '</th>'; });
          html += '</tr></thead><tbody>';
          inTable = true;
        } else {
          html += '<tr>';
          cells.forEach(function (cell) { html += '<td>' + inlineMarkdown(cell) + '</td>'; });
          html += '</tr>';
        }
        return;
      }

      closeTable();

      if (!trimmed) {
        closeList();
        return;
      }
      if (trimmed.indexOf('### ') === 0) {
        closeList();
        html += '<h3>' + inlineMarkdown(trimmed.slice(4)) + '</h3>';
        return;
      }
      if (trimmed.indexOf('## ') === 0) {
        closeList();
        html += '<h2>' + inlineMarkdown(trimmed.slice(3)) + '</h2>';
        return;
      }
      if (trimmed.indexOf('# ') === 0) {
        closeList();
        html += '<h2>' + inlineMarkdown(trimmed.slice(2)) + '</h2>';
        return;
      }
      if (trimmed === '---') {
        closeList();
        html += '<hr>';
        return;
      }
      if (trimmed === '===') {
        closeList();
        html += '<div class="cms-divider">- * * * -</div>';
        return;
      }
      if (trimmed.indexOf('!!! ') === 0) {
        closeList();
        html += '<div class="cms-callout red">' + inlineMarkdown(trimmed.slice(4)) + '</div>';
        return;
      }
      if (trimmed.indexOf('??? ') === 0) {
        closeList();
        html += '<div class="cms-callout blue">' + inlineMarkdown(trimmed.slice(4)) + '</div>';
        return;
      }
      if (trimmed.indexOf('+++ ') === 0) {
        closeList();
        html += '<div class="cms-callout green">' + inlineMarkdown(trimmed.slice(4)) + '</div>';
        return;
      }
      if (trimmed.indexOf('> ') === 0) {
        closeList();
        html += '<blockquote>' + inlineMarkdown(trimmed.slice(2)) + '</blockquote>';
        return;
      }
      if (trimmed.indexOf('- ') === 0 || trimmed.indexOf('* ') === 0 || trimmed.indexOf('• ') === 0) {
        if (inOl) { html += '</ol>'; inOl = false; }
        if (!inUl) { html += '<ul>'; inUl = true; }
        html += '<li>' + inlineMarkdown(trimmed.slice(2)) + '</li>';
        return;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        if (inUl) { html += '</ul>'; inUl = false; }
        if (!inOl) { html += '<ol>'; inOl = true; }
        html += '<li>' + inlineMarkdown(trimmed.replace(/^\d+\.\s/, '')) + '</li>';
        return;
      }

      closeList();
      html += '<p>' + inlineMarkdown(trimmed) + '</p>';
    });

    closeList();
    closeTable();
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
      parts.push('<div class="cms-markdown">' + sanitizeTrustedHTML(markdownLite(post.body || post.excerpt || '')) + '</div>');
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
