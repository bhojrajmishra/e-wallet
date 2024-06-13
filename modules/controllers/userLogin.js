const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userLogin = async (req, res) => {
  const Users = mongoose.model("users");
  const { email, password } = req.body; //destructuring
  //validation
  try {
    if (!email || !password) throw "please provide a email and password";
    const getUser = await Users.findOne({ email: email });
    if (!getUser) throw "User not found";
    const match = await bcrypt.compare(password, getUser.password);
    if (!match) throw "Email and Password is incorrect";
  } catch (e) {
    res.status(400).json({ status: "Failled", message: e });
    return;
  }

  //everything is fine
  const getUserForAccessToken = await Users.findOne({
    email: email,
  });

  const accessToken = jwt.sign(
    {
      _id: getUserForAccessToken._id,
      email: getUserForAccessToken.email,
      name: getUserForAccessToken.name,
    },
    process.env.jwt_salt,
    {
      expiresIn: "90 days",
    }
  );

  res.status(200).json({ status: "User Login page", accessToken: accessToken });
};

module.exports = userLogin;
