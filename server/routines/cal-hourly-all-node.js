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

module.exports = async function calHourlyAllNodeAverage() {
  const { yyyyMM, dayDD, hhmmss } = util.getDate();
  console.log(`[${hhmmss}] calHourlyAverage `);
  let hourlyAllNodeObject = {
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
  };

  for (let i = 0; i < NUMBEROFNODE; i++) {
    await getHourlyAllNodeObject(i, hourlyAllNodeObject);
  }
  addHourlyAllNodeAverageObject(hourlyAllNodeObject);
  console.log("addHourlyAllNodeAverageObject done");
  return;
};

async function addHourlyAllNodeAverageObject(hourlyAllNodeObject) {
  const { yyyyMM, dayDD, hhmmss, hh } = util.getDate();
  const hour = (parseInt(hh, 10) + 1).toString();

  const hourlyAllNodeObjectRef = collection(
    db,
    `hourly-data/${yyyyMM}/day${dayDD}/hour${hour}/allNode`
  );

  const hourlyAllNodeSnapshot = await getDocs(query(hourlyAllNodeObjectRef));
  if (hourlyAllNodeSnapshot.docs.length === 0) {
    await setDoc(doc(hourlyAllNodeObjectRef, "allNode"), hourlyAllNodeObject);
  } else {
    await updateDoc(
      doc(hourlyAllNodeObjectRef, "allNode"),
      hourlyAllNodeObject
    );
  }
}

async function getHourlyAllNodeObject(i, hourlyAllNodeObject) {
  const { yyyyMM, dayDD, hh, hhmmss } = util.getDate();
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

  const querySnapshot = await getDocs(query(hourlyNodeRawDataRef));
  if (querySnapshot.docs.length === 0) {
    console.log("🚀 ~ getHourlyAllNodeObject docs.length = 0");
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

  // make hourlyAllNodeObject
  hourlyAllNodeObject[`node${i + 1}`] = dataObject;
  console.log(`🚀 ~ hourlyNodeDataRef ~ node${i + 1}:`);

  return;
}
