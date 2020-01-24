const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");
const db = require("./db/db");

db.initDb();

const app = express();
// set up logger using morgan
app.use(morgan("combined"));
app.use(helmet());
app.use(mongoSanitize());
app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(
  session({
    name: "dutyappsid",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "LALALAVERYSECRET",
    cookie: {
      domain: "btdutyapp.herokuapp.com",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);
app.use("/api/accounts", require("./routes/accounts"));
app.use("/api/person", require("./routes/person"));
app.use("/api/events", require("./routes/events"));
app.use("/api/status", require("./routes/status"));
app.use("/api/points", require("./routes/points"));
app.use("/api/ranks", require("./routes/ranks"));
app.use("/api/platoons", require("./routes/platoons"));
app.use("/api/engines", require("./routes/engine"));
app.use("/api/", errorHandler.NOT_IMPLEMENTED);

app.use(express.static(path.join(__dirname, "..", "frontend_duty", "build")));
app.get("/*", function(req, res) {
  res.sendFile(
    path.join(__dirname, "..", "frontend_duty", "build", "index.html")
  );
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
