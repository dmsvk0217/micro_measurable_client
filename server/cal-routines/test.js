const calHourlyData = require("./cal-hourly-data.js");
const calDailyData = require("./cal-daily-data.js");
const calMonthlyData = require("./cal-monthly-data.js");
const util = require("../util.js");

const dayStart = 7;
const dayEnd = 7;
const hourStart = 0;
const hourEnd = 23;

testMonthRoutine();

async function testHourRoutine() {
  for (let i = dayStart; i <= dayEnd; i++) {
    for (let j = hourStart; j <= hourEnd; j++) {
      let hhmmss = util.generateRandomTime(j);
      let dayDD = util.generateDayDD(i);
      const { yyyyMM } = util.getDate();
      await calHourlyData(yyyyMM, dayDD, hhmmss);
    }
  }
}

async function testDayRoutine() {
  for (let i = dayStart; i <= dayEnd; i++) {
    let hhmmss = util.generateRandomTime(i);
    let dayDD = util.generateDayDD(i);
    const { yyyyMM } = util.getDate();
    calDailyData(yyyyMM, dayDD, hhmmss);
  }
}

async function testMonthRoutine() {
  let hhmmss = util.generateRandomTime(23);
  let dayDD = util.generateDayDD(31);
  const { yyyyMM } = util.getDate();
  calMonthlyData(yyyyMM, dayDD, hhmmss);
}
