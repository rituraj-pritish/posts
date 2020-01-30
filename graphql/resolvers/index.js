const User = require('../../models/User');
const Post = require('../../models/Post');
const authResolvers = require('./authResolvers');
const postsResolvers = require('./postsResolvers');

module.exports = {
  Query: {
    ...authResolvers.Query,
    ...postsResolvers.Query
  },

  User: {
    posts: async parent => {
      return await Post.find({
        userId: parent._id
      });
    }
  },

  Post: {
    user: async parent => {
      return await User.findById(parent.userId);
    }
  },

  Comment: {
    user: async parent => await User.findById(parent.userId)
  },

  Mutation: {
    ...authResolvers.Mutation,
    ...postsResolvers.Mutation
  }
};
