const calHourlyData = require("./cal-hourly-data.js");
const calDailyData = require("./cal-daily-data.js");
const calMonthlyData = require("./cal-monthly-data.js");
const util = require("../util.js");

const dayStart = 6;
const dayEnd = 10;
const hourStart = 0;
const hourEnd = 23;

testMonthRoutine();

async function testMonthRoutine() {
  for (let i = dayStart; i <= dayEnd; i++) {
    let hhmmss = util.generateRandomTime(i);
    let dayDD = util.generateDayDD(i);
    const { yyyyMM } = util.getDate();
    await calMonthlyData(yyyyMM, dayDD, hhmmss);
  }
}

async function testDayRoutine() {
  for (let i = dayStart; i <= dayEnd; i++) {
    let hhmmss = util.generateRandomTime(i);
    let dayDD = util.generateDayDD(i);
    const { yyyyMM } = util.getDate();
    await calDailyData(yyyyMM, dayDD, hhmmss);
  }
}

async function testHourRoutine() {
  for (let i = dayStart; i <= dayEnd; i++) {
    for (let j = hourStart; j <= hourEnd; j++) {
      let hhmmss = util.generateRandomTime(j);
      let dayDD = util.generateDayDD(i);
      const { yyyyMM } = util.getDate();
      calHourlyData(yyyyMM, dayDD, hhmmss);
    }
  }
}
