const User = require('../models/User');
const utils = require('../utils/utils');

module.exports = {
  Query: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid Credentials');
      }

      const isMatch = await utils.verifyPassword(password, user.password);

      if (!isMatch) {
        throw new Error('Invalid Credentials');
      }

      const token = utils.signToken(user._id);

      return { token, ...user._doc, password: null };
    },

    getUserById: async (parent, { id }) => {
      const user = await User.findById(id).select('-password');

      if (!user) {
        throw new Error('No user found');
      }

      return user;
    },

    getUserByToken: async (parent, { token }) => {
      const decoded = await utils.verifyToken(token);

      if (!decoded.id) {
        throw new Error('Invalid token');
      }

      const id = decoded.id;

      const user = await User.findById(id).select('-password');

      if (!user) {
        throw new Error('No user found');
      }

      return user;
    }
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await utils.hashPassword(password);

      const user = new User({
        email,
        password: hashedPassword,
        name
      });

      await user.save();

      const token = await utils.signToken(user._id);

      return { token, ...user._doc, password: null };
    }
  }
};
