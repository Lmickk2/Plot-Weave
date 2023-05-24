const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const defaultProfilePicture = fs.readFileSync('../client/src/images/profile.png');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'OriginalPost',
    },
  ],
  weaves: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Weave',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  profilePicture: {
      type: String,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  yt: {
    type: String,
  },
  fb: {
    type: String,
  },
  twt: {
    type: String,
  },
  ig: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
