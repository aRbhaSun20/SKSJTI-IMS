const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");
const { cacheManagement } = require("../../middlewares/CacheModule");
const Department = require("../../models/Department");
const {
  AddressType,
  AddressInputType,
  PhoneInputType,
  PhoneType,
} = require("./AddressSchema");
const { DepartmentType } = require("./DepartmentSchema");

const FacultySchema = {
  _id: {
    type: GraphQLString,
  },
  kgId: {
    type: GraphQLNonNull(GraphQLString),
    description: "kgId",
  },
  password: {
    type: GraphQLNonNull(GraphQLString),
    description: "password",
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
  phone: {
    type: PhoneType,
    description: "phone",
  },
  email: {
    type: GraphQLString,
    description: "email",
  },
  departmentId: {
    type: GraphQLNonNull(GraphQLString),
    description: "department",
  },
  department: {
    type: DepartmentType,
    description: "department Details",
    resolve: async (faculty) => {
      if (cacheManagement.has(faculty.departmentId)) {
        return cacheManagement.get(faculty.departmentId);
      } else {
        const data = await Department.findById(faculty.departmentId);
        cacheManagement.set(data._id.toString(), data);
        return data;
      }
    },
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
  password: {
    type: GraphQLNonNull(GraphQLString),
    description: "password",
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
  phone: {
    type: PhoneInputType,
    description: "phone",
  },
  email: {
    type: GraphQLString,
    description: "email",
  },
  departmentId: {
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
