const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const weaveSchema = new Schema({
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
  weaveAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
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
});
  
  const Weave = model('Weave', weaveSchema);
  
  module.exports = Weave;
  