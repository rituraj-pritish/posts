module.exports = {
  type: `
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
  `,

  query: `
    getUserByToken(token: String!): User
    getUser(userId: ID!): User
    login(email: String!, password: String!): User
  `,

  mutation: `
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
  `
};
