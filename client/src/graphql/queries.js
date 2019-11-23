import {gql} from 'apollo-boost'

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
`

export const getUserByTokenQuery = gql`
  query($token: String!) {
    getUserByToken(token: $token) {
      _id
      firstName
      lastName
      email
    }
  }
`

export const getPostsQuery = gql`
  {
    getPosts {
      _id
      title
      content
      date
      user {
        firstName
        lastName
      }
    }
  }
`

export const getPostQuery = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      _id
      userId
      title
      content
      date
      user{
        firstName
        lastName
      }
      comments {
        _id
        content
        date
        user {
          _id
          firstName
          lastName
        }
        likes {
          userId
        }
      }
      thumbsUp
    }
  }
`