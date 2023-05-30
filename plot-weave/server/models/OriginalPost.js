const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const fs = require('fs');

const postSchema = new Schema({
  postTitle: {
    type: String,
    required: 'You need to leave a title!',
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  postText: {
    type: String,
    required: 'You need some text!',
    minlength: 1,
    maxlength: 3000,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    }
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  genre: {
    type: String,
    enum: ['ACTION', 'ADVENTURE', 'COMEDY', 'DRAMA', 'FANTASY', 'HORROR', 'MYSTERY', 'OTHER', 'ROMANCE', 'SCIENCE_FICTION', 'THRILLER'],
    default: null,
  },
});

const OriginalPost = model('OriginalPost', postSchema);

module.exports = OriginalPost;
