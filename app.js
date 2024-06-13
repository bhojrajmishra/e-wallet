const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { use } = require("./modules/users.routes");
const userRouter = require("./modules/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const expenseRouter = require("./modules/expenses/expense.routes");
require("dotenv").config();
app.use(express.json()); // to require req.body
//Models..
require("./models/userModel");
require("./models/transactionModel");

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connected to the mongodb successfully");
  })
  .catch((err) => {
    console.log("Connection to mongodb failed", err);
  });
//Routes..
app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
