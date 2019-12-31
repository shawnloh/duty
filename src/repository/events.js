const Promise = require('bluebird');
const moment = require('moment-timezone');
const Event = require('../models/event');
const PersonnelPoints = require('../models/personnelPoint');
const Point = require('../models/point');

class EventRepository {
  static async findAll() {
    const events = await Event
        .find({})
        .populate('pointSystem', '_id name')
        .populate('personnels', '_id name')
        .select('-createdAt -updatedAt -__v')
        .lean()
        .exec();
    return events;
  }

  static async create(
      name=null, date, pointSystemId, pointsAllocation, personnels=[],
  ) {
    if (!name) {
      const point = await Point.findById(pointSystemId).exec();
      const today = moment().tz('Asia/Singapore').format('DD-MM-YYYY');
      name = `${today}-${point.name}`;
    }
    const pPoints = await PersonnelPoints.find(
        {personId: {$in: personnels}, pointSystem: pointSystemId},
    );

    if (pPoints.length !== personnels.length) {
      return EventRepository.errors.INVALID_POINT_SYSTEM_OR_PERSON_ID;
    }

    let newEvent = new Event({
      name,
      date,
      pointSystem: pointSystemId,
      pointsAllocation,
      personnels,
    });
    await newEvent.save({validateBeforeSave: true});
    newEvent = await newEvent.populate('personnels', '_id name').execPopulate();

    await Promise.all(pPoints.map((point) => {
      point.points = point.points + pointsAllocation;
      return point.save();
    }));
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
    const pPoints = await PersonnelPoints.find(
        {personId: {$in: event.personnels},
          pointSystem: event.pointSystem},
    ).exec();

    await Promise.all(pPoints.map((point) => {
      point.points = point.points - event.pointsAllocation;
      return point.save();
    }));

    event = await event.remove();
    return event;
  }
}

EventRepository.errors = {
  INVALID_POINT_SYSTEM_OR_PERSON_ID: 'INVALID_POINT_SYSTEM_OR_PERSON_ID',
  INVALID_EVENT_ID: 'INVALID_EVENT_ID',
};

module.exports = EventRepository;
