const moment = require('moment-timezone');
const Promise = require('bluebird');
const Person = require('../models/person');

class BlockoutDateEngine {
  static async purge() {
    const today = moment().tz('Asia/Singapore').format('DD-MM-YYYY');

    let persons = await Person.find({}).exec();
    persons = persons.map((person) => {
      person.blockOutDates = person.blockOutDates.filter((date) => {
        const currDate = moment(date, 'DD-MM-YYYY', true);

        if (!currDate.isBefore(moment(today, 'DD-MM-YYYY', true))) {
          return true;
        }
        return false;
      });
      return person.save();
    });

    if (persons.length > 0) {
      return await Promise.all([...persons]);
    }
    return Promise.resolve();
  }
}

module.exports = BlockoutDateEngine;
