const { collection, addDoc, query, getDocs } = require("firebase/firestore");
const db = require("../firebase.js");
const {
  NUMBEROFNODE,
  NUMBEROFSUBSTANCE,
  substanceType,
  substanceDailyAverageType,
} = require("../const.js");

exports.allNodesAllSubstancesDailyAverages = async (req, res) => {
  const { date } = req.body;
  let dataObject, yyyyMM, dayDD;

  if (!date) {
    return res.status(400).json({ error: "date can not be empty" });
  }

  if (!isValidDateFormat(date)) {
    return res.status(400).send({ error: "date is not valid date format" });
  }

  yyyyMM = date.slice(0, 7);
  dayDD = date.slice(8);

  dataObject = {
    type: "all-nodes-all-substances-daily-averages",
    "number-of-node": "15",
    date: req.body.date,
    substance: "ALL",
    data: {},
  };

  const dailyAverageRef = collection(db, `daily-data/${yyyyMM}/day${dayDD}`);

  // dailyDataRef에서 문서들을 가져옴
  const querySnapshot = await getDocs(dailyAverageRef);

  if (querySnapshot.docs.length === 0) {
    console.log("🚀 ~ calDailyAverageWithNode docs.length = 0");
    return;
  }

  // 가져온 문서들을 반복하며 각 노드의 데이터 출력
  querySnapshot.forEach((doc) => {
    const nodeData = doc.data(); // 각 노드의 데이터
    console.log(`Node ${doc.id} Data:`, nodeData);

    // 각 노드의 data 컬렉션에 대한 참조
    const dataRef = collection(doc.ref, "data");

    // dataRef에서 문서들을 가져옴
    getDocs(dataRef).then((dataSnapshot) => {
      // 각 물질별 데이터 출력
      dataSnapshot.forEach((dataDoc) => {
        const substanceData = dataDoc.data();
        console.log(`Substance ${dataDoc.id} Data:`, substanceData);
      });
    });
  });

  return res.status(200).json({ result: "OK" });
};

exports.allNodesAllSubstancesHourlyAverages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "Content can not be empty" });
  }

  const body = req.body;
};

exports.NodeAllSubstancesDailyAverages = async (req, res) => {
  const { date, nodeAddress } = req.body;
  let dataObject, yyyyMM, dayDD;

  if (!date || !nodeAddress)
    return res.status(400).json({ error: "'All fields are required'" });

  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  yyyyMM = date.slice(0, 7);
  dayDD = date.slice(8);
  dataObject = {
    type: "node-all-substances-daily-averages",
    numberOfNode: nodeAddress,
    date: req.body.date,
    substance: "ALL",
    data: {},
  };

  try {
    const dailyAverageRef = collection(
      db,
      `daily-data/${yyyyMM}/day${dayDD}/node${nodeAddress}/data`
    );

    const querySnapshot = await getDocs(dailyAverageRef);

    if (querySnapshot.docs.length === 0) {
      console.log("🚀 ~ querySnapshot.docs.length === 0");
      return res.status(500).send({ error: "querySnapshot.docs.length === 0" });
    }

    const nodeData = querySnapshot.docs[0].data();
    dataObject["data"] = nodeData;
  } catch (error) {
    return res.status(500).json({ error: error });
  }

  return res.status(200).json({ dataObject });
};

exports.nodeAllSubstancesHourlyAverages = async (req, res) => {
  const { date, nodeAddress, hour } = req.body;
  let dataObject, yyyyMM, dayDD;

  if (!date || !nodeAddress || !hour)
    return res.status(400).json({ error: "'All fields are required'" });

  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  yyyyMM = date.slice(0, 7);
  dayDD = date.slice(8);
  dataObject = {
    type: "node-all-substances-hourly-averages",
    numberOfNode: nodeAddress,
    date: req.body.date,
    hour: hour,
    substance: "ALL",
    data: {},
  };

  try {
    const hourlyAverageRef = collection(
      db,
      `hourly-data/${yyyyMM}/day${dayDD}/hour${hour}/node${nodeAddress}`
    );

    const querySnapshot = await getDocs(hourlyAverageRef);

    if (querySnapshot.docs.length === 0) {
      console.log("🚀 ~ querySnapshot.docs.length === 0");
      return res.status(500).send({ error: "querySnapshot.docs.length === 0" });
    }

    const nodeData = querySnapshot.docs[0].data();
    dataObject["data"] = nodeData;
  } catch (error) {
    console.log(
      "🚀 ~ exports.nodeAllSubstancesHourlyAverages= ~ error:",
      error
    );
    return res.status(500).json({ error: error });
  }

  return res.status(200).json({ dataObject });
};

exports.nodesSubstanceMonthlyAverages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "Content can not be empty" });
  }

  const body = req.body;
};

exports.allNodesSubstanceMonthlyAverages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "Content can not be empty" });
  }

  const body = req.body;
};

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
