const {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
} = require("firebase/firestore");
const db = require("../firebase.js");
const util = require("../util.js");
const {
  NUMBEROFNODE,
  NUMBEROFSUBSTANCE,
  substanceType,
  substanceDailyAverageType,
} = require("../const.js");

module.exports = function calNodeDailyAverage() {
  const { hhmmss } = util.getDate();
  console.log(`[${hhmmss}] calNodeDailyAverage`);

  for (let i = 0; i < NUMBEROFNODE; i++) {
    calDailyAverageWithNode(i);
  }
  return;
};

async function calDailyAverageWithNode(i) {
  const { yyyyMM, dayDD, hhmmss } = util.getDate();
  let avgValue;
  let dataObject = {
    "node-address": i + 1,
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
  };

  const dailyRawDataRef = collection(
    db,
    `daily-raw-data/${yyyyMM}/day${dayDD}/node${i + 1}/data`
  );
  const dailyAverageRef = collection(db, `daily-data/${yyyyMM}/day${dayDD}`);

  try {
    const querySnapshot = await getDocs(query(dailyRawDataRef));

    if (querySnapshot.docs.length === 0) {
      console.log("🚀 ~ calDailyAverageWithNode docs.length = 0");
      return;
    }

    // 특정날짜 특정노드에 대해서, 모든 물질의 평균값 계산하여 dataObject에 추가
    for (let j = 0; j < NUMBEROFSUBSTANCE; j++) {
      const valueArray = querySnapshot.docs.map(
        (doc) => doc.data()[substanceType[j]]
      );
      avgValue =
        valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;

      dataObject[substanceDailyAverageType[j]] = avgValue;
    }

    await setDoc(doc(dailyAverageRef, `node${i + 1}`), dataObject);
    console.log(`🚀 ~ calDayAverageWithNodeSubstance ~ done : node${i + 1}`);
  } catch (error) {
    console.log("🚀 ~ calDayAverageWithNodeSubstance ~ error:", error);
  }
  return;
}
