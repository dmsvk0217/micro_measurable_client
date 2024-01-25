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

exports.getNodeAllSubstancesHourlyAveragesQuery = (
  yyyyMM,
  dayDD,
  hour,
  nodeAddress
) => {
  return `hourly-data/${yyyyMM}/day${dayDD}/hour${hour}/node${nodeAddress}/node${nodeAddress}`;
};

exports.getAllNodesAllSubstancesHourlyAveragesQuery = (yyyyMM, dayDD, hour) => {
  return `hourly-data/${yyyyMM}/day${dayDD}/hour${hour}/allNode/allNode`;
};

exports.getNodesSubstanceMonthlyAveragesQuery = (yyyyMM, substance) => {
  return `monthly-data/${yyyyMM}/${substance}/allNode`;
};

exports.getAllNodesSubstanceMonthlyAveragesQuery = (yyyyMM, substance) => {
  return `monthly-data/${yyyyMM}/${substance}/allNode`;
};
