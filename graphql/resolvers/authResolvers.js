const utils = require('../../utils/utils');
const User = require('../../models/User');

module.exports =  {
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

    getUser: async (parent, { userId }) => {
      const user = await User.findById(userId).select('-password');

      if (!user) {
        throw new Error('No user found');
      }

      return user;
    },

    getUserByToken: async (parent, { token }) => {
      const userId = await utils.getUserIdFromToken(token);
      console.log('userid',userId);
      if(!userId) throw new Error('Invalid token');

      const user = await User.findById(userId).select('-password');

      if (!user) {
        throw new Error('No user found');
      }

      return user;
    },

  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!emailExpression.test(String(email).toLowerCase())) {
        throw new Error('Please provide valid email address');
      }

      const hashedPassword = await utils.hashPassword(password);

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      await user.save();

      const token = await utils.signToken(user._id);

      return { token, ...user._doc, password: null };
    },
  }
}