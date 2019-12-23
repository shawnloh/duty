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
  for (let index = 0; index < seedAccounts.length; index++) {
    const accountToCreate = seedAccounts[index];
    await account.create(accountToCreate);
  }
};

module.exports.clear = async () => {
  console.log('Clearing accounts..');
  return await account.deleteMany({});
};
