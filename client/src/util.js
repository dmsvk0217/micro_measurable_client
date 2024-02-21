export const locationFromNodeNumberOptions = {
  0: "전체",
  1: "그레이스",
  2: "갈대상자",
  3: "Ark",
  4: "느헤미야",
  5: "비전광장",//
  6: "GLC",
  7: "채플",
  8: "코너스톤",
  9: "오석관",
  10: "히딩크",
  11: "어푸푸",
  12: "소라",
  13: "벧엘관",//
  14: "비전관",//
  15: "활주로",
};


export const substanceHourlyEnum = {
  "포름알데히드": "ch2o-hourly-average",
  "습도": "humidity-hourly-average",
  "PM10": "pm10-hourly-average",
  "PM2.5": "pm25-hourly-average",
  "온도": "temperature-hourly-average",
  "풍향": "wind-direction-hourly-average",
  "풍속": "wind-speed-hourly-average",
};

export const substanceMonthlyEnum = {
  "포름알데히드": "ch2o-monthly-average",
  "습도": "humidity-monthly-average",
  "PM10": "pm10-monthly-average",
  "PM2.5": "pm25-monthly-average",
  "온도": "temperature-monthly-average",
  "풍향": "wind-direction-monthly-average",
  "풍속": "wind-speed-monthly-average",
};

export const substanceDailyEnum = {
  "포름알데히드": "ch2o-daily-average",
  "습도": "humidity-daily-average",
  "PM10": "pm10-daily-average",
  "PM2.5": "pm25-daily-average",
  "온도": "temperature-daily-average",
  "풍향": "wind-direction-daily-average",
  "풍속": "wind-speed-daily-average",
};

export const positionOfNode = {
  1: { lat: 36.1022758, lng: 129.3821343 },
  2: { lat: 36.1027753, lng: 129.3836298 },
  3: { lat: 36.1031174, lng: 129.3856419 },
  4: { lat: 36.1040836, lng: 129.3872806 },
  5: { lat: 36.1038127, lng: 129.3883638 },
  6: { lat: 36.1045874, lng: 129.3893860 },
  7: { lat: 36.1043333, lng: 129.3904529 },
  8: { lat: 36.1023672, lng: 129.3865268 },
  9: { lat: 36.1025642, lng: 129.3872500 },
  10:{ lat: 36.1018398, lng: 129.3877522 },
  11:{ lat: 36.1027863, lng: 129.3890246 },
  12:{ lat: 36.1019319, lng: 129.3907100 },
  13:{ lat: 36.1022310, lng: 129.3921638 },
  14:{ lat: 36.1030285, lng: 129.3911767 },
  15:{ lat: 36.1044213, lng: 129.3922963 },
};

export const evaluateSubstance = (option, value) => {
  let sub_level = "-";

  switch (option) {
    case "pm25":
      if (value > 75) sub_level = "매우 나쁨";
      else if (value > 35) sub_level = "나쁨";
      else if (value > 15) sub_level = "보통";
      else if (value >= 0) sub_level = "좋음";
      else sub_level = "-";
      break;
    case "pm10":
      if (value > 150) sub_level = "매우 나쁨";
      else if (value > 80) sub_level = "나쁨";
      else if (value > 30) sub_level = "보통";
      else if (value >= 0) sub_level = "좋음";
      else sub_level = "-";
      break;
    case "ch2o":
      sub_level = "-";
      break;
    default:
      sub_level = "-";
  }

  return sub_level;
}