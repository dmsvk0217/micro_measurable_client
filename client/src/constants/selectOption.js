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
  "그레이스",
  "갈대상자",
  "Ark",
  "느헤미야",
  "비전광장",
  "GLC",
  "채플",
  "코너스톤",
  "오석관",
  "히딩크",
  "어푸푸",
  "소라",
  "벧엘관",
  "비전관",
  "활주로",
];

export const numToMonth = {
  1:"Jan",
  2:"Feb",
  3:"Mar",
  4:"Apr",
  5:"May",
  6:"Jun",
  7:"Jul",
  8:"Aug",
  9:"Sep",
  10:"Oct",
  11:"Nov",
  12:"Dec",
};