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

const substanceOptions = {
  포름알데히드: "0",
  PM10: "1",
  "PM2.5": "2",
  온도: "3",
  습도: "4",
  풍향: "5",
  풍속: "6",
};

const nodeAddressOptions = {
  전체: "allNode",
  뉴턴홀: "1",
  현동홀: "2",
  느헤미아홀: "3",
  오석관: "4",
  코너스톤홀: "5",
  올네이션스홀: "6",
  그레이스홀: "7",
  로멘틱잔디: "8",
  평봉필드: "9",
  "히딩크 풋살장": "10",
  복지동: "11",
  채플: "12",
  하용조관: "13",
  벧엘관: "14",
  창조관: "15",
};

module.exports = {
  substanceType,
  substanceDailyAverageType,
  substanceHourlyAverageType,
  NUMBEROFSUBSTANCE,
  NUMBEROFNODE,
  NUMBEROFHOUR,
  substanceOptions,
  nodeAddressOptions,
};
