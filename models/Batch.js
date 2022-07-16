const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  schemeYear: {
    type: String,
    required: true,
    unique: true,
  },
  batchName: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
});

module.exports = new mongoose.model("Batch", BatchSchema);
