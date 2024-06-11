const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connected to the mongodb successfully");
  })
  .catch((err) => {
    console.log("Connection to mongodb failed", err);
  });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
