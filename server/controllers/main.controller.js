const Cart = require("../models/cart.model");

exports.allNodesAllSubstancesDailyAverages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "Content can not be empty" });
  }

  const body = req.body;
};

exports.allNodesAllSubstancesHourlyAverages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "Content can not be empty" });
  }

  const body = req.body;
};

exports.NodeAllSubstancesDailyAverages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "Content can not be empty" });
  }

  const body = req.body;
};

exports.nodeAllSubstancesHourlyAverages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ data: "Content can not be empty" });
  }

  const body = req.body;
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
