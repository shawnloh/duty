const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
require("./db/db");

const app = express();
// set up logger using morgan
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(
  session({
    name: "dutyappsid",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "LALALAVERYSECRET",
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use("/api/accounts", require("./routes/accounts"));
app.use("/api/person", require("./routes/person"));
app.use("/api/events", require("./routes/events"));
app.use("/api/status", require("./routes/status"));
app.use("/api/points", require("./routes/points"));
app.use("/api/ranks", require("./routes/ranks"));
app.use("/api/platoons", require("./routes/platoons"));
app.use("/api/engines", require("./routes/engine"));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
