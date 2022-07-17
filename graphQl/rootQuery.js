const { GraphQLObjectType } = require("graphql");
const { batchQuery } = require("./Queries/batchQuery");
const { departmentQuery } = require("./Queries/departmentQuery");
const { facultyQuery } = require("./Queries/facultyQuery");
const { internalsQuery } = require("./Queries/internalQuery");
const { semesterMarksQuery } = require("./Queries/semesterMarksQuery");
const { studentQuery } = require("./Queries/studentQuery");
const { userQuery } = require("./Queries/userQuery");

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
    ...userQuery,
  }),
});

module.exports = RootQueryType;
