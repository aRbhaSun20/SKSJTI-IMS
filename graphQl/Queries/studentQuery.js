const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Students = require("../../models/Students");
const { StudentType } = require("../Schemas/StudentSchema");

const studentQuery = {
  student: {
    type: StudentType,
    description: "single student ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        const data = cacheManagement.get(args._id);
        if (data) return JSON.parse(data);
      } else {
        const data = await Students.findById(args._id);
        cacheManagement.set(args._id, JSON.stringify(data));
        return data;
      }
    },
  },
  students: {
    type: GraphQLList(StudentType),
    description: "list of student",
    resolve: async () => {
      if (cacheManagement.has("studentAll")) {
        const data = cacheManagement.get("studentAll");
        console.log("cache from");
        if (data) return JSON.parse(data);
      }
      const datas = await Students.find();
      saveMultiple(datas, "studentAll", false);
      return datas;
    },
  },
};

module.exports = { studentQuery };
