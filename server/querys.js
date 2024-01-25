exports.getAllNodesAllSubstancesDailyAveragesQuery = (yyyyMM, dayDD) => {
  return `daily-data/${yyyyMM}/day${dayDD}/allNode`;
};

exports.getNodeAllSubstancesAllHourlyAveragesQuery = (
  yyyyMM,
  dayDD,
  nodeAddress
) => {
  return `hourly-data/${yyyyMM}/day${dayDD}/node${nodeAddress}/allHour/allHour`;
};

exports.getNodeAllSubstancesDailyAveragesQuery = (
  yyyyMM,
  dayDD,
  nodeAddress
) => {
  return `daily-data/${yyyyMM}/day${dayDD}/node${nodeAddress}`;
};
