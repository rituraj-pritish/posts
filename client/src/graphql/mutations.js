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
  mutation($title: String!, $content: String!, $tags: String) {
    addPost(title: $title, content: $content, tags: $tags) {
      _id
      title
      content
      tags
      user {
        firstName
        lastName
      }
      date
    }
  }
`

export const updatePostMutation = gql`
  mutation($postId: ID!,$title: String!,$tags: String, $content: String!) {
    updatePost(postId: $postId, title: $title, content: $content, tags: $tags) 
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

export const addClapMutation = gql`
  mutation($postId: ID!) {
    addClap(postId: $postId)
  }
`
export const removeClapMutation = gql`
  mutation($postId: ID!) {
    removeClap(postId: $postId)
  }
`