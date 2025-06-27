// すべてのテストケースをテストする
function testAllData(){
  for(let testCaseNum = 1; testCaseNum <= NUM_TEST_CASE; testCaseNum++){
    console.log(`テスト${testCaseNum}`);
    // checkPresentUserAssigned(testCaseNum);
    checkAvailableUserAssigned(testCaseNum);
  }
}

// 特定のテストケースのテストをする
function testOneData(){
  checkPresentUserAssigned(27);
  checkAvailableUserAssigned(27);
}

function checkPresentUserAssigned(testCaseNum){
  const testData = new TestData(testCaseNum);
  const presentUserChecker = new PresentUserChecker(testData);
  presentUserChecker.checkValidRoster();
}

function checkAvailableUserAssigned(testCaseNum){
  const testData = new TestData(testCaseNum);
  const availableUserChecker = new AvailableUserChecker(testData);
  availableUserChecker.checkValidRoster();
}

