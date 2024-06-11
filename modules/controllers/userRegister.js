const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userRegister = async (req, res) => {
  const Users = mongoose.model("users");
  const { name, email, password, balance } = req.body; //destructuring

  //validation...

  //creation code...
  const encPassword = await bcrypt.hash(password, 10);
  try {
    const createdUser = await Users.create({
      name,
      email,
      password: encPassword,
      balance,
    });
  } catch (err) {
    res.status(400).json({ status: "Failled", error: err.message });
    return;
  }

  res.status(200).json({ status: "User registration page" });
};

module.exports = userRegister;
