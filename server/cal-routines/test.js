const calHourlyData = require("./cal-hourly-data.js");
const util = require("./util.js");

for (let i = 2; i <= 2; i++) {
  for (let j = 2; j < 3; j++) {
    let hhmmss = util.generateRandomTime(j);
    let dayDD = util.generateDayDD(i);
    const { yyyyMM } = util.getDate();
    // calAllNodeDailyAverage(yyyyMM, dayDD, hhmmss);
    // calNodeDailyAverage(yyyyMM, dayDD, hhmmss);
    // calMonthlyAverage(yyyyMM, dayDD, hhmmss);
    // calHourlyAverage(yyyyMM, dayDD, hhmmss);
    calHourlyData(yyyyMM, dayDD, hhmmss);
  }
}
