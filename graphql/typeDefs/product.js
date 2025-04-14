const { gql } = require('apollo-server-express');

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
    stock: Int!
    createdAt: String
    updatedAt: String
  }

  input CreateProductInput {
    name: String!
    price: Float!
    category: String!
    stock: Int
  }

  input UpdateProductInput {
    id: ID!
    stock: Int
  }

  extend type Query {
    products: [Product]
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }
`;
