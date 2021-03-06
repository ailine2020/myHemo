require("dotenv").config();
require("./config/mongo");

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const morgan = require("morgan"); // morgan est un logger
const app = express();
// const cron = require('node-cron');
// const cronJobs = require("./cron/user-rappel");


// POST SETUP
app.use(express.json());

// CORS SETUP
app.use(cors(["http://localhost:3000", "http://localhost:8080"])); // obligatoire pour accepter les appels ajax entrant

// API CALL LOGGIN
app.use(morgan("dev"));

//CRON SETUP

// app.use(cronJobs.userRappel);

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60000
    }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

//app.get("/", (req, res) => res.send("hello :) my api is working"));

app.use("/users", require("./routes/api.users"));
app.use("/drugs", require("./routes/api.drugs"));
app.use("/rappels", require("./routes/api.rappels"));
app.use("/api/auth", require("./routes/api.auth"));
app.use("/card", require("./routes/api.card"));
app.use("/contact", require("./routes/api.contact"));


module.exports = app;