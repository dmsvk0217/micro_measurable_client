const {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} = require("firebase/firestore");
const db = require("../firebase.js");
const util = require("../util.js");
const {
  NUMBEROFNODE,
  NUMBEROFSUBSTANCE,
  substanceHourlyAverageType,
  substanceType,
} = require("../const.js");

module.exports = async function calHourlyAverage() {
  const { yyyyMM, dayDD, hhmmss } = util.getDate();
  console.log(`[${hhmmss}] calHourlyAverage `);

  for (let i = 0; i < NUMBEROFNODE; i++) {
    calHourlyAverageWithNodeAndHour(i);
  }
  console.log("calHourlyAverage done");
  return;
};

async function calHourlyAverageWithNodeAndHour(i) {
  const { yyyyMM, dayDD, hhmmss, hh } = util.getDate();
  const hour = (parseInt(hh, 10) + 1).toString();
  let avgValue;
  let dataObject = {
    "node-address": i + 1,
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
  };

  const hourlyNodeRawDataRef = collection(
    db,
    `hourly-raw-data/${yyyyMM}/day${dayDD}/hour${hour}/node${i + 1}`
  );
  const hourlyNodeDataRef = collection(
    db,
    `hourly-data/${yyyyMM}/day${dayDD}/hour${hour}/node${i + 1}`
  );
  const nodeHourlyDataRef = collection(
    db,
    `hourly-data/${yyyyMM}/day${dayDD}/node${i + 1}/hour${hour}`
  );

  const querySnapshot = await getDocs(query(hourlyNodeRawDataRef));
  if (querySnapshot.docs.length === 0) {
    console.log("🚀 ~ calHourlyAverageWithNodeAndHour docs.length = 0");
    return;
  }

  // 특정시간 특정노드에 대해서, 모든 물질의 평균값 계산하여 dataObject에 추가
  for (let j = 0; j < NUMBEROFSUBSTANCE; j++) {
    const valueArray = querySnapshot.docs.map(
      (doc) => doc.data()[substanceType[j]]
    );
    avgValue =
      valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;
    dataObject[substanceHourlyAverageType[j]] = avgValue;
  }

  // 1. hour/node/data 생성
  await setDoc(doc(hourlyNodeDataRef, `node${i + 1}`), dataObject);

  // 2. node/hour/data 생성
  await setDoc(doc(nodeHourlyDataRef, `hour${hour}`), dataObject);

  // 3. node/allhour/data 생성,업데이트
  const nodeAllHoursRef = collection(
    db,
    `hourly-data/${yyyyMM}/day${dayDD}/node${i + 1}/allHour`
  );
  const nodeAllHoursSnapshot = await getDocs(query(nodeAllHoursRef));
  if (nodeAllHoursSnapshot.docs.length === 0) {
    setDoc(doc(nodeAllHoursRef, "allHour"), { [`hour${hour}`]: dataObject });
  } else {
    updateDoc(doc(nodeAllHoursRef, "allHour"), { [`hour${hour}`]: dataObject });
  }

  console.log(`🚀 ~ nodeHourlyDataRef ~ node${i + 1}:`);
  return;
}
