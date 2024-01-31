const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

dotenv.config({ path: "./config.env" });

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//Body Parser, Reading data from the body into req.body
app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    limit: "10kb",
  })
);

// prevent from attacks
app.use(helmet());

// cors error handler
app.use(cors());

app.use("/api/v1", require("./routes"));

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("Database Connected");
});

app.listen(8080, () => {
  console.log("App is running on port 8080");
});
