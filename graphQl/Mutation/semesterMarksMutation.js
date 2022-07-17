const { GraphQLNonNull, GraphQLString } = require("graphql");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
const SemesterMarks = require("../../models/SemesterMarks");
const {
  SemesterMarksType,
  SemesterMarksOptionalSchema,
  SemesterMarksSchema,
} = require("../Schemas/SemesterMarksSchema");
require("dotenv").config();

const semesterMarksMutation = {
  addSemesterMarks: {
    type: SemesterMarksType,
    description: "Add New SemesterMarks",
    args: SemesterMarksOptionalSchema,

    resolve: async (parent, args) => {
      const semesterMarksAdd = await new SemesterMarks(args).save();
      if (cacheManagement.has("semesterMarksAll"))
        cacheManagement.del("semesterMarksAll");
      cacheManagement.set(setKey(semesterMarksAdd._id), semesterMarksAdd);
      return semesterMarksAdd;
    },
  },
  editSemesterMarks: {
    type: SemesterMarksType,
    description: "Edit SemesterMarks",
    args: SemesterMarksOptionalSchema,
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      const data = await SemesterMarks.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("semesterMarksAll"))
        cacheManagement.del("semesterMarksAll");
      cacheManagement.set(setKey(data._id), data);
      return data;
    },
  },
  deleteSemesterMarks: {
    type: SemesterMarksType,
    description: "Delete SemesterMarks",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("semesterMarksAll"))
        cacheManagement.del("semesterMarksAll");
      return await SemesterMarks.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { semesterMarksMutation };
