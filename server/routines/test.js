const calAllNodeDailyAverage = require("./cal-all-node-daily-data.js");
const calNodeDailyAverage = require("./cal-node-daily-data.js");
const calMonthlyAverage = require("./cal-monthly-data.js");
const calHourlyAverage = require("./cal-hourly-data.js");
const calHourlyAllNodeAverage = require("./cal-hourly-all-node.js");
const util = require("../util.js");

for (let i = 0; i < 31; i++) {
  for (let j = 0; j < 24; j++) {
    let hhmmss = generateRandomTime(j);
    console.log("🚀 ~ hhmmss:", hhmmss);
    let dayDD = generateDayDD(i + 1);
    const { yyyyMM } = util.getDate();
    calAllNodeDailyAverage(yyyyMM, dayDD, hhmmss);
    calNodeDailyAverage(yyyyMM, dayDD, hhmmss);
    calMonthlyAverage(yyyyMM, dayDD, hhmmss);
    calHourlyAverage(yyyyMM, dayDD, hhmmss);
    calHourlyAllNodeAverage(yyyyMM, dayDD, hhmmss);
  }
}
