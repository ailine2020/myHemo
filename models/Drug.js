const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now
  },
  injection:  {
    type: Schema.Types.ObjectId,
    ref: "Rappel"
  },
  quantite: Number
});

const DrugModel = mongoose.model("Drug", drugSchema);

module.exports = DrugModel;