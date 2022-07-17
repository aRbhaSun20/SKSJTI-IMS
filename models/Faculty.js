const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  kgId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    default: "",
  },
  panCard: {
    type: String,
    default: "",
  },
  address: {
    type: {
      permanent: String,
      resident: String,
    },
    required: true,
  },
  phone: {
    type: {
      residential: String,
      permanent: String,
    },
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  department: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "department",
  },
  course: {
    type: mongoose.Types.ObjectId,
    default: "",
    ref: "department",
  },
  designation: {
    type: String,
    required: true,
  },
  appointType: {
    type: String,
    default: "",
  },
  firstYear: {
    type: Boolean,
    default: false,
  },
  DOJ: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
});

module.exports = new mongoose.model("Faculty", FacultySchema);
