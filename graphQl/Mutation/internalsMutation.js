const { GraphQLNonNull, GraphQLString } = require("graphql");
const { cacheManagement, setKey } = require("../../middlewares/CacheModule");
const Internals = require("../../models/Internals");
const {
  InternalsType,
  InternalsOptionalSchema,
  InternalsSchema,
} = require("../Schemas/InternalsSchema");
require("dotenv").config();

const internalsMutation = {
  addInternals: {
    type: InternalsType,
    description: "Add New Internals",
    args: InternalsOptionalSchema,

    resolve: async (parent, args) => {
      const internalsAdd = await new Internals(args).save();
      if (cacheManagement.has("internalsAll")) cacheManagement.del("internalsAll");
      cacheManagement.set(setKey(internalsAdd._id), internalsAdd);
      return internalsAdd;
    },
  },
  editInternals: {
    type: InternalsType,
    description: "Edit Internals",
    args: InternalsOptionalSchema,
    resolve: async (parent, args) => {
      const { _id, ...remaining } = args;
      const data = await Internals.findOneAndUpdate(
        { _id },
        { $set: { ...remaining } },
        { new: true }
      );
      if (cacheManagement.has("internalsAll")) cacheManagement.del("internalsAll");
      cacheManagement.set(setKey(data._id), data);
      return data;
    },
  },
  deleteInternals: {
    type: InternalsType,
    description: "Delete Internals",
    args: {
      _id: {
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      if (cacheManagement.has(args._id)) cacheManagement.del(args._id);
      if (cacheManagement.has("internalsAll")) cacheManagement.del("internalsAll");
      return await Internals.findOneAndRemove({ _id: args._id });
    },
  },
};

module.exports = { internalsMutation };
