const rank = require("../../models/rank");
const platoon = require("../../models/platoon");
const person = require("../../models/person");

module.exports.seed = async () => {
  const lcpRank = await rank.findOne({ name: "LCP" });
  const cplRank = await rank.findOne({ name: "CPL" });
  const hqPlatoon = await platoon.findOne({ name: "HQ" });

  const seedPeople = [
    {
      name: "Shawn",
      rank: lcpRank._id,
      platoon: hqPlatoon._id
    },
    {
      name: "Edwin",
      rank: cplRank._id,
      platoon: hqPlatoon._id
    }
  ];
  console.log("Seeding person..");
  return await person.insertMany(seedPeople);
};

module.exports.clear = async () => {
  console.log("Clearing person..");
  return await person.deleteMany({}).exec();
};
