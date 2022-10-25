const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  imageBase64: {type: Buffer },
  userId: { type: String, required: true },
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  admin: {type: Boolean, default: false},
  likes: {type: Number},
  usersLiked: { type: Array },
});

module.exports = mongoose.model('Post', postSchema);
