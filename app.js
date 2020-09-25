require("dotenv").config();
require("./config/mongo");

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const morgan = require("morgan"); // morgan est un logger
const app = express();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mail_host = "smtp.mailtrap.io";
const mail_host_port = 2525;
const mail_user_address = "e64ddf3250-580071@inbox.mailtrap.io";
const mail_user_name = "3c64b94a1d9d3f";
const mail_user_pass = "b2062797f9556d";




// POST SETUP
app.use(express.json());

// CORS SETUP
app.use(cors(["http://localhost:3000", "http://localhost:8080"])); // obligatoire pour accepter les appels ajax entrant

// API CALL LOGGIN
app.use(morgan("dev"));

//CRON SETUP

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: mail_host,
  port: mail_host_port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: mail_user_name, // generated ethereal user
    pass: mail_user_pass, // generated ethereal password
  },
});
cron.schedule('0 0 * * 1 2 3 4 5 6 7', function () {
  console.log('---------------------');
  console.log('Running Cron Job');

  let messageOptions = {
    from: mail_user_address,
    to: 'ailine.soto@outlook.fr',
    subject: 'Rappel Email',
    text: 'Hi there. This email was automatically sent by us.'
  };

  transporter.sendMail(messageOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log('Email successfully sent!', info);
    }
  });
});

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