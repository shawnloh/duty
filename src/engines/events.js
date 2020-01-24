const moment = require("moment-timezone");
const Promise = require("bluebird");
const Event = require("../models/event");

class EventsEngine {
  static async purge() {
    const events = await Event.find({}).exec();

    const today = moment()
      .tz("Asia/Singapore")
      .format("DD-MM-YYYY");

    const eventsToRemoved = events.map(event => {
      const toRemove = moment(event.date, "DD-MM-YYYY", true).isBefore(
        moment(today, "DD-MM-YYYY", true)
      );

      if (toRemove) {
        return event.remove();
      }
    });
    if (eventsToRemoved.length > 0) {
      return await Promise.all(eventsToRemoved);
    }

    return Promise.resolve();
  }
}

module.exports = EventsEngine;
