import { gql } from 'apollo-boost';

export const addPostMutation = gql`
  mutation(
    $title: String!
    $content: String!
    $tags: String
    $image: Upload
    $imageUrl: String
  ) {
    addPost(
      title: $title
      content: $content
      tags: $tags
      imageUrl: $imageUrl
      image: $image
    )
  }
`;

export const updatePostMutation = gql`
  mutation(
    $postId: ID!
    $title: String!
    $tags: String
    $content: String!
    $image: Upload
    $imageUrl: String
  ) {
    updatePost(
      postId: $postId
      title: $title
      content: $content
      tags: $tags
      imageUrl: $imageUrl
      image: $image
    )
  }
`;

export const deletePostMutation = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const addCommentMutation = gql`
  mutation($content: String!, $postId: ID!) {
    addComment(content: $content, postId: $postId) {
      content
      date
    }
  }
`;
export const deleteCommentMutation = gql`
  mutation($commentId: ID!, $postId: ID!) {
    deleteComment(commentId: $commentId, postId: $postId)
  }
`;

export const likeCommentMutation = gql`
  mutation($commentId: ID!, $postId: ID!) {
    likeComment(commentId: $commentId, postId: $postId)
  }
`;
export const unlikeCommentMutation = gql`
  mutation($commentId: ID!, $postId: ID!) {
    unlikeComment(commentId: $commentId, postId: $postId)
  }
`;

export const likePostMutation = gql`
  mutation($postId: ID!) {
    likePost(postId: $postId)
  }
`;
export const unlikePostMutation = gql`
  mutation($postId: ID!) {
    unlikePost(postId: $postId)
  }
`;
