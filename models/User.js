const mongoose = require('mongoose')

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
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = User = mongoose.model('user', userSchema)