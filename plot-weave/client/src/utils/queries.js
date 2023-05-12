import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio
      yt
      twt
      fb
      ig
      posts {
        _id
        postTitle
        postText
        createdAt
      }
      weaves {
        _id
        postTitle
        postText
        createdAt
      }
      followers {
        _id
        username
      }

      following {
        _id
        username
      }
    }
  }
`;

export const QUERY_RANDOM_USERS = gql`
  query randomUsers($limit: Int!) {
    users(limit: $limit) {
      _id
      username
      bio
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      likes
    }
  }
`;

export const QUERY_USER_POSTS = gql`
  query getUserPosts($userId: ID!) {
    posts(postAuthor: $userId) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
    }
  }
`;

export const QUERY_USER_WEAVES = gql`
  query getUserWeaves($userId: ID!) {
    weaves(weaveAuthor: $userId) {
      _id
      postTitle
      postText
      weaveAuthor
      createdAt
    }
  }
`;

export const QUERY_WEAVES = gql`
  query getWeaves {
    weaves {
      _id
      postTitle
      postText
      weaveAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      likes
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_WEAVE = gql`
  query getSingleWeave($weaveId: ID!) {
    weave(weaveId: $weaveId) {
      _id
      postTitle
      postText
      weaveAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bio
      yt
      twt
      fb
      ig
      profilePicture
      posts {
        _id
        postTitle
        postText
        postAuthor
        createdAt
      }
      weaves {
        _id
        postTitle
        postText
        weaveAuthor
        createdAt
      }
      followers {
        _id
        username
      }
    }
  }
`;
