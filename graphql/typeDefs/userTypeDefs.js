module.exports = {
  type: `
    type User {
      _id: ID!
      firstName: String!
      lastName: String!
      email: String!
      provider: String
      providerId: String
      password: String
      token: String
      postIds: [ID]
      posts: [Post]
      dateCreated: String!
      bio: String
      profileUrl: String
    }
  `,

  query: `
    getUserByToken(token: String!): User
    getUser(userId: ID!): User
    signIn(email: String!, password: String!): User
    socialSignIn(email: String!, providerId: String!): User
  `,

  mutation: `
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    
    socialSignUp(
      provider: String!
      providerId: String!
      firstName: String!
      lastName: String
      email: String!
    ): User
  `
};
