const db = require("../firebase/firebase.js");
const {
  substanceFromNumberOptions,
  substanceHourlyAverageFromNumberOptions,
} = require("./const.js");
const _ = require("lodash");

module.exports = async function calHourlyData(yyyyMM, dayDD, hhmmss) {
  console.log(`calHourlyData ${yyyyMM}-${dayDD} ${hhmmss}`);
  const hhStart = hhmmss.slice(0, 2);
  const hhEnd = (parseInt(hhStart, 10) + 1).toString().padStart(2, "0");

  const rawDataRef = db
    .collection(`raw-data/${yyyyMM}/day${dayDD}`)
    .where("timestamp", ">=", `${hhStart}:00:00`)
    .where("timestamp", "<", `${hhEnd}:00:00`);
  const snapshot = await rawDataRef.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  let avgData = Array.from({ length: 16 }, () =>
    Array.from({ length: 8 }, () => 0)
  );
  let windDirectionArray = Array.from({ length: 16 }, () => []);
  let count = Array.from({ length: 16 }, () => 0);

  snapshot.forEach((doc) => {
    const nodeAddress = doc.data()["nodeAddress"];
    count[nodeAddress]++;

    for (let i = 1; i <= 7; i++) {
      const value = doc.data()[substanceFromNumberOptions[i]];
      if (i == 6) windDirectionArray[nodeAddress].push(value);
      else avgData[nodeAddress][i] += value;
    }
  });

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
        resultObject[`node${i}`][substanceHourlyAverageFromNumberOptions[j]] =
          windDirection;
      } else
        resultObject[`node${i}`][substanceHourlyAverageFromNumberOptions[j]] =
          avgData[i][j];
    }
  }

  const hourlyDataRef = db
    .collection(`/hourly-data/${yyyyMM}/day${dayDD}`)
    .doc("data");

  const doc = await hourlyDataRef.get();

  if (doc.exists) {
    await hourlyDataRef.update({ [`hour${hhStart}`]: resultObject });
  } else {
    await hourlyDataRef.set({ [`hour${hhStart}`]: resultObject });
  }

  return;
};

function getMostFrequentlyWindDirectionFromArray(windDirectionArray) {
  const countByResult = _.countBy(windDirectionArray);
  const modeValue = _.maxBy(_.keys(countByResult), (key) => countByResult[key]);
  return modeValue;
}
