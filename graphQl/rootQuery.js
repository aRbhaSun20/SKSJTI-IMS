const { GraphQLObjectType } = require("graphql");
const { batchQuery } = require("./Queries/batchQuery");
const { departmentQuery } = require("./Queries/departmentQuery");
const { facultyQuery } = require("./Queries/facultyQuery");
const { internalsQuery } = require("./Queries/internalQuery");
const { semesterMarksQuery } = require("./Queries/semesterMarksQuery");
const { studentQuery } = require("./Queries/studentQuery");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    ...facultyQuery,
    ...studentQuery,
    ...batchQuery,
    ...departmentQuery,
    ...internalsQuery,
    ...semesterMarksQuery,
  }),
});

module.exports = RootQueryType;
