const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const SemesterMarksSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  batchId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:"Batch"
  },
  subject: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    default: 0,
  },
  dateOfSemester: {
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

module.exports = new mongoose.model("SemesterMarks", SemesterMarksSchema);
