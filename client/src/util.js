const locationFromNodeNumberOptions = {
  0: "전체",
  1: "뉴턴홀",
  2: "현동홀",
  3: "느헤미아홀",
  4: "오석관",
  5: "코너스톤홀",
  6: "올네이션스홀",
  7: "그레이스홀",
  8: "로멘틱잔디",
  9: "평봉필드",
  10: "히딩크 풋살장",
  11: "복지동",
  12: "채플",
  13: "하용조관",
  14: "벧엘관",
  15: "창조관",
};

exports.generateResultFromResponse = (responseJson) => {
  const transformedArray = [];
  const responseJsonData = responseJson.data;

  // 데이터 구조를 순회하면서 변환
  for (const [key, value] of Object.entries(responseJsonData)) {
    console.log("🚀 ~ key:", key);
    console.log("🚀 ~ value:", value);
    if (!key.startsWith("node")) continue;
    const nodeNumber = key.slice(4);
    console.log("🚀 ~ nodeNumber:", nodeNumber);
    transformedArray.push({
      date: responseJsonData.date,
      location: locationFromNodeNumberOptions[nodeNumber],
      pm25: String(value["pm25-Daily-Average"].toFixed(2)),
      pm10: String(value["pm10-Daily-Average"].toFixed(2)),
      ch2o: String(value["ch2o-Daily-Average"].toFixed(2)),
      wind_speed: "5m/s(임의값)", // 임의의 값으로 설정
      wind_direction: "남서(임의값)", // 임의의 값으로 설정
      temperature: `${value["tempareture-Daily-Average"].toFixed(2)} °C`,
      humidity: `${value["humidity-Daily-Average"].toFixed(2)} %`,
    });
  }
  console.log("🚀 ~ transformedArray:", transformedArray);
  return transformedArray;
};

// {
//    "date": "2024-01-01"
//     "data": {
//         "key3": {
//             "humidity-Daily-Average": 5.958333333333333,
//             "ch2o-Daily-Average": 0.02958333333333334,
//             "pm25-Daily-Average": 9.166666666666666,
//             "pm10-Daily-Average": 9,
//             "tempareture-Daily-Average": 11.541666666666666
//         },
//         "key2": {
//             "ch2o-Daily-Average": 0.024000000000000004,
//             "humidity-Daily-Average": 7.36,
//             "tempareture-Daily-Average": 8,
//             "pm10-Daily-Average": 10.4,
//             "pm25-Daily-Average": 10.32
//         },
//         "key1": {
//             "humidity-Daily-Average": 14.291666666666666,
//             "pm25-Daily-Average": 9.375,
//             "tempareture-Daily-Average": 10.291666666666666,
//             "ch2o-Daily-Average": 0.03125000000000001,
//             "pm10-Daily-Average": 10.833333333333334
//         },
//     },
// }

// [
// {
//     date: "24-01-17 14:00",
//     key: "뉴턴홀",
//     pm25: "76",
//     pm10: "151",
//     ch2o: "0.002",
//     wind_speed: "5m/s",
//     wind_direction: "남서",
//     temperature: "8 °C",
//     humidity: "30%",
//   },
//   {
//     date: "24-01-17 14:00",
//     key: "그레이스홀",
//     pm25: "56",
//     pm10: "81",
//     ch2o: "0.002",
//     wind_speed: "5m/s",
//     wind_direction: "남서",
//     temperature: "8 °C",
//     humidity: "30%",
//   },
//   {
//     date: "24-01-17 14:00",
//     key: "현동홀",
//     pm25: "13",
//     pm10: "15",
//     ch2o: "0.002",
//     wind_speed: "5m/s",
//     wind_direction: "남서",
//     temperature: "8 °C",
//     humidity: "30%",
//   },
// ]

//   첫번째 json data를 두번째 json 배열 데이터로 변환하는 방법
