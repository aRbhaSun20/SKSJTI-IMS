const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Faculty = require("../../models/Faculty");

const { FacultyType } = require("../Schemas/FacultySchema");

const facultyQuery = {
  faculty: {
    type: FacultyType,
    description: "single faculty details",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        const data = cacheManagement.get(args._id);
        if (data) return JSON.parse(data);
      } else {
        const data = await Faculty.findById(args._id);
        cacheManagement.set(args._id, JSON.stringify(data));
        return data;
      }
    },
  },
  facultys: {
    type: GraphQLList(FacultyType),
    description: "list of faculty",
    resolve: async () => {
      if (cacheManagement.has("facultyAll")) {
        const data = cacheManagement.get("facultyAll");
        console.log("cache from");
        if (data) return JSON.parse(data);
      }
      const datas = await Faculty.find();
      saveMultiple(datas, "facultyAll", false);
      return datas;
    },
  },
};

module.exports = { facultyQuery };
