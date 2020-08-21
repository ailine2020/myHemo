const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rappelSchema = new Schema({
  author: String, //user_id
  calendar: Date,
  periodicity:{ type:String,
    enum : ["other","everyday", "every 2 days","every 3 days","every 4 days","every 5 days","every 6 days","every 7 days","every 8 days","every 9 days","every 10 days","every 11 days","every 12 days","every 13 days","every 14 days" ]
  },
  injection_ok : Boolean,
  drugs: String, //object_id
  date_rappel : Date,
  title: {
    type: String,
    enum: ["Rdv", "Injection","Démarche"],
  },
});

const RappelModel = mongoose.model("Rappel", rappelSchema);

module.exports = RappelModel;
