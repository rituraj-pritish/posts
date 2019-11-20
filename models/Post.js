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
  categories: [String],
  thumbsUp: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      content: String,
      date: {
        type: Date,
        default: Date.now()
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
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Post = mongoose.model('post', postSchema);
