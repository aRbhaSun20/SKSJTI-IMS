const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Internals = require("../../models/Internals");
const { InternalsType } = require("../Schemas/InternalsSchema");

const internalsQuery = {
  internals: {
    type: InternalsType,
    description: "single internals ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        const data = cacheManagement.get(args._id);
        if (data) return JSON.parse(data);
      } else {
        const data = await Internals.findById(args._id);
        cacheManagement.set(args._id, JSON.stringify(data));
        return data;
      }
    },
  },
  internalss: {
    type: GraphQLList(InternalsType),
    description: "list of internals",
    resolve: async () => {
      if (cacheManagement.has("internalsAll")) {
        const data = cacheManagement.get("internalsAll");
        console.log("cache from");
        if (data) return JSON.parse(data);
      }
      const datas = await Internals.find();
      saveMultiple(datas, "internalsAll", false);
      return datas;
    },
  },
};

module.exports = { internalsQuery };
