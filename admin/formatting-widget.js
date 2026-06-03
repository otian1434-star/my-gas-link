(function () {
  'use strict';

  var h = window.h;
  var createClass = window.createClass;
  var CMS = window.CMS;

  if (!CMS || !h || !createClass) return;

  function escapeHTML(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function inlineFormat(value) {
    var text = escapeHTML(value);
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    text = text.replace(/\[TAG:([^\]]+)\]/g, function (_, tag) {
      var colorMap = { '開服': 'red', '活動': 'red', '維護': 'blue', '更新': 'blue', '重要': 'red', '提示': 'blue', '完成': 'green', '成功': 'green' };
      var cls = colorMap[tag] || 'gold';
      return '<span class="yw-tag ' + cls + '">' + escapeHTML(tag) + '</span>';
    });
    return text;
  }

  function renderMarkdown(value) {
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
          cells.forEach(function (cell) { html += '<th>' + inlineFormat(cell) + '</th>'; });
          html += '</tr></thead><tbody>';
          inTable = true;
        } else {
          html += '<tr>';
          cells.forEach(function (cell) { html += '<td>' + inlineFormat(cell) + '</td>'; });
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
        html += '<h4>' + inlineFormat(trimmed.slice(4)) + '</h4>';
        return;
      }
      if (trimmed.indexOf('## ') === 0) {
        closeList();
        html += '<h3>' + inlineFormat(trimmed.slice(3)) + '</h3>';
        return;
      }
      if (trimmed.indexOf('# ') === 0) {
        closeList();
        html += '<h2>' + inlineFormat(trimmed.slice(2)) + '</h2>';
        return;
      }
      if (trimmed === '---') {
        closeList();
        html += '<hr>';
        return;
      }
      if (trimmed === '===') {
        closeList();
        html += '<div class="yw-divider">- * * * -</div>';
        return;
      }
      if (trimmed.indexOf('!!! ') === 0) {
        closeList();
        html += '<div class="yw-callout red">' + inlineFormat(trimmed.slice(4)) + '</div>';
        return;
      }
      if (trimmed.indexOf('??? ') === 0) {
        closeList();
        html += '<div class="yw-callout blue">' + inlineFormat(trimmed.slice(4)) + '</div>';
        return;
      }
      if (trimmed.indexOf('+++ ') === 0) {
        closeList();
        html += '<div class="yw-callout green">' + inlineFormat(trimmed.slice(4)) + '</div>';
        return;
      }
      if (trimmed.indexOf('> ') === 0) {
        closeList();
        html += '<blockquote>' + inlineFormat(trimmed.slice(2)) + '</blockquote>';
        return;
      }
      if (trimmed.indexOf('- ') === 0 || trimmed.indexOf('* ') === 0 || trimmed.indexOf('• ') === 0) {
        if (inOl) { html += '</ol>'; inOl = false; }
        if (!inUl) { html += '<ul>'; inUl = true; }
        html += '<li>' + inlineFormat(trimmed.slice(2)) + '</li>';
        return;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        if (inUl) { html += '</ul>'; inUl = false; }
        if (!inOl) { html += '<ol>'; inOl = true; }
        html += '<li>' + inlineFormat(trimmed.replace(/^\d+\.\s/, '')) + '</li>';
        return;
      }

      closeList();
      html += '<p>' + inlineFormat(trimmed) + '</p>';
    });

    closeList();
    closeTable();
    return html;
  }

  function insertAt(text, start, end, before, after) {
    var selected = text.slice(start, end) || '文字';
    var next = text.slice(0, start) + before + selected + after + text.slice(end);
    return {
      value: next,
      start: start + before.length,
      end: start + before.length + selected.length,
    };
  }

  function tableTemplate() {
    return '\n| 欄位一 | 欄位二 | 欄位三 |\n| --- | --- | --- |\n| 內容 | 內容 | 內容 |\n| 內容 | 內容 | 內容 |\n';
  }

  var TEMPLATES = {
    announcement: '# [TAG:活動] 活動公告標題\n\n[TAG:開服] 開始時間：2026/03/01 20:00\n\n## 活動說明\n\n活動期間全服玩家可獲得豐厚獎勵！\n\n## 活動內容\n\n- 限時雙倍經驗值\n- 登入即送 **藍鑽 x100**\n- 推文可獲得額外獎勵\n\n!!! 本活動獎勵為一次性發放，請務必在期限內領取。\n\n+++ 如有任何問題，請聯繫官方 LINE 客服。',
    update: '# 版本更新公告\n\n[TAG:維護] 維護時間：2026/03/05 00:00 - 06:00\n\n## 本次更新內容\n\n### 新增內容\n- 新增世界 BOSS\n- 新增活動獎勵\n\n### 調整優化\n- 優化伺服器連線穩定性\n- 調整部分掉落設定\n\n---\n\n!!! 維護期間玩家將暫時無法登入。',
    guide: '# 系統介紹標題\n\n## 基本說明\n\n在這裡輸入系統的基本說明。\n\n## 功能特色\n\n- 特色一：說明內容\n- 特色二：說明內容\n- 特色三：說明內容\n\n??? 如有不清楚的地方，可詢問管理員。',
    rules: '# 規則條款標題\n\n## 第一章 基本規範\n\n- 禁止規則一\n- 禁止規則二\n- 禁止規則三\n\n!!! 違反上述規範者，管理團隊將視情節輕重給予處罰。\n\n## 處罰辦法\n\n| 違規行為 | 處罰方式 | 備註 |\n| --- | --- | --- |\n| 輕度違規 | 警告 1 次 | 首次違規 |\n| 中度違規 | 暫停帳號 7 天 | 累計 2 次 |',
    item: '# 道具名稱\n\n## 基本資訊\n\n| 屬性 | 內容 |\n| --- | --- |\n| 道具類型 | 消耗品 / 裝備 |\n| 取得方式 | BOSS 掉落 / 商城購買 |\n\n## 道具效果\n\n- 效果一：說明\n- 效果二：說明\n\n!!! 此道具使用後無法退還，請確認後再使用。',
  };

  var FormattingControl = createClass({
    getDefaultProps: function () {
      return { value: '' };
    },

    setTextarea: function (node) {
      this.textarea = node;
    },

    changeValue: function (value) {
      this.props.onChange(value);
    },

    insertSyntax: function (before, after) {
      var textarea = this.textarea;
      var value = this.props.value || '';
      var start = textarea ? textarea.selectionStart : value.length;
      var end = textarea ? textarea.selectionEnd : value.length;
      var result = insertAt(value, start, end, before, after || '');
      this.changeValue(result.value);
      window.setTimeout(function () {
        if (!textarea) return;
        textarea.focus();
        textarea.selectionStart = result.start;
        textarea.selectionEnd = result.end;
      }, 0);
    },

    insertRaw: function (raw) {
      var textarea = this.textarea;
      var value = this.props.value || '';
      var start = textarea ? textarea.selectionStart : value.length;
      var next = value.slice(0, start) + raw + value.slice(start);
      this.changeValue(next);
      window.setTimeout(function () {
        if (!textarea) return;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + raw.length;
      }, 0);
    },

    applyTemplate: function (name) {
      var value = this.props.value || '';
      if (value.trim() && !window.confirm('套用範本會覆蓋目前內文，確定繼續？')) return;
      this.changeValue(TEMPLATES[name] || '');
    },

    clearAll: function () {
      if (!window.confirm('確定清除內文？')) return;
      this.changeValue('');
    },

    renderButton: function (label, before, after, className) {
      var self = this;
      return h('button', {
        type: 'button',
        className: 'yw-editor-button' + (className ? ' ' + className : ''),
        onClick: function () { self.insertSyntax(before, after || ''); },
      }, label);
    },

    renderTemplateButton: function (label, name) {
      var self = this;
      return h('button', {
        type: 'button',
        className: 'yw-editor-button',
        onClick: function () { self.applyTemplate(name); },
      }, label);
    },

    render: function () {
      var self = this;
      var value = this.props.value || '';
      var preview = value.trim() ? renderMarkdown(value) : '<div class="yw-editor-empty">開始輸入文章後，這裡會即時預覽網站排版</div>';

      return h('div', { className: this.props.classNameWrapper },
        h('div', { className: 'yw-editor' }, [
          h('div', { className: 'yw-editor-toolbar' }, [
            this.renderButton('H1', '# ', ''),
            this.renderButton('H2', '## ', ''),
            this.renderButton('H3', '### ', ''),
            this.renderButton('粗體', '**', '**'),
            this.renderButton('代碼', '`', '`'),
            this.renderButton('引用', '> ', ''),
            this.renderButton('清單', '- ', ''),
            this.renderButton('編號', '1. ', ''),
            h('button', { type: 'button', className: 'yw-editor-button', onClick: function () { self.insertRaw(tableTemplate()); } }, '表格'),
            this.renderButton('分隔線', '\n---\n', ''),
            this.renderButton('章節線', '\n===\n', ''),
            this.renderButton('警示', '!!! ', ''),
            this.renderButton('提示', '??? ', ''),
            this.renderButton('完成', '+++ ', ''),
            this.renderButton('標籤', '[TAG:', ']'),
            h('button', { type: 'button', className: 'yw-editor-button danger', onClick: this.clearAll }, '清除'),
          ]),
          h('div', { className: 'yw-editor-templates' }, [
            this.renderTemplateButton('活動公告範本', 'announcement'),
            this.renderTemplateButton('更新公告範本', 'update'),
            this.renderTemplateButton('攻略範本', 'guide'),
            this.renderTemplateButton('規章範本', 'rules'),
            this.renderTemplateButton('道具範本', 'item'),
          ]),
          h('div', { className: 'yw-editor-grid' }, [
            h('div', { className: 'yw-editor-pane' }, [
              h('div', { className: 'yw-editor-head' }, [
                h('span', {}, '文章內文'),
                h('span', { className: 'yw-editor-count' }, value.length + ' 字'),
              ]),
              h('textarea', {
                id: this.props.forID,
                ref: this.setTextarea,
                className: 'yw-editor-textarea',
                value: value,
                placeholder: '# 文章標題\n\n## 段落標題\n\n- 清單項目\n- 清單項目\n\n!!! 重要提醒\n\n| 欄位一 | 欄位二 |\n| --- | --- |\n| 內容 | 內容 |',
                onChange: function (event) { self.changeValue(event.target.value); },
              }),
            ]),
            h('div', { className: 'yw-editor-pane' }, [
              h('div', { className: 'yw-editor-head' }, [
                h('span', {}, '即時預覽'),
                h('span', { className: 'yw-editor-count' }, '網站效果'),
              ]),
              h('div', {
                className: 'yw-editor-preview yw-preview',
                dangerouslySetInnerHTML: { __html: preview },
              }),
            ]),
          ]),
        ])
      );
    },
  });

  CMS.registerWidget('yaowu_markdown', FormattingControl);
})();
