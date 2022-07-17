const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {
  cacheManagement,
  saveMultiple,
} = require("../../middlewares/CacheModule");
const Batch = require("../../models/Batch");
const { BatchType } = require("../Schemas/BatchSchema");

const batchQuery = {
  batch: {
    type: BatchType,
    description: "single batch ",
    args: {
      _id: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) {
        const data = cacheManagement.get(args._id);
        if (data) return JSON.parse(data);
      } else {
        const data = await Batch.findById(args._id);
        cacheManagement.set(args._id, JSON.stringify(data));
        return data;
      }
    },
  },
  batchs: {
    type: GraphQLList(BatchType),
    description: "list of batch",
    resolve: async () => {
      if (cacheManagement.has("batchAll")) {
        const data = cacheManagement.get("batchAll");
        console.log("cache from");
        if (data) return JSON.parse(data);
      }
      const datas = await Batch.find();
      saveMultiple(datas, "batchAll", false);
      return datas;
    },
  },
};

module.exports = { batchQuery };
