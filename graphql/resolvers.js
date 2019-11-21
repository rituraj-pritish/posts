const User = require('../models/User');
const Post = require('../models/Post');
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

    getUserById: async (parent, { userId }) => {
      const user = await User.findById(userId).select('-password');

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
    },

    getPosts: async () => await Post.find({}),

    getPost: async (parent, { postId }) => {
      return await Post.findById(postId);
    },

    getComments: async (parent, { commentId }) => {
      const post = await Post.findById(commentId);

      return post.comments;
    }
  },

  User: {
    posts: async parent => {
      return await Post.find({ userId: parent._id });
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

    addPost: async (parent, { title, content, userId }) => {
      const user = await User.findById(userId);

      const post = await new Post({
        title,
        content,
        userId
      }).save();

      await user.postIds.push({ post: post._id });
      await user.save();

      return post.save();
    },

    addComment: async (parent, { content, userId, postId }) => {
      const post = await Post.findById(postId);

      await post.comments.push({ userId, content });

      return await post.save();
    },

    likeComment: async (parent, { postId, userId, commentId }) => {
      const post = await Post.findById(postId);

      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );

      const alreadyLiked = comment.likes.find(
        like => like.userId.toString() === userId
      );

      if (alreadyLiked) {
        throw new Error('Comment already liked');
      }

      await comment.likes.push({ userId });

      return await post.save();
    },

    unlikeComment: async (parent, { postId, userId, commentId }) => {
      const post = await Post.findById(postId);

      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );

      const alreadyLiked = comment.likes.find(
        like => like.userId.toString() === userId
      );
      const idx = comment.likes.indexOf(alreadyLiked);

      if (!alreadyLiked) {
        throw new Error('Comment not yet liked');
      }

      await comment.likes.splice(idx, 1);

      return await post.save();
    }
  }
};
