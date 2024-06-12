const userDashboard = (req, res) => {
  res.status(200).json({ status: "User Dashboard page" });
};

module.exports = userDashboard;
