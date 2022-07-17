const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const SemesterMarks = require("../../models/SemesterMarks");
const { SemesterMarksType } = require("../Schemas/SemesterMarksSchema");

const semesterMarksQuery = {
  semesterMarks: {
    type: SemesterMarksType,
    description: "single semesterMarks ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        const data = cacheManagement.get(args._id);
        if (data) return JSON.parse(data);
      } else {
        const data = await SemesterMarks.findById(args._id);
        cacheManagement.set(args._id, JSON.stringify(data));
        return data;
      }
    },
  },
  semesterMarkss: {
    type: GraphQLList(SemesterMarksType),
    description: "list of semesterMarks",
    resolve: async () => {
      if (cacheManagement.has("semesterMarksAll")) {
        const data = cacheManagement.get("semesterMarksAll");
        console.log("cache from");
        if (data) return JSON.parse(data);
      }
      const datas = await SemesterMarks.find();
      saveMultiple(datas, "semesterMarksAll", false);
      return datas;
    },
  },
};

module.exports = { semesterMarksQuery };
