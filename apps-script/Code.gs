/**
 * YieldAtlas / GrowthAtlas vote Apps Script stub
 * Deploy: Extensions → Apps Script → Deploy → New deployment → Web app
 * Execute as: Me; Who has access: Anyone
 *
 * Client contract (same as competitor static sites):
 *   GET  /exec           → JSON map { [symbol]: voteCount }
 *   POST /exec           → body JSON { symbol, action: "vote" } → { ok: true, votes }
 *
 * Rate limit remains client-side (localStorage, ~10/hour).
 */

var SHEET_NAME = "Votes"; // columns: Symbol | Votes

function doGet(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var out = {};
  for (var i = 1; i < data.length; i++) {
    var sym = String(data[i][0] || "").trim().toUpperCase();
    if (!sym) continue;
    out[sym] = Number(data[i][1]) || 0;
  }
  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var body = {};
  try { body = JSON.parse(e.postData.contents || "{}"); } catch (err) {}
  var symbol = String(body.symbol || "").trim().toUpperCase();
  if (!symbol || body.action !== "vote") {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "bad_request" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var found = -1;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim().toUpperCase() === symbol) { found = i + 1; break; }
  }
  var votes = 1;
  if (found > 0) {
    votes = (Number(sheet.getRange(found, 2).getValue()) || 0) + 1;
    sheet.getRange(found, 2).setValue(votes);
  } else {
    sheet.appendRow([symbol, 1]);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, symbol: symbol, votes: votes }))
    .setMimeType(ContentService.MimeType.JSON);
}
