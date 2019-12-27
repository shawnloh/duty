const Promise = require('bluebird');
const Person = require('../models/person');
const Point = require('../models/point');
const PersonnelPoint = require('../models/personnelPoint');
const PersonnelStatus = require('../models/personnelStatus');
const dates = require('../utils/dates');

const addPointSystem = async (personId) => {
  try {
    const points = await Point.find({}).exec();
    await Promise.all(points.map((point) => {
      const newPersonnelPoint = {
        personId: personId,
        pointSystem: point._id,
        points: 0,
      };
      const createNewPersonnelPoint = new PersonnelPoint(newPersonnelPoint);
      return createNewPersonnelPoint.save();
    }));
    return true;
  } catch (error) {
    return false;
  }
};


class PersonRepository {
  static async findAll() {
    return await Person.find({})
        .populate({
          path: 'points',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'pointSystem',
            model: 'Point',
            select: '_id name',
          },
        })
        .populate({
          path: 'statuses',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'statusId',
            model: 'Status',
            select: '_id name',
          },
        })
        .populate('rank', '-createdAt -updatedAt -__v')
        .populate('platoon', '-createdAt -updatedAt -__v')
        .select('-__v -createdAt -updatedAt')
        .lean()
        .exec();
  }
  static async findById(id) {
    const person = await Person
        .findById(id)
        .populate({
          path: 'points',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'pointSystem',
            model: 'Point',
            select: '_id name',
          },
        })
        .populate({
          path: 'statuses',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'statusId',
            model: 'Status',
            select: '_id name',
          },
        })
        .populate('rank', '-createdAt -updatedAt -__v')
        .populate('platoon', '-createdAt -updatedAt -__v')
        .select('-__v -createdAt -updatedAt')
        .exec();
    if (!person) {
      return PersonRepository.errors.NO_SUCH_PERSON;
    }
    return person;
  }

  static async delete(id) {
    let person = await this.findById(id);
    if (person === PersonRepository.errors.NO_SUCH_PERSON) {
      return person;
    }

    [person] = await Promise.all([
      person.remove(),
      PersonnelPoint.deleteMany({personId: person._id}),
      PersonnelStatus.deleteMany({personId: person._id}),
    ]);
    return person;
  }

  static async create(newPerson) {
    let person = await new Person(newPerson).save();
    await addPointSystem(person._id);
    person = await this.findById(person._id);
    return person;
  }

  static async update(id, name=null, rank=null, platoon=null) {
    let person = await this.findById(id);

    if (person === PersonRepository.errors.NO_SUCH_PERSON) {
      return PersonRepository.errors.NO_SUCH_PERSON;
    }

    let modified = false;
    if (name && person.name !== name) {
      person.name = name;
      modified = true;
    }
    if (rank && !person.rank.equals(rank)) {
      person.rank = rank;
      modified = true;
    }
    if (platoon && !person.platoon.equals(platoon)) {
      person.platoon = platoon;
      modified = true;
    }
    if (modified) {
      await person.save();
      person = await this.findById(id);
      return person;
    }
    return null;
  }

  static async findStatus(personId, statusId) {
    const pStatus = await PersonnelStatus
        .findOne({personId, _id: statusId})
        .exec();
    if (!pStatus) {
      return PersonRepository.errors.NO_SUCH_STATUS;
    }
    return pStatus;
  }
  static async addStatus(newStatus) {
    let pStatus = new PersonnelStatus(newStatus);
    pStatus = await pStatus.save({validateBeforeSave: true});
    return pStatus;
  }

  static async deleteStatus(personId, statusId) {
    if (!personId || !statusId) {
      return PersonRepository.errors.BAD_REQUEST;
    }

    let pStatus = await this.findStatus(personId, statusId);

    if (pStatus === PersonRepository.errors.NO_SUCH_STATUS) {
      return PersonRepository.errors.NO_SUCH_STATUS;
    }
    if (!pStatus.personId.equals(person._id)) {
      return PersonRepository.errors.BAD_REQUEST;
    }

    pStatus = await pStatus.remove();
    return pStatus;
  }

  static async updateStatus(personId, statusId, newDetails) {
    if (!personId || !statusId) {
      return PersonRepository.errors.BAD_REQUEST;
    }

    let pStatus = await this.findStatus(personId, statusId);

    if (pStatus === PersonRepository.errors.NO_SUCH_STATUS) {
      return PersonRepository.errors.NO_SUCH_STATUS;
    }
    if (!pStatus.personId.equals(person._id)) {
      return PersonRepository.errors.BAD_REQUEST;
    }

    let modified = false;
    if (newDetails.startDate && newDetails.startDate !== pStatus.startDate) {
      pStatus.startDate = newDetails.startDate;
      modified = true;
    }
    if (newDetails.endDate && newDetails.endDate !== pStatus.endDate) {
      pStatus.endDate = newDetails.endDate;
      modified = true;
    }

    if (!modified) {
      return PersonRepository.errors.NOT_MODIFIED;
    }

    pStatus = await pStatus.save({validateBeforeSave: true});
    return pStatus;
  }

  static async updatePoint(personId, pPointId, newPoints) {
    let personnelPoint = await PersonnelPoint
        .findOne({personId, _id: pPointId})
        .exec();

    if (!personnelPoint) {
      return PersonRepository.errors.NO_SUCH_POINT;
    };
    if (personnelPoint.points === newPoints) {
      return PersonRepository.errors.NOT_MODIFIED;
    }
    personnelPoint.points = newPoints;
    personnelPoint = await personnelPoint.save();
    return personnelPoint;
  }

  static async addBlockout(personId, startDate, endDate=null) {
    let person = await this.findById(personId);
    if (!person) {
      return PersonRepository.errors.NO_SUCH_PERSON;
    }
    if (!endDate && person.blockOutDates.indexOf(startDate) >=0) {
      return PersonRepository.errors.NOT_MODIFIED;
    }
    let datesToAdd = [startDate];
    if (endDate) {
      datesToAdd = datesToAdd.concat(dates.getAllDates(startDate, endDate));
    }

    person = await Person.findOneAndUpdate(
        {_id: person._id},
        {$addToSet: {blockOutDates: {$each: datesToAdd}}},
        {new: true})
        .populate({
          path: 'points',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'pointSystem',
            model: 'Point',
            select: '_id name',
          },
        })
        .populate({
          path: 'statuses',
          select: '-personId -__v -createdAt -updatedAt',
          populate: {
            path: 'statusId',
            model: 'Status',
            select: '_id name',
          },
        })
        .populate('rank', '-createdAt -updatedAt -__v')
        .populate('platoon', '-createdAt')
        .exec();
    return person;
  }
}

PersonRepository.errors = {
  NO_SUCH_PERSON: 'NO SUCH PERSON',
  NO_SUCH_STATUS: 'NO SUCH STATUS',
  NO_SUCH_POINT: 'NO SUCH POINT',
  BAD_REQUEST: 'BAD REQUEST',
  NOT_MODIFIED: 'NOT_MODIFIED',
};

module.exports = PersonRepository;
