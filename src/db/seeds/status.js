const status = require('../../models/status');

module.exports.seed = async () => {
  const statuses = ['Light Duty', 'Excuse RMJ', 'Excuse Heavy Load'];
  const seedStatus = [];

  statuses.forEach((status) => {
    seedStatus.push({
      name: status,
    });
  });
  console.log('Seeding statuses..');
  return await status.insertMany(seedStatus);
};

module.exports.clear = async () => {
  console.log('Clearing statuses..');
  return await status.deleteMany({});
};
