const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  provider: String,
  providerId: String,
  password: {
    type: String,
    required: true
  },
  postIds: [
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
      }
    }
  ],
  dateCreated: {
    type: String,
    required: true,
    default: new Date()
  },
  bio: String,
  profileUrl: String
});

module.exports = User = mongoose.model('user', userSchema);
