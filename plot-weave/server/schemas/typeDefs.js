const {ApolloServer, gql, GraphQLUpload} = require('apollo-server-express');

const typeDefs = gql`

scalar Upload

enum Genre {
  ACTION
  ADVENTURE
  COMEDY
  DRAMA
  FANTASY
  HORROR
  MYSTERY
  OTHER
  ROMANCE
  SCIENCE_FICTION
  THRILLER
}

type User {
  _id: ID
  username: String
  email: String
  password: String
  profilePicture: Upload
  bio: String
  posts: [OriginalPost]!
  weaves: [Weave]!
  followers: [User!]
  following: [User!]
}


  type OriginalPost {
    _id: ID
    postTitle:String
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
    user: [User]!
    likes: Int!
    genre: Genre
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [OriginalPost]
    post(postId: ID!): OriginalPost
    me: User
    weaves(username: String): [Weave]
    weave(weaveId: ID!): Weave
  }
  type Weave {
    _id: ID
    postTitle:String
    postText: String
    weaveAuthor: String
    createdAt: String
    comments: [Comment]!
    user: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!, postTitle:String!, genre: String!): OriginalPost
    addComment(postId: ID!, commentText: String!): OriginalPost
    removePost(postId: ID!): OriginalPost
    removeComment(postId: ID!, commentId: ID!): OriginalPost
    addWeave(postText: String!, postTitle:String!): Weave
    updateUser(profilePicture: Upload, bio: String): User
    followUser(followeeId: ID!): User!
    unfollowUser(followeeId: ID!): User!
    likePost(postId: ID!): OriginalPost!
    unlikePost(postId: ID!): OriginalPost!
  }  
`;

module.exports = typeDefs;
