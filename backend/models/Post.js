const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
   img:
    {
        data: Buffer,
        contentType: String
    },
  // imageUrl: {type: String },
  userId: { type: String, required: true },
  likes: {type: Number, required: true},
  usersLiked: { type: Array },
});

module.exports = mongoose.model('Post', postSchema);
