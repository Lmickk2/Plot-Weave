require("dotenv").config();

const { AuthenticationError } = require("apollo-server-express");
const { User, OriginalPost, Weave } = require("../models");
const { signToken } = require("../utils/auth");
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts").populate("weaves");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts").populate("weaves");
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return OriginalPost.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return OriginalPost.findOne({ _id: postId });
    },
    weave: async (parent, { weaveId }) => {
      return Weave.findOne({ _id: weaveId });
    },
    weaves: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Weave.find(params).sort({ createdAt: -1 });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts").populate("weaves");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, { profilePicture, bio }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { profilePicture, bio },
          { new: true }
        ).populate("posts");
  
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
    addPost: async (parent, { postTitle, postText}, context) => {
      console.log(postTitle,postText)
      if (context.user) {
        const post = await OriginalPost.create({
          postTitle,
          postText,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addWeave: async (parent, { postTitle, postText}, context) => {
      console.log(postTitle,postText)
      if (context.user) {
        const weave = await Weave.create({
          postTitle,
          postText,
          weaveAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { weaves: weave._id } }
        );

        return weave;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return OriginalPost.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await OriginalPost.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return OriginalPost.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    followUser: async (parent, { followeeId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      const follower = await User.findById(user._id);
      const followee = await User.findById(followeeId);
    
      if (!follower || !followee) {
        throw new UserInputError('Invalid user ID');
      }
    
      if (follower.following.includes(followeeId)) {
        throw new UserInputError('You are already following this user');
      }
    
      follower.following.push(followeeId);
      followee.followers.push(follower._id);
    
      await follower.save();
      await followee.save();
    
      return follower;
    },
    

    unfollowUser: async (parent, { followeeId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // remove the followee from the user's following list
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { following: followeeId } },
        { new: true }
      );

      // remove the user from the followee's followers list
      const updatedFollowee = await User.findOneAndUpdate(
        { _id: followeeId },
        { $pull: { followers: user._id } },
        { new: true }
      );

      return updatedUser;
    },

    likePost: async (parent, { postId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // add the post to the user's liked posts list
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { likedPosts: postId } },
        { new: true }
      );

      // increment the post's likes count
      const updatedPost = await OriginalPost.findOneAndUpdate(
        { _id: postId },
        { $inc: { likes: 1 } },
        { new: true }
      );

      return updatedPost;
    },

    unlikePost: async (parent, { postId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // remove the post from the user's liked posts list
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { likedPosts: postId } },
        { new: true }
      );

      // decrement the post's likes count
      const updatedPost = await OriginalPost.findOneAndUpdate(
        { _id: postId },
        { $inc: { likes: -1 } },
        { new: true }
      );

      return updatedPost;
    }
  },
};

module.exports = resolvers;
