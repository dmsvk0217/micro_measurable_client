const db = require("../firebase/firebase.js");
const querys = require("../querys.js");

exports.getRawDataInDay = async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "All fields are required" });
  if (!isValidDateFormat(date))
    return res.status(400).send({ error: "date is not valid date format" });

  const yyyyMM = date.slice(0, 7);
  const dayDD = date.slice(8);
  const query = querys.getRawDataQuery(yyyyMM, dayDD);
  let dataObject = {
    type: "getRawDataInDay",
    date: req.body.date,
    data: [],
  };

  try {
    const rawDataDayRef = db.collection(query);
    const snapshot = await rawDataDayRef.get();
    if (snapshot.empty) {
      console.log(`[getRawDataInDay] snapshot.empty ${query}`);
      return res.status(500).send({
        error: `[getRawDataInDay] snapshot.empty ${query}`,
      });
    }
    // snapshot.forEach((doc) => dataObject["data"].push(doc.data()));
    snapshot.forEach((doc) => {
      let docData = doc.data();
      docData["id"] = doc.id;
      dataObject["data"].push(docData);
    });
  } catch (error) {
    console.log("[getRawDataInDay]", error);
    return res.status(500).json({
      error: `[getRawDataInDay] ${error}`,
    });
  }

  console.log(`[${yyyyMM}-${dayDD}] getRawDataInDay done`);
  return res.status(200).json(dataObject);
};


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

exports.deleteNodeInfo = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "id field is required" });

  const query = querys.deleteNodeInfoQuery(id);
  let dataObject = {
    type: "deleteNodeInfo",
  };

  try {
    const nodeInfoRef = db.doc(query);
    await nodeInfoRef.delete();
    dataObject["result"] = "deleteNodeInfo done";
  } catch (error) {
    console.log("[deleteNodeInfo]", error);
    return res.status(500).json({
      error: `[deleteNodeInfo] ${error}`,
    });
  }

  console.log(`deleteNodeInfo done`);
  return res.status(200).json(dataObject);
};

exports.updateNodeInfo = async (req, res) => {
  // 노드번호	노드위치	위도	경도	베터리잔량
  const { nodeAddress, location, latitude, longitude, id } = req.body;
  if (!id) return res.status(400).json({ error: "id field is required" });
  if (!nodeAddress && !location && !latitude && !longitude)
    return res.status(400).json({ error: "At least one field is required" });

  const query = querys.updateNodeInfoQuery(id);
  let dataObject = {
    type: "updateNodeInfo",
  };
  let updateObject = {};
  if (nodeAddress) updateObject["nodeAddress"] = nodeAddress;
  if (location) updateObject["location"] = location;
  if (latitude) updateObject["latitude"] = latitude;
  if (longitude) updateObject["longitude"] = longitude;

  try {
    const nodeInfoRef = db.doc(query);
    await nodeInfoRef.update(updateObject);

    const updatedDocumentSnapshot = await nodeInfoRef.get();
    dataObject["data"] = updatedDocumentSnapshot.data();
  } catch (error) {
    console.log("[updateNodeInfo]", error);
    return res.status(500).json({
      error: `[updateNodeInfo] ${error}`,
    });
  }

  console.log(`updateNodeInfo done`);
  return res.status(200).json(dataObject);
};

exports.createNodeInfo = async (req, res) => {
  // 노드번호	노드위치	위도	경도	베터리잔량
  const { nodeAddress, location, latitude, longitude } = req.body;
  if (!nodeAddress || !location || !latitude || !longitude)
    return res.status(400).json({ error: "All fields are required" });

  const query = querys.createNodeInfoQuery();
  let dataObject = {
    type: "createNodeInfo",
    result: "createNodeInfo done",
    data: {},
  };
  let addObject = {
    nodeAddress: nodeAddress,
    location: location,
    latitude: latitude,
    longitude: longitude,
    battery: "?%",
  };

  try {
    const nodeInfoRef = db.collection(query);
    await nodeInfoRef.add(addObject);
    dataObject["data"] = addObject;
  } catch (error) {
    console.log("[createNodeInfo]", error);
    return res.status(500).json({
      error: `[createNodeInfo] ${error}`,
    });
  }

  console.log(`createNodeInfo done`);
  return res.status(200).json(dataObject);
};

exports.getNodeInfo = async (req, res) => {
  const query = querys.getNodeInfoQuery();
  let dataObject = {
    type: "getNodeInfo",
    data: [],
  };

  try {
    const nodeInfoRef = db.collection(query);
    const snapshot = await nodeInfoRef.get();
    if (snapshot.empty) {
      console.log(`[getNodeInfo] snapshot.empty ${query}`);
      return res.status(500).send({
        error: `[getNodeInfo] snapshot.empty ${query}`,
      });
    }

    snapshot.forEach((doc) => {
      let docData = doc.data();
      docData["id"] = doc.id;
      dataObject["data"].push(docData);
    });
  } catch (error) {
    console.log("[getNodeInfo]", error);
    return res.status(500).json({
      error: `[getNodeInfo] ${error}`,
    });
  }

  console.log(`getNodeInfo done`);
  return res.status(200).json(dataObject);
};