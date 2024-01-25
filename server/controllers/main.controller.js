const {
  collection,
  addDoc,
  query,
  getDocs,
  getDoc,
  doc,
} = require("firebase/firestore");
const db = require("../firebase.js");
const util = require("../util.js");
const querys = require("../querys.js");
const {
  NUMBEROFNODE,
  NUMBEROFSUBSTANCE,
  substanceType,
  nodeAddressOptions,
  substanceDailyAverageType,
} = require("../const.js");

/* 
    request body
    {
      ”date”:”2024-01-22”
    }
  */
exports.allNodesAllSubstancesDailyAverages = async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  const dayDD = date.slice(8);
  let dataObject = {
    type: "all-nodes-all-substances-daily-averages",
    date: req.body.date,
    substance: "ALL",
    data: {},
  };
  const query = querys.getAllNodesAllSubstancesDailyAveragesQuery(
    yyyyMM,
    dayDD
  );

  try {
    const allNodeDocRef = doc(db, query);
    const docSnapshot = await getDoc(allNodeDocRef);

    if (!docSnapshot.exists()) {
      const errMsg = util.generateErrLog(
        yyyyMM,
        dayDD,
        "allNodesAllSubstancesDailyAverages",
        "docSnapshot does not exists",
        query
      );
      console.log(errMsg);
      return res.status(500).send({
        error: errMsg,
      });
    }

    dataObject["data"] = docSnapshot.data();
    dataObject["numberOfNode"] = util.countNodesFromJson(dataObject);
  } catch (error) {
    const errMsg = util.generateErrLog(
      yyyyMM,
      dayDD,
      "allNodesAllSubstancesDailyAverages",
      "Internal Server Error",
      error
    );
    console.log(errMsg);
    return res.status(500).json({
      error: errMsg,
    });
  }

  console.log(`[${yyyyMM}-${dayDD}] allNodesAllSubstancesDailyAverages(done)`);
  return res.status(200).json(dataObject);
};

/* 
    request body
    {
      ”date”:”2024-01-15”
      ”nodeAddressName”: "오석관"
    }
  */
exports.NodeAllSubstancesDailyAverages = async (req, res) => {
  const { date, nodeAddressName } = req.body;
  if (!date || !nodeAddressName)
    return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  const dayDD = date.slice(8);
  const nodeAddressNumber = nodeAddressOptions[nodeAddressName];
  let dataObject = {
    type: "node-all-substances-daily-averages",
    date: req.body.date,
    substance: "ALL",
    data: {},
  };
  const query = querys.getNodeAllSubstancesDailyAveragesQuery(
    yyyyMM,
    dayDD,
    nodeAddressNumber
  );

  try {
    const dailyAverageRef = doc(db, query);
    const docSnapshot = await getDoc(dailyAverageRef);

    if (!docSnapshot.exists()) {
      const errMsg = util.generateErrLog(
        yyyyMM,
        dayDD,
        "NodeAllSubstancesDailyAverages",
        "docSnapshot does not exists",
        query
      );
      console.log(errMsg);
      return res.status(500).send({
        error: errMsg,
      });
    }
    dataObject["data"] = docSnapshot.data();
  } catch (error) {
    const errMsg = util.generateErrLog(
      yyyyMM,
      dayDD,
      "NodeAllSubstancesDailyAverages",
      "Internal Server Error",
      error
    );
    console.log(errMsg);
    return res.status(500).json({ error: errMsg });
  }

  console.log(`[${yyyyMM}-${dayDD}] NodeAllSubstancesDailyAverages(done)`);
  return res.status(200).json(dataObject);
};

exports.nodeAllSubstancesAllHourlyAverages = async (req, res) => {
  /* 
    request body
    {
      ”date”:”2024-01-15”
      ”nodeAddress”:13
    }
  */

  let { date, nodeAddressName } = req.body;
  if (!date || !nodeAddressName)
    return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  let dataObject, yyyyMM, dayDD;
  const nodeAddress = nodeAddressOptions[nodeAddressName];
  const query = querys.getNodeAllSubstancesAllHourlyAveragesQuery(
    yyyyMM,
    dayDD,
    nodeAddress
  );
  yyyyMM = date.slice(0, 7);
  dayDD = date.slice(8);

  dataObject = {
    type: "node-all-substances-all-hourly-averages",
    date: date,
    substance: "ALL",
    data: {},
  };

  try {
    const allHourlyAverageRef = doc(db, query);

    const docSnapshot = await getDoc(allHourlyAverageRef);
    if (!docSnapshot.exists()) {
      const errMsg = util.generateErrLog(
        yyyyMM,
        dayDD,
        "nodeAllSubstancesAllHourlyAverages",
        "docSnapshot does not exists",
        query
      );
      console.log(errMsg);
      return res.status(500).json({
        error: errMsg,
      });
    }

    const nodeData = docSnapshot.data();
    dataObject["data"] = nodeData;
    dataObject["numberOfNode"] = util.countNodesFromJson(dataObject);
  } catch (error) {
    const errMsg = util.generateErrLog(
      yyyyMM,
      dayDD,
      "nodeAllSubstancesAllHourlyAverages",
      "Internal Server Error",
      error
    );
    console.log(errMsg);
    return res.status(500).json({ error: errMsg });
  }

  return res.status(200).json({ dataObject });
};

