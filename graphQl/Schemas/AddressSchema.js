const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");

const AddressSchema = {
  permanent: {
    type: GraphQLString,
    description: "Permanent Address",
  },
  resident: {
    type: GraphQLString,
    description: "Resident Address",
  },
};

const PhoneSchema = {
  permanent: {
    type: GraphQLString,
    description: "Permanent Phone",
  },
  residential: {
    type: GraphQLString,
    description: "Resident Phone",
  },
};

const AddressType = new GraphQLObjectType({
  name: "Address",
  description: "Address",
  fields: () => ({ ...AddressSchema }),
});
const AddressInputType = new GraphQLInputObjectType({
  name: "AddressInput",
  description: "Address",
  fields: () => ({ ...AddressSchema }),
});

const PhoneType = new GraphQLObjectType({
  name: "Phone",
  description: "Phone",
  fields: () => ({ ...PhoneSchema }),
});

module.exports = {
  AddressSchema,
  PhoneSchema,
  AddressType,
  PhoneType,
  AddressInputType,
};
