exports.getDate = () => {
  const currentDate = new Date();
  const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
  const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
  const hh = currentDate.getHours().toString().padStart(2, "0"); // HH format
  return { yyyyMM, dayDD, hhmmss, hh };
};

exports.countNodesFromJson = (dataObject) => {
  // dataObject JSON 데이터에서 "data" 부분 추출
  const data = dataObject.data;

  // 노드 이름 추출하여 중복 제거 후 개수 계산
  const uniqueNodes = new Set();
  for (key in data) {
    if (key && key.startsWith("node")) {
      uniqueNodes.add(key);
    }
  }

  const nodeCount = uniqueNodes.size;
  return nodeCount;
};

exports.getTargetNodesDatafromJson = (data, nodeAddresses) => {
  const resultData = {};

  for (const nodeAddress of nodeAddresses) {
    const nodeData = data[`node${nodeAddress}`];
    if (nodeData) {
      resultData[`node${nodeAddress}`] = { ...nodeData };
    }
  }

  console.log("🚀 ~ resultData:", resultData);
  return resultData;
};

exports.generateAllnodesTestData = () => {
  const result = [];
  for (var i = 0; i < 15; i++) {
    var randomData = this.generateRandomTestData(i);
    result.push(randomData);
  }
  return result;
};

exports.generateRandomTestData = (i) => {
  var firstNumber = i + 1;
  var secondNumber = (Math.random() * (30 - -10) + -10).toFixed(0);
  var thirdNumber = (Math.random() * (30 - -10) + -10).toFixed(0);
  var fourthNumber = (Math.random() * (15 - 5) + 5).toFixed(0);
  var fifthNumber = (Math.random() * (15 - 5) + 5).toFixed(0);
  var sixthNumber = (Math.random() * (0.05 - 0) + 0).toFixed(2);

  var data = `${firstNumber}/${secondNumber}/${thirdNumber}/${fourthNumber}/${fifthNumber}/${sixthNumber}`;
  return data;
};

exports.generateRandomTime = (i) => {
  var hh = i; // 0부터 23까지의 랜덤 시간
  var mm = Math.floor(Math.random() * 60); // 0부터 59까지의 랜덤 분
  var ss = Math.floor(Math.random() * 60); // 0부터 59까지의 랜덤 초

  // 시간, 분, 초를 두 자리 숫자로 변환
  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  var time = hh + ":" + mm + ":" + ss;
  return time;
};

exports.generateDayDD = (dayDD) => {
  dayDD = dayDD < 10 ? "0" + dayDD : dayDD;
  return dayDD;
};

exports.generateHHMMSStoHH = (hhmmss) => {
  let hh = hhmmss.slice(0, 2);
  return hh;
};

exports.printErrLog = (yyyyMM, dayDD, functionName, content, ref) => {
  console.log(`[${yyyyMM}-${dayDD}] ${functionName} (${content}) ${ref}`);
  return;
};

exports.printDoneLog = (yyyyMM, dayDD, functionName, content, ref) => {
  console.log(`[${yyyyMM}-${dayDD}] ${functionName} (${content}) ${ref}`);
  return;
};

exports.generateErrLog = (yyyyMM, dayDD, functionName, content, ref) => {
  return `[${yyyyMM}-${dayDD}] ${functionName} (${content}) ${ref}`;
};

exports.generateDoneLog = (yyyyMM, dayDD, functionName) => {
  return `[${yyyyMM}-${dayDD}] ${functionName} (done)`;
};
