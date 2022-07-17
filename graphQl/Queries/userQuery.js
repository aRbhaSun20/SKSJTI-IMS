const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const jwt = require("jsonwebtoken");
const Faculty = require("../../models/Faculty");
const { FacultyType } = require("../Schemas/FacultySchema");
const { StudentType } = require("../Schemas/StudentSchema");
require("dotenv").config();

const userQuery = {
  faultyLogin: {
    type: GraphQLString,
    description: "faculty login",
    args: {
      kgId: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      let user = await Faculty.findOne({ kgId: args.kgId });

      if (!user) {
        throw new Error("No faculty with email");
      }
      if (args.password === user._doc.password) {
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            password: user.password,
            kgId: user.kgId,
          },
          process.env.ACCESS_TOKEN_SECRET
        );

        return token;
      } else {
        throw new Error("Incorrect password");
      }
    },
  },
  studentLogin: {
    type: GraphQLString,
    description: "student login",
    args: {
      usn: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      let user = await Faculty.findOne({ usn: args.usn });

      if (!user) {
        throw new Error("No student with email");
      }
      if (args.password === user._doc.password) {
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            password: user.password,
            usn: user.usn,
          },
          process.env.ACCESS_TOKEN_SECRET
        );

        return token;
      } else {
        throw new Error("Incorrect password");
      }
    },
  },
};

module.exports = { userQuery };
