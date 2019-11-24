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

export const getPostsQuery = gql`
  {
    getPosts {
      _id
      title
      content
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
`;

export const getPostQuery = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      _id
      userId
      title
      content
      date
      views
      user {
        firstName
        lastName
      }
      comments {
        _id
        content
        date
        userId
        user {
          _id
          firstName
          lastName
        }
        likes {
          userId
        }
      }
      claps {
        userId
      }
    }
  }
`;

export const getCommentsOfPostQuery = gql`
  query($postId: ID!) {
    getCommentsOfPost(postId: $postId) {
      _id
      content
      date
      userId
      user {
        _id
        firstName
        lastName
      }
      likes {
        userId
      }
    }
  }
`;
