const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: String!
    name: String!
    email: String!
    password: String
    token: String
  }

  type Query {
    getUserByToken(token: String!): User
    getUserById(id: String!): User
    login(email: String!, password: String!): User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
  }
`;
