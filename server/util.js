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
  console.log("🚀 ~ data:", data);

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
