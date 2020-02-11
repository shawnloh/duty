const Promise = require("bluebird");
const moment = require("moment-timezone");
const Event = require("../models/event");
const PersonnelPoints = require("../models/personnelPoint");
const Person = require("../models/person");
const Point = require("../models/point");

class EventRepository {
  static async findAll() {
    const events = await Event.find({})
      .populate("pointSystem", "_id name")
      .populate("personnels", "_id name")
      .select("-createdAt -updatedAt -__v")
      .lean()
      .exec();
    return events;
  }

  static async findById(eventId) {
    const event = await Event.findById(eventId)
      .populate("pointSystem", "_id name")
      .populate("personnels", "_id name")
      .select("-createdAt -updatedAt -__v")
      .lean()
      .exec();
    if (!event) {
      return EventRepository.errors.INVALID_EVENT_ID;
    }
    return event;
  }

  static async create(
    name = null,
    date,
    pointSystemId,
    pointsAllocation,
    personnels = []
  ) {
    if (!name) {
      const point = await Point.findById(pointSystemId).exec();
      const today = moment()
        .tz("Asia/Singapore")
        .format("DD-MM-YYYY");
      name = `${today}-${point.name}`;
    }
    await Promise.all([
      PersonnelPoints.updateMany(
        {
          personId: { $in: personnels },
          pointSystem: pointSystemId
        },
        {
          $inc: { points: pointsAllocation }
        }
      ).exec(),
      Person.updateMany(
        {
          _id: { $in: personnels }
        },
        { $addToSet: { eventsDate: date } }
      ).exec()
    ]);

    let newEvent = new Event({
      name,
      date,
      pointSystem: pointSystemId,
      pointsAllocation,
      personnels
    });

    await newEvent.save({ validateBeforeSave: true });
    newEvent = await newEvent
      .populate("personnels", "_id name")
      .populate("pointSystem", "_id name")
      .execPopulate();

    // await Promise.all(
    //   pPoints.map(point => {
    //     point.points = point.points + pointsAllocation;
    //     return point.save();
    //   })
    // );
    return newEvent;
  }

  static async delete(eventId) {
    let event = await Event.findById(eventId).exec();
    if (!event) {
      return EventRepository.errors.INVALID_EVENT_ID;
    }
    event = await event.remove();
    return event;
  }

  static async revertAndDelete(eventId) {
    let event = await Event.findById(eventId).exec();
    if (!event) {
      return EventRepository.errors.INVALID_EVENT_ID;
    }
    await Promise.all([
      PersonnelPoints.updateMany(
        {
          personId: { $in: event.personnels },
          pointSystem: event.pointSystem
        },
        {
          $inc: { points: -event.pointsAllocation }
        }
      ).exec(),
      Person.updateMany(
        {
          _id: { $in: event.personnels },
          eventsDate: event.date
        },
        {
          $pull: { eventsDate: event.date }
        }
      ).exec()
    ]);

    // await Promise.all(
    //   pPoints.map(point => {
    //     point.points = point.points - event.pointsAllocation;
    //     return point.save();
    //   })
    // );

    event = await event.remove();
    return event;
  }

  static async changePersonnels(eventId, newPersonnels) {
    let event = await Event.findById(eventId)
      .select("-createdAt -updatedAt -__v")
      .exec();
    if (!event) {
      return EventRepository.errors.INVALID_EVENT_ID;
    }

    const persons = await Person.find({ _id: { $in: newPersonnels } });
    if (persons.length !== newPersonnels.length) {
      return EventRepository.errors.CONTAINS_INVALID_PERSON_ID;
    }
    /**
     * Revert all old personnels to default state
     */

    await Promise.all([
      PersonnelPoints.updateMany(
        {
          personId: { $in: event.personnels },
          pointSystem: event.pointSystem
        },
        {
          $inc: { points: -event.pointsAllocation }
        }
      ).exec(),
      Person.updateMany(
        {
          _id: { $in: event.personnels },
          eventsDate: event.date
        },
        {
          $pull: { eventsDate: event.date }
        }
      ).exec()
    ]);
    await Promise.all([
      PersonnelPoints.updateMany(
        {
          personId: { $in: newPersonnels },
          pointSystem: event.pointSystem
        },
        {
          $inc: { points: event.pointsAllocation }
        }
      ).exec(),
      Person.updateMany(
        {
          _id: { $in: newPersonnels }
        },
        { $addToSet: { eventsDate: event.date } }
      ).exec()
    ]);
    event.personnels = newPersonnels;
    event = await event.save({ validateBeforeSave: true });
    event = await event
      .populate("personnels", "_id name")
      .populate("pointSystem", "_id name")
      .execPopulate();
    return event;
  }
}

EventRepository.errors = {
  INVALID_POINT_SYSTEM_OR_PERSON_ID: "INVALID_POINT_SYSTEM_OR_PERSON_ID",
  INVALID_EVENT_ID: "INVALID_EVENT_ID",
  CONTAINS_INVALID_PERSON_ID: "CONTAINS_INVALID_PERSON_ID"
};

module.exports = EventRepository;
