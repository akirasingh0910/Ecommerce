const { Order, User, Product } = require('../../models');

module.exports = {
  Query: {
    orders: async () => await Order.findAll(),
    order: async (_, { id }) => await Order.findByPk(id),
    ordersByUser: async (_, { userId }) => await Order.findAll({ where: { userId } }),
  },
  Mutation: {
    createOrder: async (_, { input }) => await Order.create(input),
    updateOrderStatus: async (_, { input }) => {
      const order = await Order.findByPk(input.id);
      if (!order) throw new Error("Order not found");
      return await order.update({ status: input.status });
    },
    deleteOrder: async (_, { id }) => {
      const deleted = await Order.destroy({ where: { id } });
      return deleted ? true : false;
    },
  },
  Order: {
    user: async (parent) => await User.findByPk(parent.userId),
    product: async (parent) => await Product.findByPk(parent.productId),
  },
};
