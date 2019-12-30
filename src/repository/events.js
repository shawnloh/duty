const Event = require('../models/event');

class EventRepository {
  static async findAll() {
    const events = await Event
        .find({})
        .populate('pointType', '_id name')
        .populate('statusNotAllowed', '_id name')
        .populate('platoon', '_id name')
        .populate('rank', '_id name')
        .populate('personnels', '_id name')
        .select('-createdAt -updatedAt')
        .lean()
        .exec();
    return events;
  }
}

module.exports = EventRepository;
