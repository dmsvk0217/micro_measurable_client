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
const NUMBEROFNODE = 15;

module.exports = {
  substanceType,
  substanceDailyAverageType,
  substanceHourlyAverageType,
  NUMBEROFNODE,
};
