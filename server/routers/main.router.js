module.exports = (app) => {
  const router = require("express").Router();
  const mainController = require("../controllers/main.controller");

  router.post(
    "/all-nodes/all-substances/hourly-averages",
    mainController.allNodesAllSubstancesHourlyAverages
  );

  router.post(
    "/all-nodes/all-substances/daily-averages",
    mainController.allNodesAllSubstancesDailyAverages
  );

  router.post(
    "/all-nodes/all-substances/monthly-averages",
    mainController.allNodesAllSubstancesMonthlyAverages
  );

  router.post("/rawData/day", mainController.getRawDataInDay);


  router.get("/nodeInfo", mainController.getNodeInfo);
  router.post("/nodeInfo", mainController.createNodeInfo);
  router.put("/nodeInfo", mainController.updateNodeInfo);
  router.delete("/nodeInfo", mainController.deleteNodeInfo);

  app.use("/api", router);
};
