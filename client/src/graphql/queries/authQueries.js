import { gql } from 'apollo-boost';

export const loginQuery = gql`
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      token
    }
  }
`;

export const getUserByTokenQuery = gql`
  query($token: String!) {
    getUserByToken(token: $token) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const getUserQuery = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      _id
      firstName
      lastName
      posts {
        _id
        title
        content
        imageUrl
        tags
        date
        views
        claps {
          userId
        }
        user {
          firstName
          lastName
        }
      }
    }
  }
`;