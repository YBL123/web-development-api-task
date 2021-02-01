const { truncate } = require('lodash')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true }
}, {
  timestamps: true
})


module.exports = mongoose.model('User', userSchema)