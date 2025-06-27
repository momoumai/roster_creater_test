// 週の数
const NUM_WEEK = 5;
// 曜日の数
const NUM_WEEKDAY = 5;
// 午前と午後
const NUM_TIME_FLAME = 2;
// テストケースの数
const NUM_TEST_CASE = 26;

const scriptProperties = PropertiesService.getScriptProperties();

// テストデータを持つスプレッドシート
const TEST_DATA_SHEET_ID = scriptProperties.getProperty("TEST_DATA_SHEET_ID");
const testDataSpreadSheet = SpreadsheetApp.openById(TEST_DATA_SHEET_ID);

const testSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

const testCaseSheet = testSpreadSheet.getSheetByName("テストケース");