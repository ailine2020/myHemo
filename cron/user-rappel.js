const cron = require('node-cron');
const UserModel = require("../models/User");
const RappelModel = require("../models/Rappel");
const nodemailer = require('nodemailer');

const mail_host = "smtp.mailtrap.io";
const mail_host_port = 2525;
const mail_user_address = "e64ddf3250-580071@inbox.mailtrap.io";
const mail_user_name = "3c64b94a1d9d3f";
const mail_user_pass = "b2062797f9556d";

const equivalences = {
    // "everyday": "1 0 1-31 1-12 * ",
    "everyday": '* * * * * *',
    "every 2 days": " 1 0 1/2 1-12 *",
    "everyday 3 days": " 1 0 1/3 1-12 * ",
    "everyday 4 days": " 1 0 1/4 1-12 * ",
    "everyday 5 days": " 1 0 1/5 1-12 * ",
    "everyday 6 days": " 1 0 1/6 1-12 * ",
    "everyday 7 days": " 1 0 1/7 1-12 * ",
    "everyday 14 days": " 1 0 1/14 1-12 * ",
};

// var CronJob = require('cron').CronJob;
// var job = new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');
// job.start();

const convertPeriodicityToCRONTime = (periodicity) => equivalences[periodicity];
//  return ce format en fonction de la period passée ?

// function userRappel(rappel) {
//     // const user = await UserModel.findById(rappel.author);
//     // const cronTime = convertPeriodicityToCRONTime(rappel.periodicity);
//   var job = new CronJob('* * * * * *', () => {
//         console.log('---------------------');
//         console.log('Running Cron Job');
//         // sendMail(user, rappel);
//         // updateLastRappel(rappel._id);
//     }); job.start();
// }

async function userRappel() {
    var rappels = await RappelModel.find();
    rappels.forEach(rappel => {
        const cronTime = convertPeriodicityToCRONTime(rappel.periodicity);
        try {
            cron.schedule(cronTime, (user, rappel) => {
                sendMail(user, rappel);
            });
        } catch (err) {
            console.error(err);
        }
    });
}

userRappel();

function updateLastRappel(idRappel) {
    RappelModel.findByIdAndUpdate(idRappel, {
        date_last_rappel: Date.now()
    })
}

function sendMail(user, rappel) {
    // envoyer mail à user.email pour rappel.name etc...
    // let transporter = nodemailer.createTransport({
    //     host: mail_host,
    //     port: mail_host_port,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: mail_user_name, // generated ethereal user
    //         pass: mail_user_pass, // generated ethereal password
    //     },
    // });
    // var user = UserModel.find();
    // var rappel = RappelModel.find();
    // let messageRappel = {
    //     from: mail_user_address,
    //     to: `${user.email}`,
    //     subject: `Rappel ${rappel.title}`,
    //     text: `Bonjour ${user.name}, ceci est un rappel pour votre ${rappel.title} du ${rappel.date_last_rappel} Merci et à bientôt!`
    // console.log('Email successfully sent!1');

    // };
    // transporter.sendMail(messageRappel, function (error) {
    //         if (error) {
    //         throw error;
    //     } else {
    //         console.log('Email successfully sent!2');
    //     }
    // });
}

module.exports = {
    userRappel
};