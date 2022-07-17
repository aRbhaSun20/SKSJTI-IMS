const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const SemesterMarksSchema = {
  _id: {
    type: GraphQLString,
    description: "SemesterMarks Id",
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
    description: "Marks of SemesterMarks",
  },
  dateOfSemesterMarks: {
    type: GraphQLString,
    description: "date of SemesterMarks",
  },
  details: {
    type: GraphQLString,
    description: "Details of internal",
  },
};

const SemesterMarksOptionalSchema = {
  _id: {
    type: GraphQLString,
    description: "SemesterMarks Id",
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
    description: "Marks of SemesterMarks",
  },
  dateOfSemesterMarks: {
    type: GraphQLString,
    description: "date of SemesterMarks",
  },
  details: {
    type: GraphQLString,
    description: "Details of internal",
  },
};

const SemesterMarksType = new GraphQLObjectType({
  name: "SemesterMarks",
  description: "SemesterMarks",
  fields: () => ({ ...SemesterMarksSchema }),
});

module.exports = {
  SemesterMarksSchema,
  SemesterMarksType,
  SemesterMarksOptionalSchema,
};