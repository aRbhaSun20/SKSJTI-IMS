const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
    type: Number,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: {
      residential: String,
      permanent: String,
    },
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
  address: {
    type: {
      permanent: String,
      resident: String,
    },
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
    type: mongoose.Types.ObjectId,
    ref: "department",
  },
  doj: {
    type: String,
    required: true,
  },
  semesterMarksId: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: "SemesterMarks",
  },
  batchId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Batch",
  },
  internalMarksId: {
    type: [mongoose.Types.ObjectId],
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
  currentYear: {
    type: String,
    default: () => DateTime.now().year.toFixed(),
  },
});

module.exports = new mongoose.model("Student", StudentSchema);
