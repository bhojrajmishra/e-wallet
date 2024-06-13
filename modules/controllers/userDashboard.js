const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const Users = mongoose.model("users");
  const Transactions = mongoose.model("transactions");

  const getTransaction = await Transactions.find({
    user_id: req.user._id,
  })
    .sort("-createdAt")
    .select("remark amount transaction_type")
    .limit(5);
  const getUserData = await Users.findOne({
    _id: req.user._id,
  }).select("balance name");

  res.status(200).json({ data: getUserData, transaction: getTransaction });
};

module.exports = userDashboard;
