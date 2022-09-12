const { GraphQLNonNull, GraphQLString } = require("graphql");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
const Batch = require("../../models/Batch");
const {
  BatchType,
  BatchOptionalSchema,
  BatchSchema,
} = require("../Schemas/BatchSchema");
require("dotenv").config();

const batchMutation = {
  addBatch: {
    type: BatchType,
    description: "Add New Batch",
    args: BatchOptionalSchema,

    resolve: async (parent, args) => {
      const batchAdd = await new Batch(args).save();
      if (cacheManagement.has("batchAll")) cacheManagement.del("batchAll");
      return batchAdd;
    },
  },
  editBatch: {
    type: BatchType,
    description: "Edit Batch",
    args: BatchOptionalSchema,
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      const data = await Batch.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("batchAll")) cacheManagement.del("batchAll");
      return data;
    },
  },
  deleteBatch: {
    type: BatchType,
    description: "Delete Batch",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("batchAll")) cacheManagement.del("batchAll");
      return await Batch.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { batchMutation };
