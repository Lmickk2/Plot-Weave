import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser($bio: String!, $profilePicture: Upload) {
    updateUser(bio: $bio, profilePicture: $profilePicture) {
      _id
      username
      email
      profilePicture
      bio
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!, $postTitle: String!) {
    addPost(postText: $postText, postTitle: $postTitle) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;


export const ADD_WEAVE = gql`
  mutation addWeave($postText: String!, $postTitle: String!) {
    addWeave(postText: $postText, postTitle: $postTitle) {
      _id
      postTitle
      postText
      weaveAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $postText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
