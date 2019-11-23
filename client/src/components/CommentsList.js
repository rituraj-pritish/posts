import React from 'react'

import Comment from './Comment'

const CommentsList = ({comments, postId}) => {
  
  return (
    comments.map(comment => (
      <Comment key={comment._id} postId={postId} {...comment} />
    ))
  )
}

export default CommentsList
