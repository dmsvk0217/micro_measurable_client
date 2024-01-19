const {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
} = require("firebase/firestore");
const db = require("../firebase.js");
const getDate = require("../util.js");
const {
  NUMBEROFNODE,
  NUMBEROFSUBSTANCE,
  substanceType,
  substanceDailyAverageType,
} = require("../const.js");

module.exports = async function calAllNodeDailyAverage() {
  const { yyyyMM, dayDD, hhmmss } = getDate();
  let allNodedataObject = {
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
  };

  console.log(`[${hhmmss}] calAllNodeDailyAverage`);

  for (let i = 0; i < NUMBEROFNODE; i++) {
    await getDailyAverageDataObjectWithAllNode(i, allNodedataObject);
  }
  calDailyAverageWithAllNode(allNodedataObject);
  return;
};

async function calDailyAverageWithAllNode(dailyDataForAllNode) {
  console.log(
    "🚀 ~ calDailyAverageWithAllNode ~ dailyDataForAllNode:",
    dailyDataForAllNode
  );
  const { yyyyMM, dayDD } = getDate();
  const dailyAverageRef = collection(db, `daily-data/${yyyyMM}/day${dayDD}`);

  await setDoc(doc(dailyAverageRef, "allNode"), dailyDataForAllNode);
  return;
}

async function getDailyAverageDataObjectWithAllNode(i, allNodedataObject) {
  const dataObject = {};
  let avgValue;
  const { yyyyMM, dayDD } = getDate();

  const dailyRawDataRef = collection(
    db,
    `daily-raw-data/${yyyyMM}/day${dayDD}/node${i + 1}/data`
  );

  try {
    const querySnapshot = await getDocs(query(dailyRawDataRef));

    if (querySnapshot.docs.length == 0) {
      console.log(
        "🚀 ~ getDailyAverageDataObjectWithAllNode querySnapshot.docs.length : ",
        querySnapshot.docs.length
      );
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
    allNodedataObject[`node${i + 1}`] = dataObject;
  } catch (error) {
    console.log("🚀 ~ calDayAverageWithNodeSubstance ~ error:", error);
  }
  return;
}
