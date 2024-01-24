const selectMonthOptions = Array.from(
  { length: 12 },
  (_, index) => `${index + 1}월`
);

const selectYearOptions = Array.from({ length: 28 }, (_, index) =>
  String(2024 - index)
);

const selectHourOptions = Array.from({ length: 25 }, (_, index) =>
  index == 0 ? "전체 " : index < 10 ? "0" + index + ":00" : index + ":00"
);

selectHourOptions.map((value) => console.log(value));

console.log(typeof selectMonthOptions);
console.log(typeof selectYearOptions);
console.log(typeof selectHourOptions);
console.log(typeof [...selectMonthOptions]);
console.log(typeof [...selectYearOptions]);
console.log(typeof [...selectHourOptions]);
