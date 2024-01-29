const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cron = require("node-cron");

// "초(option) 분 시 일 월 요일"
// cron.schedule("0 * * * *", calHourlyAverage); // 매시간
// cron.schedule("0 0 * * *", calAllNodeDailyAverage); // 매일
// cron.schedule("0 0 * * *", calNodeDailyAverage); // 매일
// cron.schedule("0 0 * * *", calMonthlyAverage); // 매일

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

require("./routers/main.router.js")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
