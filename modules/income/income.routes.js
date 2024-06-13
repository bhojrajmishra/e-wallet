const express = require("express");
const addIncome = require("./controllers/addIncome");
const auth = require("../../middlewares/auth");

const incomeRouter = express.Router();

incomeRouter.use(auth);

incomeRouter.post("/add", addIncome);

module.exports = incomeRouter;
