const {userExists} = require('../../utils/utils');
const Post = require('../../models/Post');

module.exports = {
  Query: {
    getPosts: async (parent, args, {currentUser}) => {
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

  Mutation: {
    addPost: async (
      parent,
      { title, content, tags, image, imageUrl },
      { currentUser }
    ) => {
      userExists(currentUser);

      let imgUrl;
      if (image) {
        const { createReadStream } = await image;
        imgUrl = await utils.imageUpload(createReadStream);
      }

      if (imageUrl) {
        imgUrl = await utils.imageUrlUpload(imageUrl);
      }

      const user = await User.findById(userId);
      const post = await new Post({
        title,
        content,
        userId
      }).save();

      if (tags) {
        const tagsArr = [];
        tags.split(',').forEach(tag => tagsArr.push(tag.trim()));

        post.tags = tagsArr;
        await post.save();
      }

      await user.postIds.push({ post: post._id });
      post.imageUrl = imgUrl;
      await user.save();
      await post.save();
      return true;
    },

    updatePost: async (
      parent,
      { title, content, tags, postId, image, imageUrl },
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

      if (imageUrl) {
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
