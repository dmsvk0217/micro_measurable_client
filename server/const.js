const substanceType = ["humidity", "tempareture", "pm10", "pm25", "ch2o"];

const substanceDailyAverageType = [
  "humidity-Daily-Average",
  "tempareture-Daily-Average",
  "pm10-Daily-Average",
  "pm25-Daily-Average",
  "ch2o-Daily-Average",
];
const substanceHourlyAverageType = [
  "humidity-hourly-Average",
  "tempareture-hourly-Average",
  "pm10-hourly-Average",
  "pm25-hourly-Average",
  "ch2o-hourly-Average",
];

const NUMBEROFSUBSTANCE = 5;
const NUMBEROFNODE = 15;
const NUMBEROFHOUR = 24;

module.exports = {
  substanceType,
  substanceDailyAverageType,
  substanceHourlyAverageType,
  NUMBEROFSUBSTANCE,
  NUMBEROFNODE,
  NUMBEROFHOUR,
};
