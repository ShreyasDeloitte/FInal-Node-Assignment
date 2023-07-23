const { addHackathonEventDao } = require("../dao/hackathonDao");

const addHackathonEventService = async (req) => {
  return await addHackathonEventDao(req);
};

module.exports = { addHackathonEventService };
