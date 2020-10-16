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
    "everyday": "0 0 0 ? * * *",
    // "everyday": '* * * * * *',
    "every 2 days": '0 0 1/2 * *',
    "everyday 3 days": '0 7 1/3 * *',
    "everyday 4 days": '0 7 1/4 * *',
    "everyday 5 days": '0 7 1/5 * *',
    "everyday 6 days": '0 7 1/6 * *',
    "everyday 7 days": '0 7 1/7 * *',
    "everyday 14 days": "0 7 1/14 * *",
};


const convertPeriodicityToCRONTime = (periodicity) => equivalences[periodicity];

async function userRappel() {
    var rappels = await RappelModel.find();
    rappels.forEach(rappel => {
        console.log("......", rappel);
        const cronTime = convertPeriodicityToCRONTime(rappel.periodicity);
        try {
            cron.schedule(cronTime, (user, rappel) => {
                console.log('---------------------');
                console.log('Running Cron Job');
                sendMail(user, rappel);
                // console.log('Email successfully sent!1')
                //updateLastRappel(rappel._id);
            });
        } catch (err) {
            console.error(err);
        }
    });
};

userRappel();

function updateLastRappel(idRappel) {
    RappelModel.findByIdAndUpdate(idRappel, {
        date_last_rappel: Date.now()
    })
}

async function sendMail(user, rappel) {
    const mail_host = "smtp.mailtrap.io";
    const mail_host_port = 2525;
    const mail_user_address = "e64ddf3250-580071@inbox.mailtrap.io";
    const mail_user_name = "3c64b94a1d9d3f";
    const mail_user_pass = "b2062797f9556d";
    // envoyer mail à user.email pour rappel.name etc...
    let transporter = nodemailer.createTransport({
        host: mail_host,
        port: mail_host_port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: mail_user_name, // generated ethereal user
            pass: mail_user_pass, // generated ethereal password
        },
    });
    // var user = UserModel.find();
    // var rappel = RappelModel.find();
    let messageRappel = await transporter.sendMail({
        from: mail_user_address,
        to: "ailine.soto@outlook.fr",
        subject: 'Rappel injection',
        text: "Bonjour ${user.name}, ceci est un rappel pour votre ${rappel.title} du ${rappel.date_last_rappel} Merci et à bientôt!"
        // from: mail_user_address,
        // to: `${user.email}`,
        // subject: `Rappel ${rappel.title}`,
        // text: `Bonjour ${user.name}, ceci est un rappel pour votre ${rappel.title} du ${rappel.date_last_rappel} Merci et à bientôt!`
    });
    console.log('Email successfully sent!1', messageRappel)
    transporter.sendMail(messageRappel, function (error) {
        if (error) {
            throw error;
        } else {
            console.log('Email successfully sent!2');
        }
    });
}

module.exports = {
    userRappel
};