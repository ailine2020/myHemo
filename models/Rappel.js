const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rappelSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date_created: Date,
  date_last_rappel: {
    type: Date,
    default: null
  },
  periodicity: {
    type: String,
    enum: ["everyday", "every 2 days", "every 3 days", "every 4 days", "every 5 days", "every 6 days", "every 7 days", "every 14 days"]
  },
  // injection_ok: Boolean,
  title: String,
});

const RappelModel = mongoose.model("Rappel", rappelSchema);

module.exports = RappelModel;