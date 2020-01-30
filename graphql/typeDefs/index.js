const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userTypeDefs');
const postTypeDefs = require('./postTypeDefs');

module.exports = gql`
  ${userTypeDefs.type},
  ${postTypeDefs.type}

  type Query {
    ${userTypeDefs.query},
    ${postTypeDefs.query}
  }

  type Mutation {
    ${userTypeDefs.mutation},
    ${postTypeDefs.mutation}
  }
`;
