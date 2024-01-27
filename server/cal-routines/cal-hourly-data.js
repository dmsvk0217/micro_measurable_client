const db = require("../firebase/firebase.js");
const {
  substanceFromNumberOptions,
  substanceHourlyAverageFromNumberOptions,
} = require("./const.js");
const _ = require("lodash");

module.exports = async function calHourlyData(yyyyMM, dayDD, hhmmss) {
  const hhStart = hhmmss.slice(0, 2);
  console.log("🚀 ~ calHourlyData ~ hhStart:", hhStart);
  const hhEnd = (parseInt(hhStart, 10) + 1).toString().padStart(2, "0");
  console.log("🚀 ~ calHourlyData ~ hhEnd:", hhEnd);

  const rawDataRef = db.collection(`raw-data/${yyyyMM}/day${dayDD}`);
  const snapshot = await rawDataRef
    .where("timestamp", ">=", `${hhStart}:00:00`)
    .where("timestamp", "<", `${hhEnd}:00:00`)
    .get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  console.log(snapshot.size);

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

  for (let i = 1; i <= 15; i++) {
    console.log(resultObject[`node${i}`]);
  }

  const hourlyDataRef = db.collection(`/hourly-data/${yyyyMM}/day${dayDD}`);
  const doc = await hourlyDataRef.doc("data").get();
  console.log("🚀 ~ calHourlyData ~ doc.exists:", doc.exists);

  if (doc.exists) {
    hourlyDataRef.doc(`data`).update({ [`hour${hhStart}`]: resultObject });
  } else {
    hourlyDataRef.doc(`data`).set({ [`hour${hhStart}`]: resultObject });
  }

  return;
};

function getMostFrequentlyWindDirectionFromArray(windDirectionArray) {
  const countByResult = _.countBy(windDirectionArray);
  const modeValue = _.maxBy(_.keys(countByResult), (key) => countByResult[key]);
  return modeValue;
}
