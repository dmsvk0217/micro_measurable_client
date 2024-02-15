exports.getDate = () => {
  const currentDate = new Date();
  const yyyyMM = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const dayDD = currentDate.getDate().toString().padStart(2, "0"); // DD format
  const hhmmss = currentDate.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS format
  const hh = currentDate.getHours().toString().padStart(2, "0"); // HH format
  return { yyyyMM, dayDD, hhmmss, hh };
};

exports.generateAllnodesTestData = () => {
  let result = "";
  for (let i = 1; i <= 15; i++) {
    result += this.generateRandomTestData(i);
  }
  return result;
};

exports.generateTestNodeData = (nodeAddress) => {
  return this.generateRandomTestData(nodeAddress);
};

exports.generateTestRandomNodeData = () => {
  const randomNodeAddress = Math.floor(Math.random() * 15) + 1;
  return this.generateRandomTestData(randomNodeAddress);
};

function getRandomWindDirectiony() {
  const windDirectionOptions = [0, 45, 90, 135, 180, 225, 270, 315];
  const randomIndex = Math.floor(Math.random() * windDirectionOptions.length);
  const selectedWindDirection = windDirectionOptions[randomIndex];
  return selectedWindDirection;
}

exports.generateRandomTestData = (nodeAddress) => {
  // 노드번호/습도/온도/pm10/pm2.5/포름알데히드/풍향/풍속
  const humidity = (Math.random() * (30 - -10) + -10).toFixed(0);
  const temperature = (Math.random() * (30 - -10) + -10).toFixed(0);
  const pm10 = (Math.random() * (15 - 5) + 5).toFixed(0);
  const pm25 = (Math.random() * (15 - 5) + 5).toFixed(0);
  const ch2o = (Math.random() * (0.05 - 0) + 0).toFixed(2);
  const wind_direction = getRandomWindDirectiony();
  const wind_speed = (Math.random() * (30 - 0) + 0).toFixed(0);
  const battery = Math.floor(Math.random() * 100) + 1;

  const result = `${nodeAddress}/${humidity}/${temperature}/${pm10}/${pm25}/${ch2o}/${wind_direction}/${wind_speed}/${battery}//`;
  return result;
};

exports.generateRandomTime = (i) => {
  let hh = i; // 0부터 23까지의 랜덤 시간
  let mm = Math.floor(Math.random() * 60); // 0부터 59까지의 랜덤 분
  let ss = Math.floor(Math.random() * 60); // 0부터 59까지의 랜덤 초

  // 시간, 분, 초를 두 자리 숫자로 변환
  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  const time = hh + ":" + mm + ":" + ss;
  return time;
};

exports.generateDayDD = (dayDD) => {
  dayDD = dayDD < 10 ? "0" + dayDD : dayDD;
  return dayDD;
};
