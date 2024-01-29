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

  app.use("/api", router);
};
