const { GraphQLObjectType } = require("graphql");
const { batchMutation } = require("./Mutation/batchMutation");
const { departmentMutation } = require("./Mutation/departmentMutation");
const { facultyMutation } = require("./Mutation/facultyMutation");
const { internalsMutation } = require("./Mutation/internalsMutation");
const { semesterMarksMutation } = require("./Mutation/semesterMarksMutation");
const { studentMutation } = require("./Mutation/studentMutation");
require("dotenv").config();

const RootMutationType = new GraphQLObjectType({
  name: "Mutations",
  description: "Root Mutations",
  fields: () => ({
    ...facultyMutation,
    ...studentMutation,
    ...batchMutation,
    ...departmentMutation,
    ...internalsMutation,
    ...semesterMarksMutation,
  }),
});

module.exports = RootMutationType;
