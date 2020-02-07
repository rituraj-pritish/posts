const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  name: String,
  bio: String,
})

module.exports = Profile = mongoose.model('profile', profileSchema)