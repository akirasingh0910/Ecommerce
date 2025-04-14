const { Product } = require('../../models');

module.exports = {
  Query: {
    products: async () => await Product.findAll(),
    product: async (_, { id }) => await Product.findByPk(id),
  },
  Mutation: {
    createProduct: async (_, { input }) => await Product.create(input),
    updateProduct: async (_, { input }) => {
      const product = await Product.findByPk(input.id);
      if (!product) throw new Error("Product not found");
      return await product.update(input);
    },
    deleteProduct: async (_, { id }) => {
      const deleted = await Product.destroy({ where: { id } });
      return deleted ? true : false;
    },
  },
};
