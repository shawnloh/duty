const app = require('../src/app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`guard duty app is listening on port ${port}`);
});

const gracefulShutDown = async () => {
  await mongoose.connection.close();
};

process.on('SIGTERM', gracefulShutDown);
process.on('SIGINT', gracefulShutDown);
