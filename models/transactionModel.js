const mongoose = require("mongoose");
const { type } = require("os");
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    remark: {
      type: String,
      required: [true, "Remark is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required"],
    },
    transaction_type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("transactions", transactionSchema);

module.exports = userModel;
