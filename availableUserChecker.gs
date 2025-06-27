class AvailableUserChecker{

  // 当番が可能な利用者がその当番に割り当てられていることを検証するクラス
  
  constructor(testData){
    this.userListData = testData.userListData;
    this.rosterData = testData.rosterData;
    this.isFullDayDuty = testData.isFullDayDuty;
    this.numDuty = testData.numDuty;
    this.numDayRow = testData.numDayRow;
    this.numUser = testData.numUser;
    this.dutyIndexToUserFlagMap = this.getDutyIndexToUserFlagMap();
  }

  // すべての日付の当番割り当てが正しいかどうか確認する
  checkValidRoster(){
    for(let weekIndex = 0; weekIndex < NUM_WEEK; weekIndex++){
      if(this.isFullDayDuty){
        this.checkValidAssignment(0, weekIndex);
      } else {
        for(let timeFlameIndex = 0; timeFlameIndex < NUM_TIME_FLAME; timeFlameIndex++){
          this.checkValidAssignment(timeFlameIndex, weekIndex);
        }
      }
    }
  }

  // 特定の日付の当番割り当てが正しいかどうか確認する
  checkValidAssignment(timeFlameIndex, weekIndex){
    for(let dutyIndex = 0; dutyIndex < this.numDuty; dutyIndex++){
      const userNameToflagMap = this.dutyIndexToUserFlagMap.get(dutyIndex);
      const row = weekIndex * this.numDayRow + dutyIndex + timeFlameIndex * this.numDuty + 1;
      for(let weekDayIndex = 0; weekDayIndex < NUM_WEEKDAY; weekDayIndex++){
        const column = weekDayIndex;
        const userName = this.rosterData[row][column];
        if(userName === "") continue;
        const flag = userNameToflagMap.get(userName);
        const cell = `セル(${row+2}, ${column+3})`;
        if(flag === true){
          // console.log(`${cell}-OK`);
        } else {
          // 当番が不可能な利用者が割り当てられていた場合にNGを表示
          console.log(`${cell} ${userName}-NG`);
        }
      }
    }
  }

  // 当番のindexから利用者の当番可能フラグを取得
  getDutyIndexToUserFlagMap(){
    let dutyIndexToUserFlagMap = new Map();
    for(let dutyIndex = 0; dutyIndex < this.numDuty; dutyIndex++){
      const column = dutyIndex + 1;
      let userFlagMap = new Map(new Array(this.numUser).fill(0).map((_,userIndex) =>{
        const flag = this.userListData[userIndex][column];
        const userName = this.userListData[userIndex][0];
        return [userName, flag];
      }));
      dutyIndexToUserFlagMap.set(dutyIndex, userFlagMap);
    } 
    return dutyIndexToUserFlagMap;
  }
}
