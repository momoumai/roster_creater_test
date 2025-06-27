class PresentUserChecker{

  // その日に通所予定の利用者が割り当てられていることを検証するクラス

  constructor(testData){
    this.userListData = testData.userListData;
    this.scheduleData = testData.scheduleData;
    this.userListData = testData.userListData;
    this.rosterData = testData.rosterData;
    this.isFullDayDuty = testData.isFullDayDuty;
    this.numDuty = testData.numDuty;
    this.numDayRow = testData.numDayRow;
    this.numUser = testData.numUser;
    this.userNameToIndexMap = new Map(new Array(this.numUser).fill(0).map((_,userIndex) => {
      return [this.userListData[userIndex][0], userIndex];
    }));
  }

  // すべての日付の当番割り当てが正しいかどうか確認する
  checkValidRoster(){
    for(let weekIndex = 0; weekIndex < NUM_WEEK; weekIndex++){
      for(let weekDayIndex = 0; weekDayIndex < NUM_WEEKDAY; weekDayIndex++){
        const row = weekIndex * this.numDayRow;
        const column = weekDayIndex
        const date = this.rosterData[row][column];
        if(date === "") continue;
        if(this.isFullDayDuty){
          this.checkValidAssignment(date, row, column, 0, NUM_TIME_FLAME);
        } else {
          for(let timeFlameIndex = 0; timeFlameIndex < NUM_TIME_FLAME; timeFlameIndex++){
            this.checkValidAssignment(date, row, column, timeFlameIndex, 1);
          }
        }
      }
    }
  }

  // 特定の日付の当番割り当てが正しいかどうか確認する
  checkValidAssignment(date, row, column, timeFlameIndex, numTimeFlame){
    for(let dutyIndex = 0; dutyIndex < this.numDuty; dutyIndex++){
      const userNameRow = row + dutyIndex + 1 + timeFlameIndex;
      const userName = this.rosterData[userNameRow][column];
      if(userName === "") continue;
      const res = this.checkUserPresent(date, userName, timeFlameIndex, numTimeFlame);
      const cell = `セル(${userNameRow + 2}, ${column + 3})`;
        if(res === true){
          // console.log(`${cell} ${userName}-OK`);
        } else {
          // 通所予定でない利用者を割り当てていた場合にNGを表示
          console.log(`${cell}-NG`);
        }
    }
  }

  // 利用者が通所予定かどうか
  checkUserPresent(date, userName, firstTimeFlameIndex, numTimeFlames){
    const column = date.getDate() - 1;
    const userIndex = this.userNameToIndexMap.get(userName);
    for(let timeFlameIndex = firstTimeFlameIndex; timeFlameIndex < numTimeFlames; timeFlameIndex++){
      const row = userIndex * NUM_TIME_FLAME + timeFlameIndex;
      const schedule = this.scheduleData[row][column];
      if(schedule !== "通所"){
        return false;
      }
    }
    return true;
  }
  
}
