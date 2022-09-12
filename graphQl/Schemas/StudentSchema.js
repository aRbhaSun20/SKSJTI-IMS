const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");
const { cacheManagement } = require("../../middlewares/CacheModule");
const Batch = require("../../models/Batch");
const {
  PhoneType,
  AddressType,
  AddressInputType,
  PhoneInputType,
} = require("./AddressSchema");
const { BatchType } = require("./BatchSchema");

const StudentSchema = {
  _id: {
    type: GraphQLString,
  },
  usn: {
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
  age: {
    type: GraphQLNonNull(GraphQLInt),
    description: "age",
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
  email: {
    type: GraphQLString,
    description: "email",
  },
  phone: {
    type: PhoneType,
    description: "phone",
  },
  motherName: {
    type: GraphQLString,
    description: "mother name",
  },
  fatherName: {
    type: GraphQLString,
    description: "father name",
  },
  program: {
    type: GraphQLString,
    description: "program",
  },
  course: {
    type: GraphQLString,
    description: "course",
  },
  batchId: {
    type: GraphQLString,
    description: "batch id",
  },
  batch: {
    type: BatchType,
    description: "Batch Details",
    resolve: async (student) => {
      if (cacheManagement.has(student.batchId)) {
        return cacheManagement.get(student.batchId);
      } else {
        const data = await Batch.findById(student.batchId);
        cacheManagement.set(student.batchId.toString(), data);
        return data;
      }
    },
  },
  internalMarksId: {
    type: GraphQLList(GraphQLString),
    description: "internal Marks Id",
  },
  approval: {
    type: GraphQLBoolean,
    description: "approval status",
  },
  diploma: {
    type: GraphQLBoolean,
    description: "diploma status",
  },
  semesterMarksId: {
    type: GraphQLList(GraphQLString),
    description: "semester marks id",
  },
  doj: {
    type: GraphQLNonNull(GraphQLString),
    description: "date of joining",
  },
  currentYear: {
    type: GraphQLString,
    description: "current Year",
  },
};

const StudentOptionalSchema = {
  _id: {
    type: GraphQLString,
  },
  usn: {
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
  age: {
    type: GraphQLInt,
    description: "age",
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
  email: {
    type: GraphQLString,
    description: "email",
  },
  phone: {
    type: PhoneInputType,
    description: "phone",
  },
  motherName: {
    type: GraphQLString,
    description: "mother name",
  },
  fatherName: {
    type: GraphQLString,
    description: "father name",
  },
  program: {
    type: GraphQLString,
    description: "program",
  },
  course: {
    type: GraphQLString,
    description: "course",
  },
  batchId: {
    type: GraphQLString,
    description: "batch ",
  },
  internalMarksId: {
    type: GraphQLList(GraphQLString),
    description: "internal Marks Id",
  },
  approval: {
    type: GraphQLBoolean,
    description: "approval status",
  },
  diploma: {
    type: GraphQLBoolean,
    description: "diploma status",
  },
  semesterMarksId: {
    type: GraphQLList(GraphQLString),
    description: "semester marks id",
  },
  doj: {
    type: GraphQLString,
    description: "date of joining",
  },
  currentYear: {
    type: GraphQLString,
    description: "current Year",
  },
};

const StudentType = new GraphQLObjectType({
  name: "Student",
  description: "Student",
  fields: () => ({ ...StudentSchema }),
});

module.exports = {
  StudentType,
  StudentSchema,
  StudentOptionalSchema,
};
