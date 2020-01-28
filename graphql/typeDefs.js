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

  type Post {
    _id: ID!
    imageUrl: String
    title: String!
    content: String!
    userId: ID!
    user: User!
    views: Int!
    tags: [String]
    claps: [Clap] #userId
    comments: [Comment]
    date: String!
  }

  type Comment {
    _id: ID
    content: String
    userId: ID
    user: User
    likes: [Like]
    date: String
  }

  type Like {
    _id: ID!
    userId: ID!
    user: User!
  }

  type Clap {
    _id: ID
    userId: ID
  }

  type Query {
    getUserByToken(token: String!): User
    getUser(userId: ID!): User
    login(email: String!, password: String!): User
    getPosts: [Post]
    getPost(postId: ID!): Post
    getPostsByUserId: [Post]
    getCommentsOfPost(postId: ID!): [Comment]
    getClapsOfPost(postId: ID!): [Clap]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User

    addPost(
      title: String!
      content: String!
      tags: String
      image: Upload
      imageUrl: String
    ): Boolean

    updatePost(
      title: String!
      content: String!
      tags: String
      postId: ID!
      image: Upload
      imageUrl: String
    ): Boolean

    deletePost(postId: ID!): Boolean

    addComment(content: String!, postId: ID!): Comment

    updateComment(content: String!, postId: ID!, commentId: ID!): Comment

    deleteComment(postId: ID!, commentId: ID!): Boolean

    likeComment(postId: ID!, commentId: ID!): Boolean

    unlikeComment(postId: ID!, commentId: ID!): Boolean

    addClap(postId: ID!): Boolean

    removeClap(postId: ID!): Boolean
  }
`;
