
const moment = require('moment-timezone');

/**
 * statusBeforeToday compares passed in date with today date
 * if date passed in is before today, it will return true, else, false.
 * @param {Date} endDate must be a format for DDMMYYYY
 * @return {Boolean} true/false
 */
module.exports.statusBeforeToday = (endDate) => {
  const sgDate = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  const now = moment(sgDate);

  const end = moment(moment(endDate, 'DD-MM-YYYY', true).format('YYYY-MM-DD'));
  // if status end date is before today date, it means this status has expired
  if (end.isBefore(now)) {
    return true;
  }
  return false;
};
