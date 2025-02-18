const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  avatar: String
})

module.exports = mongoose.model('User', userSchema)
