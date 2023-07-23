const jwt = require("jsonwebtoken");

const jwtSign = (payload) =>
  jwt.sign(payload, "secretKey", { expiresIn: "1h" });

module.exports = { jwtSign };
