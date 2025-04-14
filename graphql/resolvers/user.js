const { User } = require('../../models');

module.exports = {
  Query: {
    users: async () => await User.findAll(),
    user: async (_, { id }) => await User.findByPk(id),
  },
  Mutation: {
    createUser: async (_, { input }) => await User.create(input),
    deleteUser: async (_, { id }) => {
      const deleted = await User.destroy({ where: { id } });
      return deleted ? true : false;
    },
  },
};
