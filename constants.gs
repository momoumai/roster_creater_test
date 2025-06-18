const scriptProperties = PropertiesService.getScriptProperties();

const TEST_DATA_SHEET_ID = scriptProperties.getProperty("TEST_DATA_SHEET_ID");
const DOCUMENT_SHEET_ID = scriptProperties.getProperty("DOCUMENT_SHEET_ID");

const testDataSpreadSheet = SpreadsheetApp.openById(TEST_DATA_SHEET_ID);
const documentSpreadSheet = SpreadsheetApp.openById(DOCUMENT_SHEET_ID);

const testCaseSheet = documentSpreadSheet.getSheetByName("テストケース");

const NUM_WEEK = 5;
const NUM_WEEKDAY = 5;
const NUM_TIME_FLAME = 2;
const NUM_TEST_CASE = 26;