const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const { cacheManagement } = require("../../middlewares/CacheModule");
const { AddressType, AddressInputType } = require("./AddressSchema");

const FacultySchema = {
  _id: {
    type: GraphQLString,
  },
  kgId: {
    type: GraphQLNonNull(GraphQLString),
    description: "kgId",
  },
  name: {
    type: GraphQLNonNull(GraphQLString),
    description: "name",
  },
  title: {
    type: GraphQLNonNull(GraphQLString),
    description: "title",
  },
  gender: {
    type: GraphQLNonNull(GraphQLString),
    description: "gender",
  },
  dob: {
    type: GraphQLNonNull(GraphQLString),
    description: "dob",
  },
  panCard: { description: "pan card", type: GraphQLString },
  address: {
    type: AddressType,
    description: "address",
  },
  mobile: {
    type: GraphQLString,
    description: "mobile",
  },
  email: {
    type: GraphQLString,
    description: "email",
  },
  department: {
    type: GraphQLNonNull(GraphQLString),
    description: "department",
  },
  course: {
    type: GraphQLNonNull(GraphQLString),
    description: "course",
  },
  designation: {
    type: GraphQLNonNull(GraphQLString),
    description: "designation",
  },
  appointType: {
    type: GraphQLString,
    description: "appoint type",
  },
  firstYear: {
    type: GraphQLString,
    description: "gonna teach first year ",
  },
  DOJ: {
    type: GraphQLNonNull(GraphQLString),
    description: "date of joining",
  },
};

const FacultyOptionalSchema = {
  _id: {
    type: GraphQLString,
  },
  kgId: {
    type: GraphQLString,
    description: "kgId",
  },
  name: {
    type: GraphQLString,
    description: "name",
  },
  title: {
    type: GraphQLString,
    description: "title",
  },
  gender: {
    type: GraphQLString,
    description: "gender",
  },
  dob: {
    type: GraphQLString,
    description: "dob",
  },
  panCard: { description: "pan card", type: GraphQLString },
  address: {
    type: AddressInputType,
    description: "address",
  },
  mobile: {
    type: GraphQLString,
    description: "mobile",
  },
  email: {
    type: GraphQLString,
    description: "email",
  },
  department: {
    type: GraphQLString,
    description: "department",
  },
  course: {
    type: GraphQLString,
    description: "course",
  },
  designation: {
    type: GraphQLString,
    description: "designation",
  },
  appointType: {
    type: GraphQLString,
    description: "appoint type",
  },
  firstYear: {
    type: GraphQLString,
    description: "gonna teach first year ",
  },
  DOJ: {
    type: GraphQLString,
    description: "date of joining",
  },
};

const FacultyType = new GraphQLObjectType({
  name: "Faculty",
  description: "Faculty",
  fields: () => ({ ...FacultySchema }),
});

module.exports = {
  FacultyType,
  FacultySchema,
  FacultyOptionalSchema,
};
