module.exports = {
  type: `

    type Post {
      _id: ID!
      imageUrl: String
      title: String!
      content: String!
      userId: ID!
      user: User!
      views: Int!
      tags: [String]
      likes: [Clap] #userId
      comments: [Comment]
      date: String!
      trending: Boolean
    }

    type Comment {
      _id: ID
      content: String
      userId: ID
      user: User
      likes: [Like]
      date: String
    }

    type Like {
      _id: ID!
      userId: ID!
      user: User!
    }

    type Clap {
      _id: ID
      userId: ID
    }
  `,

  query: `
    getTotalPages : Int
    getPosts(page: Int): [Post]
    getPost(postId: ID!): Post
    getPostsByUserId: [Post]
    getCommentsOfPost(postId: ID!): [Comment]
    getLikesOfPost(postId: ID!): [Clap]
  `,

  mutation: `
    addPost(
      title: String!
      content: String!
      tags: String
      image: Upload
      imageUrl: String
    ): Boolean

    updatePost(
      title: String!
      content: String!
      tags: String
      postId: ID!
      image: Upload
      imageUrl: String
    ): Boolean

    deletePost(postId: ID!): Boolean

    addComment(content: String!, postId: ID!): Comment

    updateComment(content: String!, postId: ID!, commentId: ID!): Comment

    deleteComment(postId: ID!, commentId: ID!): Boolean

    likeComment(postId: ID!, commentId: ID!): Boolean

    unlikeComment(postId: ID!, commentId: ID!): Boolean

    likePost(postId: ID!): Boolean

    unlikePost(postId: ID!): Boolean
  `
};
