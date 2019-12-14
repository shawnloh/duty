const rank = require('../models/rank');

/**
 * Helper for queries for ranks
 */
class RankTable {
  /**
  * Returns all rank available in the database
  * @param {int} skip pagination. default: 0
  * @param {int} limit how many documents u want to limit. default: 11
  * @return {Promise.<rank[]>} Promise containing array of Rank
  */
  static findAll(skip = 0, limit = 11) {
    return rank.find({}).skip(skip).limit(limit).exec();
  }

  /**
   *
   * @param {String} id - value of _id for the unique group
   * @return {Promise.<rank>}  Promise containedrrank
   */
  static findById(id) {
    return rank.findById(id).exec();
  }

  /**
   *
   * @param {rank} newRank
   * @return {Promise.<rank>} Promise of updated rank
   */
  static create(newRank) {
    return rank.create(newRank);
  }
  /**
   * @typedef rankToUpdate
   * @type {object}
   * @property {?Group}
   * @property {?Ranks[]}
   *
   */
  /**
   *
   * @param {String} id
   * @param {rankToUpdate} rankToUpdate
   * @return {Promise.<rank>} Promise of updated rank
   */
  static update(id, rankToUpdate) {
    return rank.findByIdAndUpdate(id, rankToUpdate,
        {new: true, lean: true})
        .exec();
  }

  /**
   *
   * @param {String} id - id of the group
   * @return {Promise.<rank>} Promise of deleted rank
   */
  static delete(id) {
    return rank.findByIdAndDelete(id).exec();
  }
}

module.exports = RankTable;
