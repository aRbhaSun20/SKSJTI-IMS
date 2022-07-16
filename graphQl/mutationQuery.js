const { GraphQLObjectType } = require("graphql");
const { facultyMutation } = require("./Mutation/facultyMutation");
require("dotenv").config();

const RootMutationType = new GraphQLObjectType({
  name: "Mutations",
  description: "Root Mutations",
  fields: () => ({
    ...facultyMutation,
  }),
});

module.exports = RootMutationType;
