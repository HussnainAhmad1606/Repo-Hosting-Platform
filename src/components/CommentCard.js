import { format } from 'timeago.js'
import React from 'react'

function CommentCard({username, text, created_at}) {
  return (
    <div className="my-5 chat chat-start">
 
  <div className="chat-header">
    Comment by: {username}
    <time className="ml-3 text-xs opacity-50">{format(created_at)}</time>
  </div>
  <div className="my-3 chat-bubble">{text}</div>
</div>
  )
}

export default CommentCard