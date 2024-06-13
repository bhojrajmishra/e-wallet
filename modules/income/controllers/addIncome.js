const mongoose = require("mongoose");
const addIncome = async (req, res) => {
  const Users = mongoose.model("users");
  const Transactions = mongoose.model("transactions");
  const { amount, remark } = req.body;
  try {
    if (!amount) throw "Please provide an amount";
    if (!remark) throw "Please provide a remark";
    if (amount < 1) throw "Amount should be greater then 1";
    if (remark.length < 3) throw "Remark should be greater then 3";
  } catch (e) {
    res.status(400).json({ status: "Failed", message: e });
    return;
  }

  //sucess
  try {
    await Transactions.create({
      user_id: req.user._id,
      remark: remark,
      amount: amount,
      transaction_type: "income",
    });
    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: { balance: amount },
      },
      {
        runValidators: true,
      }
    );
    //create transaction history
  } catch (e) {
    res.status(400).json({ status: "Failed", message: e.message });
    return;
  }

  res.status(200).json({ status: "Income added successfully" });
};

module.exports = addIncome;
