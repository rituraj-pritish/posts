import { gql } from 'apollo-boost';

export const getPostsQuery = gql`
  {
    getPosts {
      _id
      title
      content
      imageUrl
      tags
      date
      views
      userId
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
      imageUrl
      tags
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

export const getClapsOfPostQuery = gql`
  query($postId: ID!) {
    getClapsOfPost(postId: $postId) {
      userId
    }
  }
`;
