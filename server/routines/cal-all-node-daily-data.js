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
  substanceEnType,
  substanceDailyAverageType,
} = require("../const.js");

module.exports = async function calAllNodeDailyAverage(yyyyMM, dayDD, hhmmss) {
  // const { yyyyMM, dayDD, hhmmss } = util.getDate();
  let allNodedataObject = {
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
  };

  for (let i = 0; i < NUMBEROFNODE; i++) {
    await getDailyAverageDataObjectWithAllNode(
      i,
      allNodedataObject,
      yyyyMM,
      dayDD,
      hhmmss
    );
  }
  calDailyAverageWithAllNode(allNodedataObject, yyyyMM, dayDD, hhmmss);
  return;
};

async function calDailyAverageWithAllNode(
  dailyDataForAllNode,
  yyyyMM,
  dayDD,
  hhmmss
) {
  // const { yyyyMM, dayDD } = util.getDate();
  const dailyAverageRef = collection(db, `daily-data/${yyyyMM}/day${dayDD}`);

  await setDoc(doc(dailyAverageRef, "allNode"), dailyDataForAllNode);
  console.log(`[${dayDD}day: ${hhmmss}] calDailyAverage With AllNode done`);
  return;
}

async function getDailyAverageDataObjectWithAllNode(
  i,
  allNodedataObject,
  yyyyMM,
  dayDD,
  hhmmss
) {
  const dataObject = {};
  let avgValue;
  // const { yyyyMM, dayDD } = util.getDate();

  const dailyRawDataRef = collection(
    db,
    `daily-raw-data/${yyyyMM}/day${dayDD}/node${i + 1}/node${i + 1}`
  );

  try {
    const querySnapshot = await getDocs(query(dailyRawDataRef));

    if (querySnapshot.docs.length == 0) {
      console.log(
        `[${dayDD}day: ${hhmmss}] calAllNodeDailyAverage(querySnapshot.docs.length == 0) daily-raw-data/${yyyyMM}/day${dayDD}/node${
          i + 1
        }/node${i + 1}`
      );
      return;
    }

    // 특정날짜 특정노드에 대해서, 모든 물질의 평균값 계산하여 dataObject에 추가
    for (let j = 0; j < NUMBEROFSUBSTANCE; j++) {
      const valueArray = querySnapshot.docs.map(
        (doc) => doc.data()[substanceEnType[j]]
      );
      avgValue =
        valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;

      dataObject[substanceDailyAverageType[j]] = avgValue;
    }
    allNodedataObject[`node${i + 1}`] = dataObject;
  } catch (error) {
    console.log(
      `[${dayDD}day: ${hhmmss}] calDayAverageWithNodeSubstance ~ ${error}:`
    );
  }
  return;
}
