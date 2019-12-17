const rank = require('../../models/rank');

module.exports.seed = async () => {
  const ranks = ['PTE', 'LCP', 'CPL', 'CFC'];
  const seedRanks = [];

  ranks.forEach((rank) => {
    seedRanks.push({
      name: rank,
    });
  });
  console.log('Seeding ranks..');
  return await rank.insertMany(seedRanks);
};

module.exports.clear = async () => {
  console.log('Clearing ranks..');
  return await rank.deleteMany({});
};
