const {
  isNodeSubstancesArrayValid,
  addRawData,
  addErrData,
  isLoraErr,
  getLoraErrTypeFromLoraData,
  updateNodeBattery,
  getCurrentNodeInfoByNodeAddress,
} = require("./func.js");
const { generateTestRandomNodeData, extractLoraContentFromLoraData } = require("./util.js");

const numberOfNode = 15;
const packetTimeIntervalMin = 0.1;
const checkTimeIntervalMills = 20000;
const testLoraHandleTimeIntervalMills = 2000;
let timeTrace = Array.from({ length: numberOfNode + 1 }, () => new Date().getTime());

main();
async function main() {
  // setInterval(onTimeTrace, checkTimeIntervalMills);
  setInterval(loraHandler, testLoraHandleTimeIntervalMills);
}

/* 
  Todo: serial port사용하여 로라데이터 받기
    +RCV=,노드번호,사이즈,,
    +RCV=10,26,10/9/20/9/13/0.04/0/6/37//,-18,11

    +RCV=<Address>,<Length>,<Data>,<RSSI>,<SNR>
    <Address> Transmitter Address ID
    <Length> Data Length
    <Data> ASCll Format Data -> 노드번호/온도/습도/pm25/pm10/ch2o/풍향/풍속
    <RSSI> Received Signal Strength Indicator
    <SNR> Signal-to-noise ratio
*/

async function loraHandler() {
  const loraData = generateTestRandomNodeData();
  console.log(loraData);

  if (loraData.startsWith("+RCV=")) {
    rcvHandler(loraData);
    return;
  } else if (loraData.startsWith("+ERR=")) {
    errHandler(loraData);
    return;
  } else {
    elseHandler(loraData);
    return;
  }
}

async function rcvHandler(loraData) {
  console.log("[rcvHandler]");

  let nodeAddress;
  const regexPattern = /^\+RCV=\d+,\d+,(-?\d+\/){5}\d+\.\d+(\/\d+){3}\/\/,-?\d+,\d+$/;

  // ERR: lora regexPattern invaild (센서값오류?!)
  if (!regexPattern.test(loraData)) {
    console.log(regexPattern.test(loraData));
    addErrData({ loraContent: loraData, nodeInfo: null, errMsg: "lora regexPattern invaild" });
    return;
  }

  // Vaild case
  const loraContent = extractLoraContentFromLoraData(loraData);
  const splitedLoraContent = loraContent.split("/");
  const nodeSubstancesArray = [];
  for (const [index, value] of splitedLoraContent.entries()) {
    if (index === 0) {
      nodeAddress = value;
      updateTimeTraceByNodeaddress(nodeAddress);
    } else {
      nodeSubstancesArray.push(value.includes(".") ? parseFloat(value) : parseInt(value, 10));
    }
  }

  console.log("🚀 ~ rcvHandler ~ nodeSubstancesArray:", nodeSubstancesArray);

  await updateNodeBattery({
    nodeAddress: nodeAddress,
    loraContent: loraContent,
  });
  await addRawData({
    nodeAddress: nodeAddress,
    nodeSubstancesArray: nodeSubstancesArray,
  });

  return;
}

async function errHandler(loraData) {
  console.log("[errHandler]");

  const errMsg = getLoraErrTypeFromLoraData(loraData);

  let errDataObject = {
    loraContent: loraData,
    errMsg: errMsg,
  };
  console.log("🚀 ~ errHandler ~ errDataObject:", errDataObject);
  addErrData(errDataObject);
  return;
}

function elseHandler(loraData) {
  console.log("[elseHandler]");

  let errDataObject = {
    loraContent: loraData,
  };
  addErrData(errDataObject);
  return;
}

async function onTimeTrace() {
  for (let index = 1; index <= numberOfNode; index++) {
    const timestamp = timeTrace[index];
    const currentTime = new Date().getTime();
    const timeDifference = (currentTime - timestamp) / (1000 * 60);

    console.log(`[${index}]timestamp: ${timestamp}`);
    console.log("currentTime:", currentTime);
    console.log("timeDifference:", timeDifference);
    console.log(timeDifference >= packetTimeIntervalMin);

    if (timeDifference >= packetTimeIntervalMin) {
      const nodeInfo = await getCurrentNodeInfoByNodeAddress(String(index));
      console.log(`${packetTimeIntervalMin}분 경과한 nodeInfo:`, nodeInfo);
      addErrData({
        nodeInfo: nodeInfo,
        errMsg: "로라 패킷 수신불가",
      });
      timeTrace[index] = new Date().getTime();
    }
  }
  return;
}

function updateTimeTraceByNodeaddress(nodeAddress) {
  timeTrace[nodeAddress] = new Date().getTime();
  return;
}
