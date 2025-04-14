const { gql } = require('apollo-server-express');

module.exports = gql`
  type Order {
    id: ID!
    userId: Int!
    productId: Int!
    quantity: Int!
    totalAmount: Float!
    status: String!
    createdAt: String
    updatedAt: String
    user: User
    product: Product
  }

  input CreateOrderInput {
    userId: Int!
    productId: Int!
    quantity: Int!
    totalAmount: Float!
    status: String
  }

  input UpdateOrderInput {
    id: ID!
    status: String
  }

  extend type Query {
    orders: [Order]
    order(id: ID!): Order
    ordersByUser(userId: Int!): [Order]
  }

  extend type Mutation {
    createOrder(input: CreateOrderInput!): Order
    updateOrderStatus(input: UpdateOrderInput!): Order
    deleteOrder(id: ID!): Boolean
  }
`;
