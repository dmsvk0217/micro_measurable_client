module.exports = (app) => {
  const router = require("express").Router();
  const mainController = require("../controllers/main.controller");

  router.post(
    "/all-nodes/all-substances/daily-averages",
    mainController.allNodesAllSubstancesDailyAverages
  );

  router.post(
    "/all-nodes/all-substances/hourly-averages",
    mainController.allNodesAllSubstancesHourlyAverages
  );

  router.post(
    "/node/all-substances/daily-averages",
    mainController.NodeAllSubstancesDailyAverages
  );

  router.post(
    "/node/all-substances/hourly-averages",
    mainController.nodeAllSubstancesHourlyAverages
  );

  router.post(
    "/nodes/substance/monthly-averages",
    mainController.nodesSubstanceMonthlyAverages
  );

  router.post(
    "/all-nodes/substance/monthly-averages",
    mainController.allNodesSubstanceMonthlyAverages
  );

  app.use("/api", router);
};
