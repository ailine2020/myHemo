const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  date: {
    type: Date,
    default: Date.now
  },
  // injection: Injection_id,
  quantite: Number
});

const DrugModel = mongoose.model("Drug", drugSchema);

module.exports = DrugModel;