const account = require('../../models/account');

module.exports.seed = async () => {
  const seedAccounts = [
    {
      username: 'user',
      password: '123',
      role: 'user',
    },
    {
      username: 'admin',
      password: '123',
      role: 'admin',
    },
  ];
  console.log('Seeding accounts..');
  return await account.insertMany(seedAccounts);
};

module.exports.clear = async () => {
  console.log('Clearing accounts..');
  return await account.deleteMany({});
};
