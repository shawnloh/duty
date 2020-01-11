const moment = require("moment-timezone");

const getAllDates = (startDate, endDate) => {
  const dates = [startDate];
  const currDate = moment(startDate, "DD-MM-YYYY").startOf("day");
  const lastDate = moment(endDate, "DD-MM-YYYY").startOf("day");

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    dates.push(currDate.clone().format("DD-MM-YYYY"));
  }

  dates.push(endDate);
  return dates;
};

module.exports = {
  getAllDates
};
