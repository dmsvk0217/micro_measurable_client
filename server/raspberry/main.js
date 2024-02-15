const {
  getNodeInfoArr,
  isNodeSubstancesArrayValid,
  addRawData,
  addErrData,
  isLoraErr,
  getLoraErrType,
  updateNodeBattery,
  getCurrentNodeInfoByLoraContent,
  getCurrentNodeInfoByNodeAddress,
} = require("./func.js");
const { generateTestRandomNodeData } = require("./util.js");
const numberOfNode = 15;
const packetTimeIntervalMin = 0.1;
const checkTimeIntervalMills = 20000;
const testLoraHandleTimeIntervalMills = 2000;

let timeTrace = Array.from({ length: 16 }, () => new Date().getTime());

main();

async function main() {
  setInterval(onTimeTrace, checkTimeIntervalMills);
  setInterval(loraHandler, testLoraHandleTimeIntervalMills);
}

async function loraHandler() {
  let nodeAddress;
  let errFristNumberisNotInt = false;
  let errNotAllSubstanceIsVaild = false;
  let errMsg = [];

  const loraContent = generateTestRandomNodeData();
  console.log("Random loraContent:", loraContent);

  const nodeSubstancesArray = loraContent
    .split("/")
    .map((data, index) => {
      if (index === 0) {
        if (!isNaN(parseInt(data, 10))) {
          nodeAddress = data;
          setTimeTrace(nodeAddress);
        } else {
          errFristNumberisNotInt = true;
          console.log("errFristNumberisNotInt:", errFristNumberisNotInt);
          errMsg.push("frist number is not integer");
          if (isLoraErr(loraContent)) errMsg.push(getLoraErrType(loraContent));
        }
        return null;
      } else {
        if (isNaN(parseInt(data, 10)) && isNaN(parseFloat(data, 10))) {
          return null;
        } else {
          return !data.includes(".") ? parseInt(data, 10) : parseFloat(data);
        }
      }
    })
    .filter((data) => data !== null);

  if (!isNodeSubstancesArrayValid(nodeSubstancesArray)) {
    console.log("nodeSubstancesArray:", nodeSubstancesArray);
    errNotAllSubstanceIsVaild = true;
    console.log("errNotAllSubstanceIsVaild:", errNotAllSubstanceIsVaild);
    errMsg.push("not all substance is vaild");
  }

  if (errMsg.length !== 0) {
    let errDataObject = {
      loraContent: loraContent,
      errMsg: errMsg,
    };
    if (nodeAddress) {
      console.log("[errDataObject] nodeAddress:", nodeAddress);
      errDataObject["nodeInfo"] = await getCurrentNodeInfoByNodeAddress();
      console.log("[errDataObject]:", errDataObject);
    }
    addErrData(errDataObject);
  } else {
    await updateNodeBattery({
      nodeAddress: nodeAddress,
      loraContent: loraContent,
    });
    await addRawData({
      nodeAddress: nodeAddress,
      nodeSubstancesArray: nodeSubstancesArray,
    });
  }
  return null;
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
      console.log("🚀 ~ onTimeTrace ~ nodeInfo:", nodeInfo);
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

function setTimeTrace(nodeAddress) {
  timeTrace[nodeAddress] = new Date().getTime();
  return;
}
