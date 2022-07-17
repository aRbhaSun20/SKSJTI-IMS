const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Department = require("../../models/Department");
const { DepartmentType } = require("../Schemas/DepartmentSchema");

const departmentQuery = {
  department: {
    type: DepartmentType,
    description: "single department ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        const data = cacheManagement.get(args._id);
        if (data) return JSON.parse(data);
      } else {
        const data = await Department.findById(args._id);
        cacheManagement.set(args._id, JSON.stringify(data));
        return data;
      }
    },
  },
  departments: {
    type: GraphQLList(DepartmentType),
    description: "list of department",
    resolve: async () => {
      if (cacheManagement.has("departmentAll")) {
        const data = cacheManagement.get("departmentAll");
        console.log("cache from");
        if (data) return JSON.parse(data);
      }
      const datas = await Department.find();
      saveMultiple(datas, "departmentAll", false);
      return datas;
    },
  },
};

module.exports = { departmentQuery };
