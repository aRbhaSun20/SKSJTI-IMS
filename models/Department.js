const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  DOC: {
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

module.exports = new mongoose.model("department", DepartmentSchema);
