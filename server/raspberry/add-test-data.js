const addLoraDataToFirestore = require("./add-data-to-raw-data.js");
const util = require("./util.js");

const dayStart = 3;
const dayEnd = 5;
const hourStart = 0;
const hourEnd = 23;
const periodInHour = 4;

for (let i = dayStart; i <= dayEnd; i++) {
  // 일
  for (let j = hourStart; j <= hourEnd; j++) {
    // 시간
    for (let k = 1; k <= periodInHour; k++) {
      // 15분 주기 -> 4번
      const yyyyMM = "2024-01";
      const hhmmss = util.generateRandomTime(j);
      const dayDD = util.generateDayDD(i);
      addLoraDataToFirestore(yyyyMM, dayDD, hhmmss);
    }
  }
}
