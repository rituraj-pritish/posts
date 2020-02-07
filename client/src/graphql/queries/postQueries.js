import { gql } from 'apollo-boost';

export const getTotalPagesQuery = gql`
  query {
    getTotalPages
  }
`

export const getPostsQuery = gql`
  query($page: Int) {
    getPosts(page: $page) {
      _id
      title
      content
      imageUrl
      tags
      date
      views
      userId
      likes {
        userId
      }
      user {
        firstName
        lastName
      }
      trending
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
        _id
        bio
        profileUrl
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
      likes {
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
        profileUrl
      }
      likes {
        userId
      }
    }
  }
`;

export const getLikesOfPost = gql`
  query($postId: ID!) {
    getClapsOfPost(postId: $postId) {
      userId
    }
  }
`;