exports.allNodesAllSubstancesHourlyAverages = async (req, res) => {
  /* 
    request body
    {
      ”date”:”2024-01-22”
      hour: "16"
    }
  */

  const { date, hour } = req.body;
  let dataObject, yyyyMM, dayDD;

  if (!date || !hour)
    return res.status(400).json({ error: "All fields are required" });

  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "date is not valid date format" });

  yyyyMM = date.slice(0, 7);
  dayDD = date.slice(8);
  dataObject = {
    type: "all-nodes-all-substances-hourly-averages",
    numberOfNode: null,
    date: req.body.date,
    substance: "ALL",
    data: {},
  };

  try {
    const allNodeDocRef = doc(
      db,
      `hourly-data/${yyyyMM}/day${dayDD}/hour${hour}/allNode/allNode`
    );
    const docSnapshot = await getDoc(allNodeDocRef);

    if (!docSnapshot.exists()) {
      console.log(
        "🚀 ~ exports.allNodesAllSubstancesHourlyAverages= ~ !docSnapshot.exists():",
        !docSnapshot.exists()
      );
      return res.status(500).json({
        error: `hourly-data/${yyyyMM}/day${dayDD}/hour${hour}/allNode/allNode : docSnapshot doesn't exist`,
      });
    }

    dataObject["data"] = docSnapshot.data();
    let numberOfNode = util.countNodesFromJson(dataObject);
    dataObject["numberOfNode"] = numberOfNode;
  } catch (error) {
    console.log(
      "🚀 ~ exports.allNodesAllSubstancesHourlyAverages= ~ error:",
      error
    );
    return res.status(500).json({ error: error });
  }

  return res.status(200).json({ dataObject });
};

exports.nodeAllSubstancesHourlyAverages = async (req, res) => {
  /* 
    request body
    {
      ”date”:”2024-01-15”
      ”hour”:”21”
      ”nodeAddress”:13
    }
  */

  const { date, nodeAddress, hour } = req.body;
  let dataObject, yyyyMM, dayDD;

  if (!date || !nodeAddress || !hour)
    return res.status(400).json({ error: "All fields are required" });

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

exports.nodesSubstanceMonthlyAverages = async (req, res) => {
  /* 
    request body
    {
      ”date”:”2024-01”
      ”substance”: "pm10"
      ”nodeAddressesArray”: [”3”, ”8”, “14”]
    }
  */

  const { date, substance, nodeAddressesArray } = req.body;
  let dataObject, yyyyMM;

  if (!date || !substance || !nodeAddressesArray)
    return res.status(400).json({ error: "'All fields are required'" });

  if (!isValidYYYYMMFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  if (!substanceType.includes(substance))
    return res.status(400).send({ error: "substance is invalid" });

  yyyyMM = date;
  dataObject = {
    type: "nodes-substance-monthly-averages",
    date: date,
    substance: substance,
    nodeAddressesArray: nodeAddressesArray,
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
      return res.status(500).send({
        error: `monthly-data/${yyyyMM}/${substance}/allNode : documentRef does not exists`,
      });
    }

    const data = docSnapshot.data();
    const resultData = util.getTargetNodesDatafromJson(
      data,
      nodeAddressesArray
    );
    dataObject["data"] = resultData;
    console.log(
      "🚀 ~ exports.nodesSubstanceMonthlyAverages= ~ resultData:",
      resultData
    );

    let numberOfNode = util.countNodesFromJson(dataObject);
    dataObject["numberOfNode"] = numberOfNode;
  } catch (error) {
    console.log(
      "🚀 ~ exports.nodeAllSubstancesHourlyAverages= ~ error:",
      error
    );
    return res.status(500).json({ error: error });
  }

  return res.status(200).json({ dataObject });
};

exports.allNodesSubstanceMonthlyAverages = async (req, res) => {
  /* 
    request body
    {
      ”date”:”2024-01”
      ”substance”: "pm10"
    }
  */

  const { date, substance } = req.body;
  let dataObject, yyyyMM;

  if (!date || !substance)
    return res.status(400).json({ error: "'All fields are required'" });

  if (!isValidYYYYMMFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  if (!substanceType.includes(substance))
    return res.status(400).send({ error: "substance is invalid" });

  yyyyMM = date;
  dataObject = {
    type: "all-node-substance-monthly-averages",
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
        error: `monthly-data/${yyyyMM}/${substance}/allNode : documentRef does not exists`,
      });
    }
    const data = docSnapshot.data();
    dataObject["data"] = data;
    console.log("🚀 ~ exports.allNodesSubstanceMonthlyAverages= ~ data:", data);

    let numberOfNode = util.countNodesFromJson(dataObject);
    dataObject["numberOfNode"] = numberOfNode;
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
