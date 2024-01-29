export const selectUnitOptions = ["일평균", "시간평균"];

export const selectYearOptions = Array.from({ length: 28 }, (_, index) =>
  String(2024 - index)
);
export const selectHourOptions = Array.from({ length: 25 }, (_, index) =>
  index == 0 ? "전체 " : index < 10 ? "0" + index + ":00" : index + ":00"
);

export const selectMonthOptions = Array.from(
  { length: 12 },
  (_, index) => `${index + 1}월`
);

export const selectSubstanceOptions = [
  "포름알데히드",
  "PM10",
  "PM2.5",
  "온도",
  "습도",
  "풍향",
  "풍속",
];

export const substanceEnOptions = [
  "ch2o",
  "humidity",
  "PM25",
  "PM10",
  "temperature",
  "wind_direction",
  "wind_speed",
];

export const selectLocationOptions = [
  "전체",
  "뉴턴홀",
  "현동홀",
  "느헤미아홀",
  "오석관",
  "코너스톤홀",
  "올네이션스홀",
  "그레이스홀",
  "로멘틱잔디",
  "평봉필드",
  "히딩크 풋살장",
  "복지동",
  "채플",
  "하용조관",
  "벧엘관",
  "창조관",
];
