export const locationFromNodeNumberOptions = {
  0: "전체",
  1: "그레이스",
  2: "갈대상자",
  3: "Ark",
  4: "느헤미야",
  5: "창조관",
  6: "GLC",
  7: "채플",
  8: "코너스톤",
  9: "오석관",
  10: "히딩크",
  11: "어푸푸",
  12: "소라",
  13: "하용조관",
  14: "벧엘관",
  15: "활주로",
};


export const substanceEnum = {
  "포름알데히드": "ch2o-hourly-average",
  "습도": "humidity-hourly-average",
  "PM10": "pm10-hourly-average",
  "PM2.5": "pm25-hourly-average",
  "온도": "temperature-hourly-average",
  "풍향": "wind-direction-hourly-average",
  "풍속": "wind-speed-hourly-average",
};

export const positionOfNode = {
  1: { lat: 36.1022758, lng: 129.3821343 },
  2: { lat: 36.1027753, lng: 129.3836298 },
  3: { lat: 36.1031174, lng: 129.3856419 },
  4: { lat: 36.1040836, lng: 129.3872806 },
  5: { lat: 36.1026381, lng: 129.3911164 },
  6: { lat: 36.1045874, lng: 129.3893860 },
  7: { lat: 36.1043333, lng: 129.3904529 },
  8: { lat: 36.1023672, lng: 129.3865268 },
  9: { lat: 36.1025642, lng: 129.3872500 },
  10:{ lat: 36.1018398, lng: 129.3877522 },
  11:{ lat: 36.1027863, lng: 129.3890246 },
  12:{ lat: 36.1018214, lng: 129.3907164 },
  13:{ lat: 36.1021256, lng: 129.3920159 },
  14:{ lat: 36.1028711, lng: 129.3912290 },
  15:{ lat: 36.1044213, lng: 129.3922963 },
};

export const evaluateSubstance = (option, value) => {
  let sub_level = "-";

  switch (option) {
    case "pm25":
      if (value >= 76) sub_level = "매우 나쁨";
      else if (value >= 36) sub_level = "나쁨";
      else if (value >= 16) sub_level = "보통";
      else if (value >= 0) sub_level = "좋음";
      else sub_level = "-";
      break;
    case "pm10":
      if (value >= 151) sub_level = "매우 나쁨";
      else if (value >= 81) sub_level = "나쁨";
      else if (value > 31) sub_level = "보통";
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