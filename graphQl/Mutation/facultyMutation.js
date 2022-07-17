const { GraphQLNonNull, GraphQLString } = require("graphql");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
const Faculty = require("../../models/Faculty");
const {
  FacultyType,
  FacultyOptionalSchema,
  FacultySchema,
} = require("../Schemas/FacultySchema");
require("dotenv").config();

const facultyMutation = {
  addFaculty: {
    type: FacultyType,
    description: "Add New Faculty",
    args: FacultyOptionalSchema,

    resolve: async (parent, args) => {
      const facultyAdd = await new Faculty(args).save();
      if (cacheManagement.has("facultyAll")) cacheManagement.del("facultyAll");
      cacheManagement.set(setKey(facultyAdd._id), facultyAdd);
      return facultyAdd;
    },
  },
  editFaculty: {
    type: FacultyType,
    description: "Edit Faculty",
    args: FacultyOptionalSchema,
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      const data = await Faculty.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("facultyAll")) cacheManagement.del("facultyAll");
      cacheManagement.set(setKey(data._id), data);
      return data;
    },
  },
  deleteFaculty: {
    type: FacultyType,
    description: "Delete Faculty",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("facultyAll")) cacheManagement.del("facultyAll");
      return await Faculty.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { facultyMutation };
