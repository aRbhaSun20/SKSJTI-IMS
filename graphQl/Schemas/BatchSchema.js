const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");

const BatchSchema = {
  _id: {
    type: GraphQLString,
    description: "Batch Id",
  },
  schemeYear: {
    type: GraphQLNonNull(GraphQLString),
    description: "Scheme Year",
  },
  batchName: {
    type: GraphQLNonNull(GraphQLString),
    description: "Batch Name",
  },
  details: {
    type: GraphQLString,
    description: "Batch Details",
  },
};

const BatchOptionalSchema = {
  _id: {
    type: GraphQLString,
    description: "Batch Id",
  },
  schemeYear: {
    type: GraphQLString,
    description: "Scheme Year",
  },
  batchName: {
    type: GraphQLString,
    description: "Batch Name",
  },
  details: {
    type: GraphQLString,
    description: "Batch Details",
  },
};

const BatchType = new GraphQLObjectType({
  name: "Batch",
  description: "Batch",
  fields: () => ({ ...BatchSchema }),
});

module.exports = {
  BatchSchema,
  BatchType,
  BatchOptionalSchema,
};
