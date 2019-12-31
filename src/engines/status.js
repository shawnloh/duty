const Promise =require('bluebird');
const moment = require('moment-timezone');
const PersonnelStatus = require('../models/personnelStatus');

class StatusEngine {
  static async purge() {
    const pStatus = await PersonnelStatus.find({}).exec();
    const today = moment().tz('Asia/Singapore').format('DD-MM-YYYY');

    const removeStatus = pStatus.filter((status) => {
      const endDate = moment(status.endDate, 'DD-MM-YYYY', true);
      if (endDate.isBefore(moment(today, 'DD-MM-YYYY', true))) {
        return true;
      }
      return false;
    });

    if (removeStatus.length > 0 ) {
      return await Promise.all(removeStatus.map((status) => {
        return status.remove();
      }));
    }
    return Promise.resolve();
  }
}

const purgeExpired = async () => {
  const pStatuses = await PersonnelStatus.find({expired: true}).exec();
  await Promise.all(pStatuses.map((doc) => {
    return doc.remove();
  }));
};

module.exports = StatusEngine;
module.exports.purgeExpired = purgeExpired;

