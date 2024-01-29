const db = require("../firebase/firebase.js");
const {
  substanceHourlyAverageFromNumberOptions,
  substanceDailyAverageFromNumberOptions,
} = require("./const.js");
const _ = require("lodash");

module.exports = async function calDailyData(yyyyMM, dayDD, hhmmss) {
  const hourlyDataRef = db
    .collection(`hourly-data/${yyyyMM}/day${dayDD}`)
    .doc("data");
  const hourlyDoc = await hourlyDataRef.get();
  if (!hourlyDoc.exists) {
    console.log("No matching documents.");
    return;
  }

  let avgData = Array.from({ length: 16 }, () =>
    Array.from({ length: 8 }, () => 0)
  );
  let windDirectionArray = Array.from({ length: 16 }, () => []);
  let count = Array.from({ length: 16 }, () => 0);

  const allhourData = hourlyDoc.data();
  for (const hourKey in allhourData) {
    if (allhourData.hasOwnProperty(hourKey) && hourKey.startsWith("hour")) {
      const hourData = allhourData[hourKey];
      for (const nodeKey in hourData) {
        if (hourData.hasOwnProperty(nodeKey) && nodeKey.startsWith("node")) {
          const nodeAddress = nodeKey.slice(4);
          count[nodeAddress]++;
          const nodeData = hourData[nodeKey];
          for (let i = 1; i <= 7; i++) {
            const value = nodeData[substanceHourlyAverageFromNumberOptions[i]];
            if (i == 6) windDirectionArray[nodeAddress].push(value);
            else avgData[nodeAddress][i] += value;
          }
        }
      }
    }
  }

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
        console.log(`windDirection : ${windDirection}`);
        console.log(`windDirectionArray[${i}] : ${windDirectionArray[i]}`);
        resultObject[`node${i}`][substanceDailyAverageFromNumberOptions[j]] =
          windDirection;
      } else
        resultObject[`node${i}`][substanceDailyAverageFromNumberOptions[j]] =
          avgData[i][j];
    }
  }

  const dailyDataRef = db.collection("/daily-data").doc(`${yyyyMM}`);
  const dailyDoc = await dailyDataRef.get();

  console.log("dailyDoc.exists:", dailyDoc.exists);
  if (dailyDoc.exists) dailyDataRef.update({ [`day${dayDD}`]: resultObject });
  else dailyDataRef.set({ [`day${dayDD}`]: resultObject });

  return;
};

function getMostFrequentlyWindDirectionFromArray(windDirectionArray) {
  const countByResult = _.countBy(windDirectionArray);
  console.log(
    "🚀 ~ getMostFrequentlyWindDirectionFromArray ~ countByResult:",
    countByResult
  );
  const modeValue = _.maxBy(_.keys(countByResult), (key) => countByResult[key]);
  return modeValue;
}
