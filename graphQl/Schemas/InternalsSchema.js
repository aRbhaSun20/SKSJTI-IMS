const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const InternalsSchema = {
  _id: {
    type: GraphQLString,
    description: "Internals Id",
  },
  studentId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Student Id",
  },
  batchId: {
    type: GraphQLNonNull(GraphQLString),
    description: "Batch Id",
  },
  subject: {
    type: GraphQLString,
    description: "internal subject",
  },
  internalNum: {
    type: GraphQLInt,
    description: "internal number",
  },
  marks: {
    type: GraphQLInt,
    description: "Marks of internals",
  },
  dateOfInternals: {
    type: GraphQLString,
    description: "date of internals",
  },
  details: {
    type: GraphQLString,
    description: "Details of internal",
  },
};

const InternalsOptionalSchema = {
  _id: {
    type: GraphQLString,
    description: "Internals Id",
  },
  studentId: {
    type: GraphQLString,
    description: "Student Id",
  },
  batchId: {
    type: GraphQLString,
    description: "Batch Id",
  },
  subject: {
    type: GraphQLString,
    description: "internal subject",
  },
  internalNum: {
    type: GraphQLInt,
    description: "internal number",
  },
  marks: {
    type: GraphQLInt,
    description: "Marks of internals",
  },
  dateOfInternals: {
    type: GraphQLString,
    description: "date of internals",
  },
  details: {
    type: GraphQLString,
    description: "Details of internal",
  },
};

const InternalsType = new GraphQLObjectType({
  name: "Internals",
  description: "Internals",
  fields: () => ({ ...InternalsSchema }),
});

module.exports = {
  InternalsSchema,
  InternalsType,
  InternalsOptionalSchema,
};
