const Promise =require('bluebird');
const PersonnelStatus = require('../models/personnelStatus');

const purgeExpired = async () => {
  const pStatuses = await PersonnelStatus.find({expired: true}).exec();
  await Promise.all(pStatuses.map((doc) => {
    return doc.remove();
  }));
};

module.exports = {
  purgeExpired,
};
