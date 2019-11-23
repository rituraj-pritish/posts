import {gql} from 'apollo-boost'

export const signupMutation = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      token
    }
  }
`

export const addPostMutation = gql`
  mutation($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      _id
      title
      content
      user {
        firstName
        lastName
      }
      date
    }
  }
`

export const deletePostMutation = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId) 
  }
`

export const addCommentMutation = gql`
  mutation($content: String!,$postId: ID!) {
    addComment(content: $content, postId: $postId) {
      content
      date
    }
  }
`
export const deleteCommentMutation = gql`
  mutation($commentId: ID!, $postId: ID!) {
    deleteComment(commentId: $commentId, postId: $postId) 
  }
`

export const likeCommentMutation = gql`
  mutation($commentId: ID!, $postId: ID!) {
    likeComment(commentId: $commentId, postId: $postId)
  }
`
export const unlikeCommentMutation = gql`
  mutation($commentId: ID!, $postId: ID!) {
    unlikeComment(commentId: $commentId, postId: $postId)
  }
`