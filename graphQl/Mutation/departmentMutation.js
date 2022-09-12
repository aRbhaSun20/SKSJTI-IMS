const { GraphQLNonNull, GraphQLString } = require("graphql");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
const Department = require("../../models/Department");
const {
  DepartmentType,
  DepartmentOptionalSchema,
  DepartmentSchema,
} = require("../Schemas/DepartmentSchema");
require("dotenv").config();

const departmentMutation = {
  addDepartment: {
    type: DepartmentType,
    description: "Add New Department",
    args: DepartmentOptionalSchema,

    resolve: async (parent, args) => {
      const departmentAdd = await new Department(args).save();
      if (cacheManagement.has("departmentAll"))
        cacheManagement.del("departmentAll");
      return departmentAdd;
    },
  },
  editDepartment: {
    type: DepartmentType,
    description: "Edit Department",
    args: DepartmentOptionalSchema,
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      const data = await Department.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("departmentAll"))
        cacheManagement.del("departmentAll");

      return data;
    },
  },
  deleteDepartment: {
    type: DepartmentType,
    description: "Delete Department",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("departmentAll"))
        cacheManagement.del("departmentAll");
      return await Department.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { departmentMutation };
