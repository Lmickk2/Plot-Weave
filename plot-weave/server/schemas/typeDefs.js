const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [OriginalPost]!
  }

  type OriginalPost {
    _id: ID
    postTitle:String
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
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
    weaves(keyword: String!): [Weave!]!
    weave(id: ID!): Weave
  }
  type Weave {
    _id: ID
    weaveTitle:String
    postText: String
    weaveAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!, postTitle:String!): OriginalPost
    addComment(postId: ID!, commentText: String!): OriginalPost
    removePost(postId: ID!): OriginalPost
    removeComment(postId: ID!, commentId: ID!): OriginalPost
    addWeave(postText: String!, weaveTitle:String!): Weave
  }
`;

module.exports = typeDefs;
