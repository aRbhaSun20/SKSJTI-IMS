const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");

const DepartmentSchema = {
  _id: {
    type: GraphQLString,
    description: "Department Id",
  },
  DOC: {
    type: GraphQLString,
    description: "Date of creation",
  },
  name: {
    type: GraphQLNonNull(GraphQLString),
    description: "Batch Name",
  },
  details: {
    type: GraphQLString,
    description: "Details",
  },
};

const DepartmentOptionalSchema = {
  _id: {
    type: GraphQLString,
    description: "Department Id",
  },
  DOC: {
    type: GraphQLString,
    description: "Date of creation",
  },
  name: {
    type: GraphQLString,
    description: "Batch Name",
  },
  details: {
    type: GraphQLString,
    description: "Details",
  },
};

const DepartmentType = new GraphQLObjectType({
  name: "Department",
  description: "Department",
  fields: () => ({ ...DepartmentSchema }),
});

module.exports = {
  DepartmentSchema,
  DepartmentType,
  DepartmentOptionalSchema,
};
