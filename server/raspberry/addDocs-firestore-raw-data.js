const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} = require("firebase/firestore");

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const util = require("../util.js");

const currentDate = new Date();
const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format

const substanceType = [
  "humidity",
  "tempareture",
  "pm10",
  "pm25",
  "ch2o",
  "wind-direction",
  "wind-speed",
];

async function addLoraDataToFirestore() {
  // 1~15노드 한번에 합친 로라 랜덤 데이터 생성
  const loraContent = util.generateAllnodesTestData();
  console.log("🚀 ~ addLoraDataToFirestore ~ loraContent:", loraContent);

  for (let index = 0; index < loraContent.length; index++) {
    console.log(
      "🚀 ~ addLoraDataToFirestore ~ loraContent[index]:",
      loraContent[index]
    );
    let errContainFlag = false;
    let numberOfNodes = 0;

    // allNodeSubstancesArray -> [[28, -7, 15, 6, 0.03, 0.04, 30], [28, -7, 15, 6, 0.03, 0.04, 30]]
    const allNodeSubstancesArray = [];
    const nodeAddressArray = [];
    // loraContent[index] -> "node1//node2//node3//"
    // nodeContentArray -> [node1, node2, node3]
    const nodeContentArray = loraContent[index]
      .split("//")
      .filter((data) => data !== "");

    for (const nodeContent of nodeContentArray) {
      // nodeContent -> "node1" / ex. "14/28/-7/15/6/0.03/0.04/30//"
      // nodeSubstancesArray -> [28, -7, 15, 6, 0.03, 0.04, 30]
      const nodeSubstancesArray = nodeContent
        .split("/")
        .map((data, index) => {
          if (index === 0) {
            // 첫 번째 숫자는 nodeAddress이므로 nodeAddressArray에 추가
            if (!isNaN(parseInt(data, 10))) {
              nodeAddressArray.push(parseInt(data, 10));
              numberOfNodes++;
            }
            // 첫 번째 글자가 숫자가 아닌 경우 +ERR=로 판단
            else {
              errContainFlag = true;
            }
            // nodeAddress는 데이터 배열에 추가하지 않음
            return null;
          } else {
            return !data.includes(".") ? parseInt(data, 10) : parseFloat(data);
          }
        })
        .filter((data) => data !== null);

      console.log("nodeSubstancesArray.length:", nodeSubstancesArray.length);

      if (!isNodeSubstancesArrayValid(nodeSubstancesArray)) {
        errContainFlag = true;
        continue;
      }
      allNodeSubstancesArray.push(nodeSubstancesArray);
    }

    console.log("Total Node Count:", numberOfNodes);
    console.log("Node Address Array:", nodeAddressArray);
    console.log("All Node Data Array:", allNodeSubstancesArray);

    if (errContainFlag) {
      console.log("loraContent contain errer", errContainFlag);
      addErrData(loraContent[index]);
    }

    for (let i = 0; i < numberOfNodes; i++) {
      const nodeAddress = nodeAddressArray[i];
      const nodeSubstancesArray = allNodeSubstancesArray[i];
      addRawData(nodeAddress, nodeSubstancesArray);
    }
  }
  return;
}

async function addRawData(nodeAddress, nodeSubstancesArray) {
  const rawDataRef = collection(db, `raw-data/${yyyyMM}/day${dayDD}`);
  const dataObject = {
    nodeAddress: nodeAddress,
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
    [substanceType[0]]: nodeSubstancesArray[0],
    [substanceType[1]]: nodeSubstancesArray[1],
    [substanceType[2]]: nodeSubstancesArray[2],
    [substanceType[3]]: nodeSubstancesArray[3],
    [substanceType[4]]: nodeSubstancesArray[4],
    [substanceType[5]]: nodeSubstancesArray[5],
    [substanceType[6]]: nodeSubstancesArray[6],
  };

  await addDoc(rawDataRef, dataObject);
  console.log(`[addRawData] node${nodeAddress}(${nodeSubstancesArray}) done`);
}

function addDailyRawData(nodeAddress, nodeSubstancesArray) {
  addDoc(dailyRawDataRef, dataObject);
  console.log("Daily done");
}

function addErrData(loraContent) {
  const errDataRef = collection(db, `err-data/${yyyyMM}/day${dayDD}`);
  const dataObject = {
    date: `${yyyyMM}-${dayDD}`,
    timestamp: hhmmss,
    errData: loraContent,
  };

  addDoc(errDataRef, dataObject);
}

function isNodeSubstancesArrayValid(nodeSubstancesArray) {
  // 1) 물질 개수가 7개
  // 2) 모든 데이터가 숫자인지
  if (nodeSubstancesArray.length !== 7) return false;

  for (const nodeSubstance of nodeSubstancesArray) {
    if (
      isNaN(parseInt(nodeSubstance, 10)) &&
      isNaN(parseFloat(nodeSubstance, 10))
    ) {
      return false;
    }
  }

  return true;
}

addLoraDataToFirestore();

/*
  {
    data: "2024-01-01",
    timestamp: "15:30:12",
    node: "1",
    temperature: "12",
    humidity: "27",
    pm25: "8",
    pm10: "8",
    ch2o: "0.001",
    wind_direction: "남동",
    wind_speed: "5",
  }
*/
