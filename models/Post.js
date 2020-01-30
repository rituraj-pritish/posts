const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  imageUrl: {
    type: String,
    default:
      'https://www.onblastblog.com/wp-content/uploads/2018/05/free-images-for-blogs.jpeg'
  },
  tags: [String],
  claps: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  views: {
    type: Number,
    default: 0
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      content: String,
      date: {
        type: String,
        default: new Date()
      },
      likes: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ]
    }
  ],
  date: {
    type: String,
    required: true,
    default: new Date()
  }
});

module.exports = Post = mongoose.model('post', postSchema);
