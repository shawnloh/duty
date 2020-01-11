module.exports = {
  development: {
    url: "mongodb://localhost:27017/duty"
  },
  test: {
    url: "mongodb://localhost:27017/duty_test"
  },
  production: {
    url: process.env.DATABASE_URL
  }
};
