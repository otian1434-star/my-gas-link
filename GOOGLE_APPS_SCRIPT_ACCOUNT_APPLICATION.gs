const SHEET_NAME = '申請資料';
const TOKEN = '';

const COLUMN_WIDTHS = [170, 140, 130, 130, 150, 230, 150, 130, 420, 220, 160];

const HEADERS = [
  '送出時間',
  '遊戲帳號',
  '遊戲密碼',
  '暱稱',
  '職業與性別',
  '電子信箱',
  '手機號碼',
  '如何得知',
  '來源頁面',
  '備註',
  'LINE ID'
];

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = (e && e.parameter) || {};
    if (TOKEN && data.token !== TOKEN) {
      throw new Error('Invalid token');
    }

    const sheet = getApplicationSheet_();

    // 伺服器端重複防護：遊戲帳號與暱稱皆不可重複（即使前端檢查被略過也擋得住）
    const dup = checkDuplicates_(sheet, data.gameAccount, data.playerName);
    if (dup.accountTaken || dup.nameTaken) {
      return json_({ ok: false, error: 'duplicate', accountTaken: dup.accountTaken, nameTaken: dup.nameTaken });
    }

    const row = [
      new Date(),
      text_(data.gameAccount),
      text_(data.gamePassword),
      text_(data.playerName),
      text_(data.characterChoice),
      text_(data.email),
      normalizePhone_(data.phone),
      text_(data.source),
      text_(data.pageUrl),
      '',
      text_(data.lineId)
    ];
    const nextRow = sheet.getLastRow() + 1;
    setTextColumns_(sheet, nextRow);
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    formatDataRows_(sheet);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (err) {
      // The lock may not be acquired if the request fails early.
    }
  }
}

function doGet(e) {
  const params = (e && e.parameter) || {};

  // 查詢是否已註冊：/exec?action=check&account=xxx&name=yyy&callback=fn
  if (params.action === 'check') {
    const sheet = getApplicationSheet_();
    const dup = checkDuplicates_(sheet, params.account, params.name);
    return reply_({ ok: true, accountTaken: dup.accountTaken, nameTaken: dup.nameTaken }, params.callback);
  }

  return reply_({ ok: true, message: '曜舞天堂申請資料接收端正常運作' }, params.callback);
}

// 比對遊戲帳號（第 2 欄）與暱稱（第 4 欄）是否已存在；比對時去頭尾空白、不分大小寫
function checkDuplicates_(sheet, account, name) {
  const acc = normalizeKey_(account);
  const nm = normalizeKey_(name);
  const lastRow = sheet.getLastRow();
  let accountTaken = false;
  let nameTaken = false;

  if (lastRow > 1) {
    const values = sheet.getRange(2, 2, lastRow - 1, 3).getValues(); // 第2~4欄：帳號、密碼、暱稱
    for (let i = 0; i < values.length; i += 1) {
      if (acc && normalizeKey_(values[i][0]) === acc) accountTaken = true; // 第2欄=遊戲帳號
      if (nm && normalizeKey_(values[i][2]) === nm) nameTaken = true;       // 第4欄=暱稱
    }
  }

  return { accountTaken: accountTaken, nameTaken: nameTaken };
}

function normalizeKey_(value) {
  return String(value == null ? '' : value).trim().toLowerCase();
}

// 有帶 callback 就回 JSONP（JavaScript），否則回純 JSON
function reply_(payload, callback) {
  const body = JSON.stringify(payload);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + body + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(body)
    .setMimeType(ContentService.MimeType.JSON);
}

function formatExistingApplicationSheet() {
  const sheet = getApplicationSheet_();
  formatDataRows_(sheet);
}

function getApplicationSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  formatHeader_(sheet);

  return sheet;
}

function formatHeader_(sheet) {
  const lastCol = HEADERS.length;
  const headerRange = sheet.getRange(1, 1, 1, lastCol);

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, lastCol).setValues([HEADERS]);
  headerRange
    .setBackground('#2a1f12')
    .setFontColor('#f6d98b')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 34);

  COLUMN_WIDTHS.forEach(function (width, index) {
    sheet.setColumnWidth(index + 1, width);
  });

  sheet.getRange(1, 1, sheet.getMaxRows(), lastCol).setFontFamily('Noto Sans TC');
}

function formatDataRows_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastCol = HEADERS.length;

  if (lastRow <= 1) return;

  const rowCount = lastRow - 1;
  const dataRange = sheet.getRange(2, 1, rowCount, lastCol);
  const backgrounds = [];

  normalizePhoneColumn_(sheet, rowCount);

  for (let i = 0; i < rowCount; i += 1) {
    backgrounds.push(new Array(lastCol).fill(i % 2 === 0 ? '#fff8e8' : '#f5eddc'));
  }

  dataRange
    .setBackgrounds(backgrounds)
    .setFontColor('#2a2118')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setWrap(true)
    .setBorder(true, true, true, true, true, true, '#dcc68c', SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange(2, 1, rowCount, 1).setNumberFormat('yyyy/mm/dd hh:mm:ss');
  sheet.getRange(2, 2, rowCount, lastCol - 1).setNumberFormat('@');
  sheet.getRange(2, 2, rowCount, 6).setHorizontalAlignment('left');
  sheet.getRange(2, 7, rowCount, 2).setHorizontalAlignment('center');
  sheet.getRange(2, 9, rowCount, 2).setHorizontalAlignment('left');
  sheet.setRowHeights(2, rowCount, 34);
  ensureFilter_(sheet);
}

function normalizePhoneColumn_(sheet, rowCount) {
  const phoneRange = sheet.getRange(2, 7, rowCount, 1);
  const values = phoneRange.getValues().map(function (row) {
    return [normalizePhone_(row[0])];
  });

  phoneRange.setNumberFormat('@');
  phoneRange.setValues(values);
}

function ensureFilter_(sheet) {
  if (sheet.getFilter()) return;
  sheet.getRange(1, 1, sheet.getLastRow(), HEADERS.length).createFilter();
}

function setTextColumns_(sheet, row) {
  sheet
    .getRange(row, 2, 1, HEADERS.length - 1)
    .setNumberFormat('@');
}

function text_(value) {
  return String(value || '').trim();
}

function normalizePhone_(value) {
  const phone = text_(value);
  const digits = phone.replace(/[^\d]/g, '');

  if (/^9\d{8}$/.test(digits)) {
    return `0${digits}`;
  }

  return phone;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
