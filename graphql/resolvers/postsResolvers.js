const {
  userExists,
  isSameUser,
  imageUpload,
  imageUrlUpload
} = require('../../utils/utils');
const Post = require('../../models/Post');

const PAGE_LENGTH = 7;

module.exports = {
  Query: {
    getPosts: async (parent, { page }) => {
      return await Post.find({})
        .sort({ _id: -1 })
        .skip(PAGE_LENGTH * (page - 1))
        .limit(PAGE_LENGTH);
    },

    getTrendingPosts: async () => {
      return await Post.find({ trending: true }).limit(5);
    },

    getTotalPages: async () => {
      return parseInt((await Post.find().countDocuments()) / PAGE_LENGTH) + 1;
    },

    getPost: async (parent, { postId }) => {
      const post = await Post.findById(postId);

      post.views += 1;

      return await post.save();
    },

    getPostsByUserId: async (parent, { userId }) => {
      return await Post.find({ userId });
    },

    getPostsByTag: async (parent, { tag }) => {
      const posts = await Post.find({});
      return posts.filter(post => post.tags.includes(tag));
    },

    getCommentsOfPost: async (parent, { postId }) => {
      const post = await Post.findById(postId);

      return post.comments;
    },

    getLikesOfPost: async (parent, { postId }) => {
      const post = await Post.findById(postId);

      return post.likes;
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
        imgUrl = await imageUpload(createReadStream);
      }

      if (imageUrl) {
        imgUrl = await imageUrlUpload(imageUrl);
      }

      const user = await User.findById(currentUser);
      const post = await new Post({
        title,
        content,
        userId: currentUser
      }).save();

      if (tags) {
        const tagsArr = [];
        tags.split(',').forEach(tag => tagsArr.push(tag.trim().toLowerCase()));

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
      { currentUser }
    ) => {
      userExists(currentUser);

      const post = await Post.findById(postId);
      if (!post) throw new Error('No post found');

      isSameUser(post.userId, currentUser);

      const isImageSame = post.imageUrl === imageUrl;

      let imgUrl;
      if (!isImageSame) {
        if (image) {
          const { createReadStream } = await image;
          imgUrl = await imageUpload(createReadStream);
        }

        if (imageUrl) {
          imgUrl = await imageUrlUpload(imageUrl);
        }
        post.imageUrl = imgUrl;
      }

      post.title = title;
      post.content = content;

      const tagsArr = [];
      tags.split(',').forEach(tag => tagsArr.push(tag.trim().toLowerCase()));

      post.tags = tagsArr;
      await post.save();

      return true;
    },

    deletePost: async (parent, { postId }, { currentUser }) => {
      userExists(currentUser);
      const post = await Post.findById(postId);
      isSameUser(post.userId, currentUser);

      await post.remove();
      return true;
    },

    addComment: async (parent, { content, postId }, { currentUser }) => {
      userExists(currentUser);
      const post = await Post.findById(postId);

      await post.comments.push({ userId: currentUser, content });
      await post.save();

      //comment will be saved at end of array
      return post.comments[post.comments.length - 1];
    },

    updateComment: async (
      parent,
      { content, postId, commentId },
      { currentUser }
    ) => {
      userExists(currentUser);
      const post = await Post.findById(postId);
      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );

      isSameUser(comment.userId, currentUser);
      comment.content = content;
      await post.save();

      return comment;
    },

    deleteComment: async (parent, { postId, commentId }, { currentUser }) => {
      userExists(currentUser);
      const post = await Post.findById(postId);
      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );
      isSameUser(comment.userId, currentUser);

      post.comments = post.comments.filter(
        com => com._id.toString() !== commentId
      );
      await post.save();
      return true;
    },

    likeComment: async (parent, { postId, commentId }, { currentUser }) => {
      userExists(currentUser);
      const post = await Post.findById(postId);

      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );

      const alreadyLiked = comment.likes.find(
        like => like.userId.toString() === currentUser
      );

      if (alreadyLiked) {
        throw new Error('Comment already liked');
      }

      await comment.likes.push({ userId: currentUser });

      await post.save();

      return true;
    },

    unlikeComment: async (parent, { postId, commentId }, { currentUser }) => {
      userExists(currentUser);
      const post = await Post.findById(postId);

      const comment = post.comments.find(
        com => com._id.toString() === commentId
      );

      const alreadyLiked = comment.likes.find(
        like => like.userId.toString() === currentUser
      );
      const idx = comment.likes.indexOf(alreadyLiked);

      if (!alreadyLiked) {
        throw new Error('Comment not yet liked');
      }

      await comment.likes.splice(idx, 1);

      await post.save();

      return true;
    },

    likePost: async (parent, { postId }, { currentUser }) => {
      userExists(currentUser);
      const post = await Post.findById(postId);

      isAlreadyLikedByUser = post.likes.find(
        like => like.userId.toString() === currentUser
      );

      if (isAlreadyLikedByUser)
        throw new Error(
          'We know you liked the post very much, but you can only like once'
        );

      post.likes.push({ userId: currentUser });

      await post.save();

      return true;
    },

    unlikePost: async (parent, { postId }, { currentUser }) => {
      userExists(currentUser);
      const post = await Post.findById(postId);

      isAlreadyLikedByUser = post.likes.find(
        like => like.userId.toString() === currentUser
      );

      if (!isAlreadyLikedByUser) throw new Error('Post not yet liked');

      const idx = post.likes.indexOf(isAlreadyLikedByUser);

      await post.likes.splice(idx, 1);

      await post.save();

      return true;
    }
  }
};
