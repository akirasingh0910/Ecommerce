const userTypeDefs = require('./typeDefs/user');
const productTypeDefs = require('./typeDefs/product');
const orderTypeDefs = require('./typeDefs/order');

const userResolvers = require('./resolvers/user');
const productResolvers = require('./resolvers/product');
const orderResolvers = require('./resolvers/order');

module.exports = {
  typeDefs: [
    require('./schema'),
    userTypeDefs,
    productTypeDefs,
    orderTypeDefs,
  ],
  resolvers: {
    Query: {
      ...userResolvers.Query,
      ...productResolvers.Query,
      ...orderResolvers.Query,
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...productResolvers.Mutation,
      ...orderResolvers.Mutation,
    },
    Order: {
      ...orderResolvers.Order,
    },
  }
};
