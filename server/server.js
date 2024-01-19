const express = require("express");
const cors = require("cors");
const path = require("path");
const { fileURLToPath } = require("url");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const calDailyAverage = require("./routines/cal-daily-data.js");
const calMonthlyAverage = require("./routines/cal-monthly-data.js");
const calHourlyAverage = require("./routines/cal-hourly-data.js");

cron.schedule("0 * * * *", calHourlyAverage);
cron.schedule("0 0 * * *", calDailyAverage);
cron.schedule("0 0 1 * *", calMonthlyAverage);

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
