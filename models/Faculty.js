const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  kgId: {
    type: String,
    required: true,
    unique: true,
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
  addressPermanent: {
    type: String,
    required: true,
  },
  addressResident: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    default: "",
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
    type: String,
    default: "",
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
