const { jwtSign } = require("../utilities/jwtSign");
const { Employee } = require("../model/employeeSchema");
const { Company } = require("../model/companySchema");
const { verifyPassword } = require("../utilities/passwordEncryption");
const {
  employeeloginService,
  companyloginService,
} = require("../service/loginService");
const e = require("express");

const loginController = async (req, res) => {
  const { password, userRole } = req.body;
  if (userRole === 0) {
    const employeeUser = await employeeloginService(req);
    const isPasswordValid = await verifyPassword(
      password,
      employeeUser.password
    );
    if (employeeUser && isPasswordValid) {
      const token = jwtSign({ employeeId: req.body?.employeeId });
      res.status(200).json({ message: "Logged in successfully", token });
    } else {
      res
        .status(403)
        .json({ message: "Invalid credentials or User not exists" });
    }
  }
  if (userRole === 1) {
    const companyUser = await companyloginService(req);
    const isPasswordValid = await verifyPassword(
      password,
      companyUser.password
    );
    if (companyUser && isPasswordValid) {
      const token = jwtSign({ companyId: req.body?.companyId });
      res.status(200).json({ message: "Logged in successfully", token });
    } else {
      res
        .status(403)
        .json({ message: "Invalid credentials or user not exists" });
    }
  }
};

module.exports = {
  loginController,
};
