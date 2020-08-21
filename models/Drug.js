const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  name: String,
  date: Date,
  // injection: Injection_id,
  quantite: Number
});

const DrugModel = mongoose.model("Drug", drugSchema);

module.exports = DrugModel;
