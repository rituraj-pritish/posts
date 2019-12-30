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

    getUser: async (parent, { userId }) => {
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

    getPosts: async () => {
      return await Post.find({});
    },

    getPost: async (parent, { postId }) => {
      const post = await Post.findById(postId);

      post.views += 1;

      return await post.save();
    },

    getCommentsOfPost: async (parent, { postId }) => {
      const post = await Post.findById(postId);

      return post.comments;
    },

    getClapsOfPost: async (parent, { postId }) => {
      const post = await Post.findById(postId);

      return post.claps;
    }
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

    addPost: async (
      parent,
      { title, content, tags, image, imageUrl },
      { userId }
    ) => {
      let imgUrl;
      if (image) {
        const { createReadStream } = await image;
        imgUrl = await utils.imageUpload(createReadStream);
      }

      if(imageUrl) {
      imgUrl = await utils.imageUrlUpload(imageUrl);
      }

      const user = await User.findById(userId);
      const post = await new Post({
        title,
        content,
        userId
      }).save();

      const tagsArr = [];
      tags.split(',').forEach(tag => tagsArr.push(tag.trim()));

      post.tags = tagsArr;
      await post.save();

      await user.postIds.push({ post: post._id });
      post.imageUrl = imgUrl;
      await user.save();
      await post.save();
      return true;
    },

    updatePost: async (
      parent,
      { title, content, tags, postId,image,imageUrl },
      { userId, requireLogin, isSameUser }
    ) => {
      requireLogin(userId);
      const post = await Post.findById(postId);
      isSameUser(post.userId, userId);

      if (!post) throw new Error('No post found');

      let imgUrl;
      if (image) {
        const { createReadStream } = await image;
        imgUrl = await utils.imageUpload(createReadStream);
      }

      if(imageUrl) {
      imgUrl = await utils.imageUrlUpload(imageUrl);
      }

      post.title = title;
      post.content = content;
      post.imageUrl = imgUrl;

      const tagsArr = [];
      tags.split(',').forEach(tag => tagsArr.push(tag.trim()));

      post.tags = tagsArr;
      await post.save();

      return true;
    },

    deletePost: async (
      parent,
      { postId },
      { userId, requireLogin, isSameUser }
    ) => {
      requireLogin(userId);
      const post = await Post.findByIdAndDelete(postId);

      return true;
    },

    addComment: async (parent, { content, postId }, { userId }) => {
      const post = await Post.findById(postId);

      await post.comments.push({ userId, content });
      await post.save();

      return post.comments[post.comments.length - 1];
    },

    updateComment: async (
      parent,
      { content, postId, commentId },
      { requireLogin, userId, isSameUser }
    ) => {
      requireLogin(userId);
      const post = await Post.findById(postId);
      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );

      isSameUser(comment.userId, userId);
      comment.content = content;
      await post.save();

      return comment;
    },

    deleteComment: async (
      parent,
      { postId, commentId },
      { requireLogin, userId, isSameUser }
    ) => {
      requireLogin(userId);
      const post = await Post.findById(postId);
      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );
      isSameUser(comment.userId, userId);

      post.comments = post.comments.filter(
        com => com._id.toString() !== commentId
      );
      await post.save();
      return true;
    },

    likeComment: async (parent, { postId, commentId }, { userId }) => {
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

      await post.save();

      return true;
    },

    unlikeComment: async (parent, { postId, commentId }, { userId }) => {
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

      await post.save();

      return true;
    },

    addClap: async (parent, { postId }, { userId }) => {
      const post = await Post.findById(postId);

      isAlreadyClappedByUser = post.claps.find(
        clap => clap.userId.toString() === userId
      );

      if (isAlreadyClappedByUser)
        throw new Error(
          'We know you liked the post very much, but you can only clap once'
        );

      post.claps.push({ userId });

      await post.save();

      return true;
    },

    removeClap: async (parent, { postId }, { userId }) => {
      const post = await Post.findById(postId);

      isAlreadyClappedByUser = post.claps.find(
        clap => clap.userId.toString() === userId
      );

      if (!isAlreadyClappedByUser) throw new Error('Post not yet clapped');

      const idx = post.claps.indexOf(isAlreadyClappedByUser);

      await post.claps.splice(idx, 1);

      await post.save();

      return true;
    }
  }
};
