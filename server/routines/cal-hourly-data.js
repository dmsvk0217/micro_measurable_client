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

calHourlyAverage();

function calHourlyAverage() {
  const { hhmmss } = getDate();
  console.log(`[${hhmmss}] calHourlyAverage `);

  for (let i = 0; i < NUMBEROFNODE; i++) {
    calHourlyAverageWithNodeAndHour(i);
  }
  return;
}

async function calHourlyAverageWithNodeAndHour(i) {
  const { yyyyMM, dayDD, hhmmss, hh } = getDate();
  let avgValue;
  let dataObject = {
    "node-address": i + 1,
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
  };

  const hourlyRawDataRef = collection(
    db,
    `hourly-raw-data/${yyyyMM}/day${dayDD}/hour13/node${i + 1}`
  );
  const nodeHourlyAveragedocRef = doc(
    db,
    `hourly-data/${yyyyMM}/day${dayDD}`,
    `node${i + 1}`
  );
  const nodeHourlyAverageCollectionRef = collection(
    db,
    `hourly-data/${yyyyMM}/day${dayDD}`
  );

  try {
    const querySnapshot = await getDocs(query(hourlyRawDataRef));

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

    const docSnapshot = await getDoc(nodeHourlyAveragedocRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      data[`hour01`] = dataObject;
      await updateDoc(
        doc(nodeHourlyAverageCollectionRef, `node${i + 1}`),
        data
      );

      console.log("Document updated successfully!");
    } else {
      console.log("No such document!");
      await setDoc(
        doc(nodeHourlyAverageCollectionRef, `node${i + 1}`),
        dataObject
      );
      console.log("Document updated successfully!");
    }
    // await setDoc(doc(hourlyAverageRef, `hour${hh}`), dataObject);
    console.log("done");
  } catch (error) {
    console.log("🚀 ~ calDayAverageWithNodeSubstance ~ error:", error);
  }
  return;
}
