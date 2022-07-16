const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  phoneRes: {
    type: String,
    required: true,
  },
  phonePer: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  addressPermanent: {
    type: String,
    default: "",
    required: true,
  },
  addressTemp: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    default: "BTECH",
  },
  course: {
    type: String,
    ref: "department",
  },
  doj: {
    type: String,
    required: true,
  },
  semesterCurrentId: {
    type: Number,
    ref: 1,
  },
  semesterMarksId: {
    type: [String],
    required: true,
    ref: "SemesterMarks",
  },
  batchId: {
    type: String,
    required: true,
    ref: "Batch",
  },
  internalMarksId: {
    type: [String],
    ref: "Internals",
  },
  approval: {
    type: Boolean,
    default: false,
  },
  diploma: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
});

module.exports = new mongoose.model("Student", StudentSchema);
