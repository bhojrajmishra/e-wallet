const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  //Auth Logic...
  console.log(req.headers);
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ status: "Failed", message: "Unauthorized access" });
    return;
  }
  //chech auth header
  const token = authorizationHeader.split(" ")[1];
  try {
    const checkToken = jwt.verify(token, process.env.jwt_salt);
    req.user = checkToken;
  } catch (e) {
    res.status(401).json({ status: "Failed", message: "Unauthorized access" });
    return;
  }
  next();
};

module.exports = auth;
