class TestData{

  constructor(testCaseNum){
    this.testCaseNum = testCaseNum;

    this.userListSheet = testDataSpreadSheet.getSheetByName(`テスト${testCaseNum}_user`);

    this.isFullDayDuty = testCaseSheet.getRange(testCaseNum + 2, 9).getValue();

    this.numUser = this.userListSheet.getRange(2, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow() - 1;

    this.numDuty = this.getNumDuty();

    this.numDayRow = this.isFullDayDuty ? this.numDuty + 1 : this.numDuty * NUM_TIME_FLAME + 1;

    this.userListData = this.userListSheet.getRange(2, 1, this.numUser + 1, this.numDuty + 1).getValues();

    this.scheduleData = this.getScheduleData();
    this.rosterData = this.getRosterData();
  }

  getScheduleData(){
    const scheduleSheet = testDataSpreadSheet.getSheetByName(`テスト${this.testCaseNum}_schedule`);
    const firstDate = scheduleSheet.getRange(1, 3).getValue();
    const lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);
    return scheduleSheet.getRange(2, 3, this.numUser * 2 + 1, lastDate).getValues();
  }

  getRosterData(){
    const rosterSheet = testDataSpreadSheet.getSheetByName(`テスト${this.testCaseNum}_roster`);
    const rosterLastRow = this.numDayRow * NUM_WEEK;
    const rosterLastColumn = NUM_WEEKDAY;
    return rosterSheet.getRange(2, 3, rosterLastRow, rosterLastColumn).getValues();
  }

  getNumDuty(){
    let numDuty = 0;
    for(let dutyIndex = 0; ; dutyIndex++){
      const column = dutyIndex + 2;
      const dutyName = this.userListSheet.getRange(1, column).getValue();
      if(dutyName === "") break;
      numDuty++;
    }
  return numDuty;
  }
  
}
