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
  imageUrl: String,
  tags: [String],
  likes: [
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
  },
  trending: {
    type: Boolean,
    default: false
  }
});

module.exports = Post = mongoose.model('post', postSchema);
