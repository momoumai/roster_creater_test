function testAllData(){
  for(let testCaseNum = 1; testCaseNum <= NUM_TEST_CASE; testCaseNum++){
    console.log(`テスト${testCaseNum}`);
    // checkPresentUserAssigned(testCaseNum);
    checkAvailableUserAssigned(testCaseNum);
  }
}

function testOneData(){
  // checkPresentUserAssigned(1);
  checkAvailableUserAssigned(1);
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


