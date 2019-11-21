const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String
    token: String
    postIds: [ID]
    posts: [Post]
    dateCreated: String!
  }

  type Category {
    _id: ID!
    name: String
    postIds: [ID]
    posts: [Post]
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    userId: ID!
    user: User!
    categories: [Category]
    thumbsUp: [String] #userId
    comments: [Comment]
    date: String!
  }

  type Comment {
    _id: ID!
    content: String!
    userId: ID!
    user: User!
    likes: [Like]
    date: String!
  }

  type Like {
    _id: ID!
    userId: ID!
    user: User!
  }

  type Query {
    getUserByToken(token: String!): User
    getUserById(userId: ID!): User
    login(email: String!, password: String!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
    getComments(commentId: ID!): [Comment]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): User

    addPost(title: String!, content: String!, userId: ID!): Post

    addComment(content: ID!, userId: ID!, postId: ID!): Comment

    likeComment(postId: ID!, userId: ID!, commentId: ID!): Comment

    unlikeComment(postId: ID!, userId: ID!, commentId: ID!): Comment
  }
`;
