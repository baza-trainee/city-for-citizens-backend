require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || "localhost";

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, HOST, () =>
  console.log(`Server started at: http://${HOST}:${PORT}`)
);
