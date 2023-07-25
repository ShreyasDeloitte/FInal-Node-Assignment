const { registerHackathonDao } = require("../dao/employeeDao");

const registerHackathonEventService = async (req) => {
  return await registerHackathonDao(req);
};

module.exports = { registerHackathonEventService };
