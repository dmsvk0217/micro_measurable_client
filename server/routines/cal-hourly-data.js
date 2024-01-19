const {
  collection,
  addDoc,
  query,
  getDocs,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} = require("firebase/firestore");
const db = require("../firebase.js");
const getDate = require("../util.js");
const {
  NUMBEROFNODE,
  NUMBEROFSUBSTANCE,
  substanceHourlyAverageType,
  substanceType,
} = require("../const.js");

module.exports = function calHourlyAverage() {
  const { hhmmss } = getDate();
  console.log(`[${hhmmss}] calHourlyAverage `);

  for (let i = 0; i < NUMBEROFNODE; i++) {
    calHourlyAverageWithNodeAndHour(i);
  }
  return;
};

async function calHourlyAverageWithNodeAndHour(i) {
  const { yyyyMM, dayDD, hhmmss, hh } = getDate();
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
  const NodehourlyRawDataRef = collection(
    db,
    `hourly-raw-data/${yyyyMM}/day${dayDD}/node${i + 1}/hour${hour}`
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

  await setDoc(
    doc(hourlyNodeDataRef, `node${i + 1} : ${yyyyMM}-${dayDD} ${hhmmss}`),
    dataObject
  );
  console.log(`🚀 ~ hourlyNodeDataRef ~ node${i + 1}:`);
  await setDoc(
    doc(nodeHourlyDataRef, `node${i + 1} : ${yyyyMM}-${dayDD} ${hhmmss}`),
    dataObject
  );
  console.log(`🚀 ~ nodeHourlyDataRef ~ node${i + 1}:`);
  return;
}
