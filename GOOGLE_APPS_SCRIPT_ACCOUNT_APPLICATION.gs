const SHEET_NAME = '申請資料';
const TOKEN = '';

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
  '備註'
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
    sheet.appendRow([
      new Date(),
      data.gameAccount || '',
      data.gamePassword || '',
      data.playerName || '',
      data.characterChoice || '',
      data.email || '',
      data.phone || '',
      data.source || '',
      data.pageUrl || '',
      ''
    ]);

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

function doGet() {
  return json_({ ok: true, message: '曜舞天堂申請資料接收端正常運作' });
}

function getApplicationSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
