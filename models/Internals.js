const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const InternalsSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  batchId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Batch",
  },
  subject: {
    type: String,
    required: true,
  },
  internalNum: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    default: 0,
  },
  dateOfInternals: {
    type: Date,
    default: () => DateTime.now().toString(),
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

module.exports = new mongoose.model("Internals", InternalsSchema);
