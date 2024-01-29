const db = require("../firebase/firebase.js");
const querys = require("../querys.js");

/*
  request body
  {
    "date":"2024-01-22"
  }
*/
exports.allNodesAllSubstancesHourlyAverages = async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  const dayDD = date.slice(8);
  let dataObject = {
    type: "all-nodes-all-substances-hourly-averages",
    date: req.body.date,
    data: {},
  };
  const query = querys.getAllNodesAllSubstancesHourlyAveragesQuery(
    yyyyMM,
    dayDD
  );

  try {
    const allNodeDocRef = db.doc(query);
    console.log(
      "🚀 ~ exports.allNodesAllSubstancesHourlyAverages= ~ allNodeDocRef:",
      allNodeDocRef
    );
    const docSnapshot = await allNodeDocRef.get();
    console.log(
      "🚀 ~ exports.allNodesAllSubstancesHourlyAverages= ~ docSnapshot:",
      docSnapshot
    );

    if (!docSnapshot.exists) {
      console.log(`[HourlyAverages] !docSnapshot.exists ${query}`);
      return res.status(500).send({
        error: `[HourlyAverages] !docSnapshot.exists ${query}`,
      });
    }
    dataObject["data"] = docSnapshot.data();
  } catch (error) {
    console.log("[HourlyAverages]", error);
    return res.status(500).json({
      error: `[HourlyAverages] ${error}`,
    });
  }

  console.log(`[${yyyyMM}-${dayDD}] HourlyAverages done`);
  return res.status(200).json(dataObject);
};

/* 
  request body
  {
    "date":"2024-01"
  }
*/
exports.allNodesAllSubstancesDailyAverages = async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "All fields are required" });
  if (!isValidYYYYMMFormat(date))
    return res.status(400).send({ error: "date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  let dataObject = {
    type: "all-nodes-all-substances-daily-averages",
    date: req.body.date,
    data: {},
  };
  const query = querys.getAllNodesAllSubstancesDailyAveragesQuery(yyyyMM);

  try {
    const allNodeDocRef = db.doc(query);
    const docSnapshot = await allNodeDocRef.get();

    if (!docSnapshot.exists) {
      console.log("[DailyAverages] !docSnapshot.exists");
      return res.status(500).send({
        error: "[DailyAverages] !docSnapshot.exists",
      });
    }

    dataObject["data"] = docSnapshot.data();
  } catch (error) {
    console.log("[DailyAverages]", error);
    return res.status(500).json({
      error: `[DailyAverages] ${error}`,
    });
  }

  console.log(`[${yyyyMM}] DailyAverages done`);
  return res.status(200).json(dataObject);
};

/* 
  request body
  {
    "date":"2024"
  }
*/
exports.allNodesAllSubstancesMonthlyAverages = async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "All fields are required" });

  const yyyy = date;
  let dataObject = {
    type: "all-nodes-all-substances-monthly-averages",
    date: yyyy,
    data: {},
  };
  const query = querys.getAllNodesAllSubstancesMonthlyAveragesQuery(yyyy);

  try {
    const allNodeDocRef = db.doc(query);
    const docSnapshot = await allNodeDocRef.get();

    if (!docSnapshot.exists) {
      console.log("[MonthlyAverages] !docSnapshot.exists");
      return res.status(500).send({
        error: "[MonthlyAverages] !docSnapshot.exists",
      });
    }

    dataObject["data"] = docSnapshot.data();
  } catch (error) {
    console.log("[MonthlyAverages]", error);
    return res.status(500).json({
      error: `[MonthlyAverages] ${error}`,
    });
  }

  console.log(`[${yyyy}] MonthlyAverages done`);
  return res.status(200).json(dataObject);
};

function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

function isValidYYYYMMFormat(dateString) {
  const regex = /^\d{4}-\d{2}/;
  return regex.test(dateString);
}
