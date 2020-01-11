const platoon = require("../../models/platoon");

module.exports.seed = async () => {
  const platoons = ["HQ", "PLATOON 1", "PLATOON 2", "PLATOON 3", "PLATOON 4"];
  const seedPlatoons = [];

  platoons.forEach(platoon => {
    seedPlatoons.push({
      name: platoon
    });
  });
  console.log("Seeding platoons..");
  return await platoon.insertMany(seedPlatoons);
};

module.exports.clear = async () => {
  console.log("Clearing platoons..");
  return await platoon.deleteMany({});
};
