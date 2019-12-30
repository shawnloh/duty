const Promise = require('bluebird');
const _ = require('lodash');
const Person = require('../models/person');
const moment = require('moment-timezone');
const Point = require('../models/point');
const PersonnelPoint = require('../models/personnelPoint');
const PersonnelStatus = require('../models/personnelStatus');
const Rank = require('../models/rank');
const Platoon = require('../models/platoon');
const dates = require('../utils/dates');
const StatusEngine = require('../engines/status');

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

  static async removeBlockout(personId, dateToRemove) {
    let person = await this.findById(personId);
    if (!person) {
      return PersonRepository.errors.NO_SUCH_PERSON;
    }
    if (person.blockOutDates.indexOf(dateToRemove) < 0) {
      return PersonRepository.errors.NOT_MODIFIED;
    }
    person.blockOutDates.pull(dateToRemove);
    person = await person.save();
    return person;
  }
}

class PersonGenerator {
  static isPioneer(rank) {
    switch (rank) {
      case 'REC':
      case 'PTE':
      case 'LCP':
      case 'CPL':
      case 'CFC':
        return true;
      default:
        return false;
    }
  }
  static isWS(rank) {
    switch (rank) {
      case '3SG':
      case '2SG':
      case '1SG':
      case 'SSG':
      case 'MSG':
        return true;
      default:
        return false;
    }
  }
  static isOfficer(rank) {
    switch (rank) {
      case '2LT':
      case '1LT':
      case 'CPT':
        return true;
      default:
        return false;
    }
  }

  static async generate({
    date, platoons, ranks, statusNotAllowed = [],
    onlyStatus=false, pointSystemId, pQty, wsQty, oQty}) {
    let persons = await PersonGenerator.find(
        date,
        platoons,
        ranks,
        pointSystemId,
        statusNotAllowed,
        onlyStatus);

    let {pioneers, ws, officers} = this.filterByRank(persons);

    pioneers = this.generateByPoints(pioneers, pQty);
    ws = this.generateByPoints(ws, wsQty);
    officers = this.generateByPoints(officers, oQty);

    persons = [].concat(pioneers).concat(ws).concat(officers);
    return persons;
  }

  static async find(
      date,
      platoons,
      ranks,
      pointSystemId,
      statusNotAllowed,
      onlyStatus,
  ) {
    await StatusEngine.purgeExpired();
    const dayBeforeEvent = moment(date, 'DD-MM-YYYY', true)
        .subtract(1, 'd')
        .format('DD-MM-YYYY');
    const aggregations = [
      {
        $match: {
          blockOutDates: {
            $ne: date,
          },
          platoon: {
            $in: platoons,
          },
          rank: {
            $in: ranks,
          },
          lastEventDate: {
            $ne: dayBeforeEvent,
          },
        },
      },
      {
        $lookup: {
          from: PersonnelStatus.collection.name,
          localField: 'statuses',
          foreignField: '_id',
          as: 'statuses',
        },
      },
      {
        $lookup: {
          from: PersonnelPoint.collection.name,
          localField: 'points',
          foreignField: '_id',
          as: 'points',
        },
      },
      {
        $unwind: {
          path: '$points',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'points.pointSystem': {
            $eq: pointSystemId,
          },
        },
      },
      {
        $lookup: {
          from: Rank.collection.name,
          localField: 'rank',
          foreignField: '_id',
          as: 'rank',
        },
      },
      {
        $lookup: {
          from: Platoon.collection.name,
          localField: 'platoon',
          foreignField: '_id',
          as: 'platoon',
        },
      },
      {
        $unwind: {
          path: '$rank',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$platoon',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: Point.collection.name,
          localField: 'points.pointSystem',
          foreignField: '_id',
          as: 'points.pointSystem',
        },
      },
      {
        $unwind: {
          path: '$points.pointSystem',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    if (statusNotAllowed.length > 0 && !onlyStatus) {
      aggregations.push({
        $match: {
          $and: [
            {
              $or: [
                {statuses: []},
                {statuses: {$exists: false}},
                {
                  $and: [
                    {statuses: {$exists: true}},
                    {'statuses.statusId': {$nin: statusNotAllowed}},
                    {'statuses.expired': {$eq: false}},
                  ],
                },
              ],
            },
          ],
        },
      });
    } else if (statusNotAllowed.length === 0 && onlyStatus) {
      aggregations.push({
        $match: {
          'statuses.expired': false,
        },
      });
    }
    aggregations.push({
      $group: {
        _id: '$_id',
        name: {$first: '$name'},
        rank: {$first: '$rank.name'},
        platoon: {$first: '$platoon.name'},
        point: {
          $first: {
            _id: '$points._id',
            points: '$points.points',
            pointSystem: '$points.pointSystem',
          },
        },
        statuses: {$first: '$statuses'},
        blockOutDates: {$first: '$blockOutDates'},
      },
    }, {$sort: {'point.points': 1}}, {
      $project: {
        name: 1,
        rank: 1,
        platoon: 1,
        point: {
          _id: '$point._id',
          pointSystemId: '$point.pointSystem._id',
          name: '$point.pointSystem.name',
          points: '$point.points',
        },
        statuses: {
          $map: {
            input: '$statuses',
            as: 'status',
            in: {
              _id: '$$status._id',
              statusId: '$$status.statusId',
              startDate: '$$status.startDate',
              endDate: '$$status.endDate',
              expired: '$$status.expired',
            },
          },
        },
        blockOutDates: 1,
      },
    });
    const persons = await Person.aggregate(aggregations).exec();
    return persons;
  }

  static filterByRank(personnels) {
    const pioneers = personnels.filter((person) => this.isPioneer(person.rank));
    const ws = personnels.filter((person) => this.isWS(person.rank));
    const officers = personnels.filter((person) => this.isOfficer(person.rank));

    return {
      pioneers,
      ws,
      officers,
    };
  }

  static generateByPoints(personnels=[], qty=0) {
    let requiredQty = qty;
    let choosenPersonnels = [];
    const persons = _.groupBy(personnels, (person) => person.point.points);
    const sortedKeys = Object.keys(persons).sort((a, b) => a-b);
    // console.log(persons);

    for (let index = 0; index < sortedKeys.length; index++) {
      const key = sortedKeys[index];
      const personsArray = persons[key];

      // if the first array in persons (which is the lowest point sorted by key)
      // it means all persons[key] will be apply and return
      if (personsArray.length === requiredQty) {
        choosenPersonnels = choosenPersonnels.concat(personsArray);
        break;
      }

      /**
       * if it is more than requiredQty,
       * loop requiredQty and math.random to pick an person
       * once choosen, update the person point and push it
       *  to relevant array in persons
       */

      if (personsArray.length > requiredQty) {
        for (let index = 0; index < requiredQty; index++) {
          const index = _.random(personsArray.length-1);
          const choosen = personsArray[index];
          personsArray.splice(index, 1);
          choosenPersonnels.push(choosen);
        }
        break;
      }

      if (personsArray.length < requiredQty) {
        requiredQty = requiredQty - choosenPersonnels.length;
        choosenPersonnels = choosenPersonnels.concat(personsArray);
      }
    }

    return choosenPersonnels;
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
module.exports.Generator = PersonGenerator;
