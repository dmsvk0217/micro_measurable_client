// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
} = require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqcuHvJwtE1TO6lyUuH20O8no5fuHnN7s",
  authDomain: "capstone-c6d9e.firebaseapp.com",
  databaseURL: "https://capstone-c6d9e-default-rtdb.firebaseio.com",
  projectId: "capstone-c6d9e",
  storageBucket: "capstone-c6d9e.appspot.com",
  messagingadderId: "164554046589",
  appId: "1:164554046589:web:cd640b8d44a6bc9bc70514",
  measurementId: "G-K7B3FH99ZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

const currentDate = new Date();
const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
const hh = currentDate.getHours().toString().padStart(2, "0"); // HH format

const substanceType = ["humidity", "tempareture", "pm10", "pm25", "ch2o"];

async function addLoraDataToFirestore() {
  // in lora.read() loop
  const loraContent = "4/24/21/8/8/0.04//+ERR=14//6/21/21/9/9/0.04//";

  // 전체 노드 개수 파악
  let numberOfNodes = 0;

  // 각 노드를 기준으로 나누기
  const nodeStrings = loraContent.split("//").filter((data) => data !== "");

  // 각 string 배열에서 /로 구분되는 데이터 추출
  const allSubstanceDataArray = [];
  const nodeAddressArray = [];
  let errContainFlag = false;

  nodeStrings.forEach((nodeString) => {
    const nodeData = nodeString
      .split("/")
      .map((data, index) => {
        if (index === 0) {
          // 첫 번째 숫자는 nodeAddress이므로 nodeAddressArray에 추가
          if (!isNaN(parseInt(data, 10))) {
            nodeAddressArray.push(parseInt(data, 10));
            numberOfNodes++;
          } else {
            errContainFlag = true;
          }

          return null; // nodeAddress는 데이터 배열에 추가하지 않음
        } else {
          // 숫자 또는 에러값 처리
          return !data.includes(".") ? parseInt(data, 10) : parseFloat(data);
        }
      })
      .filter((data) => data !== null);

    if (nodeData.length > 0) allSubstanceDataArray.push(nodeData);
  });

  console.log("Total Node Count:", numberOfNodes);
  console.log("Node Numbers:", nodeAddressArray);
  console.log("All Node Data Array:", allSubstanceDataArray);

  if (errContainFlag) {
    console.log("🚀 ~ loraContent:", loraContent);
  }

  await addErrData(loraContent);

  for (let i = 0; i < numberOfNodes; i++) {
    const nodeAddress = nodeAddressArray[i];
    const substanceDataArray = allSubstanceDataArray[i];

    // 모든 노드, 모든 물질,  15개노드 7개 물질 -> 105개 query
    await addMonthlyRawData(nodeAddress, substanceDataArray);
    console.log("done1");

    // 모든 노드, 15개노드 -> 15개 query
    await addDailyRawData(nodeAddress, substanceDataArray);
    console.log("done2");

    // 모든 노드, 15개노드 -> 15개 query
    await addHourlyRawData(nodeAddress, substanceDataArray);
    console.log("done3");
  }
  console.log("done");
  return;
}

async function addMonthlyRawData(nodeAddress, substanceDataArray) {
  for (let i = 0; i < substanceDataArray.length; i++) {
    const substanceData = substanceDataArray[i];
    const substanceName = substanceType[i];

    const monthlyRawDataRef = collection(
      db,
      `monthly-raw-data/${yyyyMM}/${substanceName}/node${nodeAddress}/day${dayDD}`
    );

    const dataObject = {
      "node-address": nodeAddress,
      date: `${yyyyMM}-${dayDD}`,
      timestamp: hhmmss,
      [substanceName]: substanceData,
    };

    await addDoc(monthlyRawDataRef, dataObject);
  }
}

async function addDailyRawData(nodeAddress, substanceDataArray) {
  const dailyRawDataRef = collection(
    db,
    `daily-raw-data/${yyyyMM}/day${dayDD}/node${nodeAddress}/data`
  );

  const dataObject = {
    "node-address": nodeAddress,
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
    [substanceType[0]]: substanceDataArray[0],
    [substanceType[1]]: substanceDataArray[1],
    [substanceType[2]]: substanceDataArray[2],
    [substanceType[3]]: substanceDataArray[3],
    [substanceType[4]]: substanceDataArray[4],
  };

  await addDoc(dailyRawDataRef, dataObject);
}

async function addHourlyRawData(nodeAddress, substanceDataArray) {
  const hourlyRawDataRef = collection(
    db,
    `hourly-raw-data/${yyyyMM}/day${dayDD}/hour${hh}/node${nodeAddress}`
  );

  const dataObject = {
    "node-address": nodeAddress,
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
    [substanceType[0]]: substanceDataArray[0],
    [substanceType[1]]: substanceDataArray[1],
    [substanceType[2]]: substanceDataArray[2],
    [substanceType[3]]: substanceDataArray[3],
    [substanceType[4]]: substanceDataArray[4],
  };

  await addDoc(hourlyRawDataRef, dataObject);
}

async function addErrData(loraContent) {
  const errDataRef = collection(db, `err-data`);
  const dataObject = {
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
    errData: loraContent,
  };

  await addDoc(errDataRef, dataObject);
}

// cal_monthly_data();
addLoraDataToFirestore();
