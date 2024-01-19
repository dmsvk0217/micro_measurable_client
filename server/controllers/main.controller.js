const {
  collection,
  addDoc,
  query,
  getDocs,
  getDoc,
  doc,
} = require("firebase/firestore");
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

  if (!date) return res.status(400).json({ error: "date can not be empty" });

  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "date is not valid date format" });

  yyyyMM = date.slice(0, 7);
  dayDD = date.slice(8);
  dataObject = {
    type: "all-nodes-all-substances-daily-averages",
    numberOfNode: "15",
    date: req.body.date,
    substance: "ALL",
    data: {},
  };

  try {
    const allNodeDocRef = doc(
      db,
      `daily-data/${yyyyMM}/day${dayDD}`,
      "allNode"
    );
    const docSnapshot = await getDoc(allNodeDocRef);

    if (!docSnapshot.exists()) {
      console.log(
        "🚀 ~ exports.allNodesAllSubstancesDailyAverages= ~ !docSnapshot.exists():",
        !docSnapshot.exists()
      );
      return res.status(500).json({ error: "docSnapshot doesn't exist" });
    }

    dataObject["data"] = docSnapshot.data();
  } catch (error) {
    console.error("Error getting document:", error);
  }

  return res.status(200).json({ dataObject });
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

exports.allNodesSubstanceMonthlyAverages = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "body can not be empty" });
  }

  // ”date”:”2024-01”
  // ”substance”: "pm10"
  const { date, substance } = req.body;
  let dataObject, yyyyMM, dayDD;

  if (!date || !substance)
    return res.status(400).json({ error: "'All fields are required'" });

  if (!isValidYYYYMMFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  if (!substanceType.includes(substance))
    return res.status(400).send({ error: "substance is invalid" });

  yyyyMM = date;
  dataObject = {
    type: "all-node-substance-monthly-averages",
    // Todo: numberOfNode를 collection에서 읽은 node의 수로 변경.
    numberOfNode: NUMBEROFNODE,
    date: date,
    substance: substance,
    data: {},
  };

  try {
    const documentRef = doc(
      db,
      `monthly-data/${yyyyMM}/${substance}`,
      "allNode"
    );

    const docSnapshot = await getDoc(documentRef);

    if (!docSnapshot.exists()) {
      console.log(
        "🚀 ~ exports.allNodesSubstanceMonthlyAverages= ~ documentRef.exists():",
        documentRef.exists()
      );
      return res.status(500).send({
        error: `monthly-data/${yyyyMM}/${substance}/allNode : documentRef not exists`,
      });
    }
    const data = docSnapshot.data();
    console.log("🚀 ~ exports.allNodesSubstanceMonthlyAverages= ~ data:", data);
    dataObject["data"] = data;
  } catch (error) {
    console.log(
      "🚀 ~ exports.nodeAllSubstancesHourlyAverages= ~ error:",
      error
    );
    return res.status(500).json({ error: error });
  }

  return res.status(200).json({ dataObject });
};

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

function isValidYYYYMMFormat(dateString) {
  const regex = /^\d{4}-\d{2}/;
  return regex.test(dateString);
}
