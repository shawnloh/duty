const account = require("./account");
const person = require("./person");
const platoon = require("./platoon");
const rank = require("./rank");
const status = require("./status");
const Promise = require("bluebird");

module.exports.all = async () => {
  try {
    await Promise.all([
      account.seed(),
      platoon.seed(),
      rank.seed(),
      status.seed()
    ]);
    await person.seed();
    console.log("Successfully seed db");
  } catch (error) {
    console.error("error in seeding db", error);
  }
};

module.exports.clearDB = async () => {
  try {
    await Promise.all([
      account.clear(),
      platoon.clear(),
      rank.clear(),
      status.clear()
    ]);
    await person.clear();
    console.log("Successfully clear db");
  } catch (error) {
    console.error("error in clearing db", error);
  }
};
