const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// API endpoint 예시
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
