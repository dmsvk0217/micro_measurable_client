exports.substanceType = [
  "humidity",
  "temperature",
  "pm10",
  "pm25",
  "ch2o",
  "wind-direction",
  "wind-speed",
];

exports.loraErrorType = {
  1: "There is not “enter” or 0x0D 0x0A in the end of the AT Command.",
  2: "The head of AT command is not “AT” string. ",
  4: "Unknow command.",
  5: "The data to be sent does not match the actual length",
  10: "TX is over times.",
  12: "CRC error.",
  13: "TX data exceeds 240bytes.",
  14: "Failed to write flash memory.",
  15: "Unknow failure.",
  17: "Last TX was not completed",
  18: "Preamble value is not allowed.",
  19: "RX failed, Header error",
  20: "The time setting value of the “Smart receiving power saving mode” is not allowed.",
};

exports.locationFromNodeNumberOptions = {
  0: "전체",
  1: "그레이스",
  2: "갈대상자",
  3: "Ark",
  4: "느헤미야",
  5: "비전광장",
  6: "GLC",
  7: "채플",
  8: "코너스톤",
  9: "오석관",
  10: "히딩크",
  11: "어푸푸",
  12: "소라",
  13: "벧엘관",
  14: "비전관",
  15: "활주로",
};

exports.substanceHourlyEnum = {
  포름알데히드: "ch2o-hourly-average",
  습도: "humidity-hourly-average",
  PM10: "pm10-hourly-average",
  "PM2.5": "pm25-hourly-average",
  온도: "temperature-hourly-average",
  풍향: "wind-direction-hourly-average",
  풍속: "wind-speed-hourly-average",
};

exports.substanceMonthlyEnum = {
  포름알데히드: "ch2o-monthly-average",
  습도: "humidity-monthly-average",
  PM10: "pm10-monthly-average",
  "PM2.5": "pm25-monthly-average",
  온도: "temperature-monthly-average",
  풍향: "wind-direction-monthly-average",
  풍속: "wind-speed-monthly-average",
};

exports.positionOfNode = {
  1: { lat: 36.1022758, lng: 129.3821343 },
  2: { lat: 36.1027753, lng: 129.3836298 },
  3: { lat: 36.1031174, lng: 129.3856419 },
  4: { lat: 36.1040836, lng: 129.3872806 },
  5: { lat: 36.1038127, lng: 129.3883638 },
  6: { lat: 36.1045874, lng: 129.389386 },
  7: { lat: 36.1043333, lng: 129.3904529 },
  8: { lat: 36.1023672, lng: 129.3865268 },
  9: { lat: 36.1025642, lng: 129.38725 },
  10: { lat: 36.1018398, lng: 129.3877522 },
  11: { lat: 36.1027863, lng: 129.3890246 },
  12: { lat: 36.1019319, lng: 129.39071 },
  13: { lat: 36.102231, lng: 129.3921638 },
  14: { lat: 36.1030285, lng: 129.3911767 },
  15: { lat: 36.1044213, lng: 129.3922963 },
};
