import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cron from "node-cron";

import calDailyAverage from "./routines/cal-daily-data.js";
import calMonthlyAverage from "./routines/cal-monthly-data.js";
import calHourlyAverage from "./routines/cal-hourly-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

require("./routes/user.routes")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
