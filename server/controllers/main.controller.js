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
    nodeAddressName: nodeAddressName,
    nodeAddressNumber: nodeAddressNumber,
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

/* 
    request body
    {
      ”date”:”2024-01-15”
      ”nodeAddressName”: "오석관"
    }
  */
exports.nodeAllSubstancesAllHourlyAverages = async (req, res) => {
  const { date, nodeAddressName } = req.body;
  if (!date || !nodeAddressName)
    return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  const dayDD = date.slice(8);
  const nodeAddressNumber = nodeAddressOptions[nodeAddressName];
  let dataObject = {
    type: "node-all-substances-all-hourly-averages",
    date: date,
    nodeAddressName: nodeAddressName,
    nodeAddressNumber: nodeAddressNumber,
    substance: "ALL",
    data: {},
  };
  const query = querys.getNodeAllSubstancesAllHourlyAveragesQuery(
    yyyyMM,
    dayDD,
    nodeAddressNumber
  );

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
    dataObject["data"] = docSnapshot.data();
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

  return res.status(200).json(dataObject);
};

/* 
    request body
    {
      ”date”:”2024-01-22”
      hour: "16:00"
    }
  */
exports.allNodesAllSubstancesHourlyAverages = async (req, res) => {
  const { date, hour } = req.body;
  if (!date || !hour)
    return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  const dayDD = date.slice(8);
  const hh = hour.slice(0, 2);
  let dataObject = {
    type: "all-nodes-all-substances-hourly-averages",
    date: req.body.date,
    substance: "ALL",
    hour: hour,
    data: {},
  };
  const query = querys.getAllNodesAllSubstancesHourlyAveragesQuery(
    yyyyMM,
    dayDD,
    hh
  );

  try {
    const allNodeDocRef = doc(db, query);
    const docSnapshot = await getDoc(allNodeDocRef);

    if (!docSnapshot.exists()) {
      const errMsg = util.generateErrLog(
        yyyyMM,
        dayDD,
        "allNodesAllSubstancesHourlyAverages",
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
      "allNodesAllSubstancesHourlyAverages",
      "Internal Server Error",
      error
    );
    console.log(errMsg);
    return res.status(500).json({
      error: errMsg,
    });
  }

  console.log(`[${yyyyMM}-${dayDD}] allNodesAllSubstancesHourlyAverages(done)`);
  return res.status(200).json(dataObject);
};

/* 
    request body
    {
      ”date”:”2024-01-15”
      ”hour”:”21:00”
      ”nodeAddressName”:"현동홀"
    }
  */
exports.nodeAllSubstancesHourlyAverages = async (req, res) => {
  const { date, nodeAddressName, hour } = req.body;
  if (!date || !nodeAddressName || !hour)
    return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  const dayDD = date.slice(8);
  const hh = hour.slice(0, 2);
  const nodeAddressNumber = nodeAddressOptions[nodeAddressName];
  let dataObject = {
    type: "node-all-substances-hourly-averages",
    date: req.body.date,
    nodeAddressName: nodeAddressName,
    nodeAddressNumber: nodeAddressNumber,
    hour: hour,
    substance: "ALL",
    data: {},
  };
  const query = querys.getNodeAllSubstancesHourlyAveragesQuery(
    yyyyMM,
    dayDD,
    hh,
    nodeAddressNumber
  );

  try {
    const hourlyAverageRef = doc(db, query);
    const docSnapshot = await getDoc(hourlyAverageRef);

    if (!docSnapshot.exists()) {
      const errMsg = util.generateErrLog(
        yyyyMM,
        dayDD,
        "nodeAllSubstancesHourlyAverages",
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
      "nodeAllSubstancesHourlyAverages",
      "Internal Server Error",
      error
    );
    console.log(errMsg);
    return res.status(500).json({
      error: errMsg,
    });
  }

  console.log(`[${yyyyMM}-${dayDD}] nodeAllSubstancesHourlyAverages(done)`);
  return res.status(200).json(dataObject);
};

/* 
    request body
    {
      ”date”:”2024-01”
      ”substance”: "pm10"
      nodeAddressNameArray: [”3”, ”8”, “14”]
    }
  */
exports.nodesSubstanceMonthlyAverages = async (req, res) => {
  const { date, substance, nodeAddressNameArray } = req.body;
  if (!date || !substance || !nodeAddressNameArray)
    return res.status(400).json({ error: "'All fields are required'" });
  if (!isValidYYYYMMFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });
  if (!substanceType.includes(substance))
    return res.status(400).send({ error: "substance is invalid" });

  const yyyyMM = date.slice(0, 7);
  const hh = hour.slice(0, 2);
  const nodeAddressNumber = nodeAddressOptions[nodeAddressName];
  let dataObject = {
    type: "nodes-substance-monthly-averages",
    date: date,
    substance: substance,
    nodeAddressNameArray: nodeAddressNameArray,
    data: {},
  };
  const query = querys.getNodesSubstanceMonthlyAveragesQuery(yyyyMM, substance);

  try {
    const documentRef = doc(db, query);
    const docSnapshot = await getDoc(documentRef);

    if (!docSnapshot.exists()) {
      const errMsg = util.generateErrLog(
        yyyyMM,
        "",
        "nodesSubstanceMonthlyAverages",
        "docSnapshot does not exists",
        query
      );
      console.log(errMsg);
      return res.status(500).send({
        error: errMsg,
      });
    }

    const resultData = util.getTargetNodesDatafromJson(
      docSnapshot.data(),
      nodeAddressNameArray
    );
    dataObject["data"] = resultData;
    dataObject["numberOfNode"] = util.countNodesFromJson(dataObject);
  } catch (error) {
    const errMsg = util.generateErrLog(
      yyyyMM,
      "",
      "nodesSubstanceMonthlyAverages",
      "Internal Server Error",
      error
    );
    console.log(errMsg);
    return res.status(500).json({
      error: errMsg,
    });
  }

  console.log(`[${yyyyMM}] nodesSubstanceMonthlyAverages(done)`);
  return res.status(200).json(dataObject);
};

/* 
    request body
    {
      ”date”:”2024-01”
      ”substance”: "pm10"
    }
  */
exports.allNodesSubstanceMonthlyAverages = async (req, res) => {
  const { date, substance } = req.body;
  if (!date || !substance)
    return res.status(400).json({ error: "'All fields are required'" });
  if (!isValidYYYYMMFormat(date))
    return res.status(400).send({ error: "Date is not valid date format" });
  if (!substanceType.includes(substance))
    return res.status(400).send({ error: "substance is invalid" });

  const yyyyMM = date;
  const nodeAddressNumber = nodeAddressOptions[nodeAddressName];
  let dataObject = {
    type: "all-node-substance-monthly-averages",
    date: date,
    substance: substance,
    data: {},
  };
  const query = querys.getAllNodesSubstanceMonthlyAveragesQuery(
    yyyyMM,
    substance
  );

  try {
    const documentRef = doc(db, query);
    const docSnapshot = await getDoc(documentRef);

    if (!docSnapshot.exists()) {
      const errMsg = util.generateErrLog(
        yyyyMM,
        dayDD,
        "allNodesSubstanceMonthlyAverages",
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
      "",
      "allNodesSubstanceMonthlyAverages",
      "Internal Server Error",
      error
    );
    console.log(errMsg);
    return res.status(500).json({
      error: errMsg,
    });
  }

  console.log(`[${yyyyMM}-${dayDD}] allNodesSubstanceMonthlyAverages(done)`);
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
