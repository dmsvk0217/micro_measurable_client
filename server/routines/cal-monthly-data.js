const {
  collection,
  addDoc,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} = require("firebase/firestore");
const db = require("../firebase.js");
const util = require("../util.js");
const {
  NUMBEROFNODE,
  substanceType,
  substanceDailyAverageType,
} = require("../const.js");

module.exports = async function calMonthlyDayAverage(yyyyMM, dayDD, hhmmss) {
  // const { yyyyMM, dayDD, hhmmss } = util.getDate();

  for (let i = 0; i < substanceType.length; i++) {
    let monthlyDayObject = {};
    for (let j = 0; j < NUMBEROFNODE; j++) {
      await calDayAverageWithNodeAndSubstance(
        j,
        i,
        monthlyDayObject,
        yyyyMM,
        dayDD,
        hhmmss
      );
    }
    await addSubstanceAllNodeObject(
      monthlyDayObject,
      substanceType[i],
      yyyyMM,
      dayDD,
      hhmmss
    );
    console.log("addSubstanceAllNodeObject done");
  }
  console.log("done");
};

async function addSubstanceAllNodeObject(
  monthlyDayObject,
  substanceType,
  yyyyMM,
  dayDD,
  hhmmss
) {
  const substanceRef = collection(
    db,
    `monthly-data/${yyyyMM}/${substanceType}`
  );

  // 문서 조회
  const nodeDocRef = doc(substanceRef, "allNode");
  const nodeDocSnapshot = await getDoc(nodeDocRef);

  // 문서가 없으면 새로 생성
  if (!nodeDocSnapshot.exists()) {
    await setDoc(nodeDocRef, monthlyDayObject);
  } else {
    // 문서가 있으면 업데이트
    let resultObject = nodeDocSnapshot.data();
    for (let i = 0; i < NUMBEROFNODE; i++) {
      resultObject[`node${i + 1}`] = {
        ...resultObject[`node${i + 1}`],
        ...monthlyDayObject[`node${i + 1}`],
      };
    }
    console.log("🚀 ~ addSubstanceAllNodeObject ~ resultObject:", resultObject);
    await updateDoc(nodeDocRef, resultObject);
  }
}

async function calDayAverageWithNodeAndSubstance(
  i,
  j,
  monthlyDayObject,
  yyyyMM,
  dayDD,
  hhmmss
) {
  const monthlyRawDataRef = collection(
    db,
    `monthly-raw-data/${yyyyMM}/${substanceType[j]}/node${i + 1}/day${dayDD}`
  );
  const substanceCollectionRef = collection(
    db,
    `monthly-data/${yyyyMM}/${substanceType[j]}`
  );

  try {
    const querySnapshot = await getDocs(query(monthlyRawDataRef));

    if (querySnapshot.docs.length === 0) {
      console.log(
        `[${dayDD}day: ${hhmmss}] calDayAverageWithNodeAndSubstance(querySnapshot.docs.length == 0) monthly-raw-data/${yyyyMM}/${
          substanceType[j]
        }/node${i + 1}/day${dayDD}`
      );
      return;
    }

    const valueArray = querySnapshot.docs.map(
      (doc) => doc.data()[substanceType[j]]
    );

    const avgValue =
      valueArray.reduce((acc, value) => acc + value, 0) / valueArray.length;

    const dataObject = {
      [`day${dayDD}`]: avgValue,
    };

    const nodeDocRef = doc(substanceCollectionRef, `node${i + 1}`);
    const nodeDocSnapshot = await getDoc(nodeDocRef);

    // 문서가 없으면 새로 생성
    if (!nodeDocSnapshot.exists()) {
      await setDoc(nodeDocRef, dataObject);
    } else {
      // 문서가 있으면 업데이트
      await updateDoc(nodeDocRef, dataObject);
    }
    monthlyDayObject[`node${i + 1}`] = dataObject;
    console.log(`[${dayDD}day: ${hhmmss}] calDayAverageWithNodeSubstance done`);
  } catch (error) {
    console.log(
      `[${dayDD}day: ${hhmmss}] calDayAverageWithNodeSubstance ~ ${error}`
    );
  }
  return;
}
