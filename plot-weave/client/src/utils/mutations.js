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
mutation addPost($postText: String!, $postTitle: String!, $genre: String!) {
  addPost(postText: $postText, postTitle: $postTitle, genre: $genre) {
    _id
    postTitle
    postText
    postAuthor
    createdAt
    comments {
      _id
      commentText
    }
    genre
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

export const ADD_FOLLOWER = gql`
  mutation AddFollower($followeeId: ID!) {
    followUser(followeeId: $followeeId) {
      _id
      username
      followers {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation RemoveFollower($followeeId: ID!) {
    unfollowUser(followeeId: $followeeId) {
      _id
      username
      followers {
        _id
        username
      }
    }
  }
`;

export const ADD_LIKE = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      likes {
        _id
        username
      }
      likeCount
    }
  }
`;

export const REMOVE_LIKE = gql`
mutation RemoveLike($postId: ID!) {
  unlikePost(postId: $postId) {
    _id
    postTitle
    postText
    postAuthor
    createdAt
    likes {
      _id
      username
    }
  }
}
`
