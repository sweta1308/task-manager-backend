const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./db/db.connect");

const mongoose = require("mongoose");
const express = require("express");
const taskRouter = require("./routes/task.route");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/tasks", taskRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server started on port " + port);
});
