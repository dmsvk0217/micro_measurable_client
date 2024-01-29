const db = require("../firebase/firebase.js");
const {
  substanceDailyAverageFromNumberOptions,
  substanceMonthlyAverageFromNumberOptions,
} = require("./const.js");
const _ = require("lodash");

module.exports = async function calMonthlyData(yyyyMM, dayDD, hhmmss) {
  const yyyy = yyyyMM.slice(0, 4);
  const mm = yyyyMM.slice(5);

  const dailyDataRef = db.collection("/daily-data").doc(`${yyyyMM}`);
  const dailyDoc = await dailyDataRef.get();
  if (!dailyDoc.exists) {
    console.log("No matching documents.");
    return;
  }

  let avgData = Array.from({ length: 16 }, () =>
    Array.from({ length: 8 }, () => 0)
  );
  let windDirectionArray = Array.from({ length: 16 }, () => []);
  let count = Array.from({ length: 16 }, () => 0);

  const allDayData = dailyDoc.data();
  for (const dayKey in allDayData) {
    if (allDayData.hasOwnProperty(dayKey) && dayKey.startsWith("day")) {
      const dayData = allDayData[dayKey];
      for (const nodeKey in dayData) {
        if (dayData.hasOwnProperty(nodeKey) && nodeKey.startsWith("node")) {
          const nodeAddress = nodeKey.slice(4);
          count[nodeAddress]++;
          const nodeData = dayData[nodeKey];
          for (let i = 1; i <= 7; i++) {
            const value = nodeData[substanceDailyAverageFromNumberOptions[i]];
            if (i == 6) windDirectionArray[nodeAddress].push(value);
            else avgData[nodeAddress][i] += value;
          }
        }
      }
    }
  }

  console.log("🚀 ~ calMonthlyData ~ avgData:", avgData);
  for (let i = 1; i <= 15; i++) {
    for (let j = 1; j <= 7; j++) {
      avgData[i][j] /= count[i];
    }
  }

  let resultObject = {
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
  };

  for (let i = 1; i <= 15; i++) {
    resultObject[`node${i}`] = {
      nodeAddress: i,
    };
    for (let j = 1; j <= 7; j++) {
      if (j == 6) {
        const windDirection = getMostFrequentlyWindDirectionFromArray(
          windDirectionArray[i]
        );
        resultObject[`node${i}`][substanceMonthlyAverageFromNumberOptions[j]] =
          windDirection;
      } else
        resultObject[`node${i}`][substanceMonthlyAverageFromNumberOptions[j]] =
          avgData[i][j];
    }
  }
  // console.log(resultObject);

  const monthlyDataRef = db.collection("/monthly-data").doc(`${yyyy}`);
  const monthlyDoc = await monthlyDataRef.get();

  console.log("monthlyDoc.exists:", monthlyDoc.exists);
  if (monthlyDoc.exists)
    monthlyDataRef.update({ [`month${mm}`]: resultObject });
  else monthlyDataRef.set({ [`month${mm}`]: resultObject });

  return;
};

function getMostFrequentlyWindDirectionFromArray(windDirectionArray) {
  const countByResult = _.countBy(windDirectionArray);
  const modeValue = _.maxBy(_.keys(countByResult), (key) => countByResult[key]);
  return modeValue;
}
