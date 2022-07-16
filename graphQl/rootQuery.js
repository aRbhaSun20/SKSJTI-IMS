const { GraphQLObjectType } = require("graphql");
const { facultyQuery } = require("./Queries/facultyQuery");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    ...facultyQuery,
  }),
});

module.exports = RootQueryType;
