const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
    createdAt: String
    updatedAt: String
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
    role: String
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    deleteUser(id: ID!): Boolean
  }
`;
