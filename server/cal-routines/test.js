const calHourlyData = require("./cal-hourly-data.js");
const util = require("../util.js");

const dayStart = 1;
const dayEnd = 1;
const hourStart = 0;
const hourEnd = 23;

async function testRoutine() {
  for (let i = dayStart; i <= dayEnd; i++) {
    for (let j = hourStart; j <= hourEnd; j++) {
      let hhmmss = util.generateRandomTime(j);
      let dayDD = util.generateDayDD(i);
      const { yyyyMM } = util.getDate();
      await calHourlyData(yyyyMM, dayDD, hhmmss);

      // calAllNodeDailyAverage(yyyyMM, dayDD, hhmmss);
      // calNodeDailyAverage(yyyyMM, dayDD, hhmmss);
      // calMonthlyAverage(yyyyMM, dayDD, hhmmss);
    }
  }
}

testRoutine();
