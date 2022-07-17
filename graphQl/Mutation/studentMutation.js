const { GraphQLNonNull, GraphQLString } = require("graphql");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
const Student = require("../../models/Students");
const {
  StudentType,
  StudentOptionalSchema,
  StudentSchema,
} = require("../Schemas/StudentSchema");
require("dotenv").config();

const studentMutation = {
  addStudent: {
    type: StudentType,
    description: "Add New Student",
    args: StudentOptionalSchema,

    resolve: async (parent, args) => {
      const studentAdd = await new Student(args).save();
      if (cacheManagement.has("studentAll")) cacheManagement.del("studentAll");
      cacheManagement.set(setKey(studentAdd._id), studentAdd);
      return studentAdd;
    },
  },
  editStudent: {
    type: StudentType,
    description: "Edit Student",
    args: StudentOptionalSchema,
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      const data = await Student.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("studentAll")) cacheManagement.del("studentAll");
      cacheManagement.set(setKey(data._id), data);
      return data;
    },
  },
  deleteStudent: {
    type: StudentType,
    description: "Delete Student",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("studentAll")) cacheManagement.del("studentAll");
      return await Student.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { studentMutation };
