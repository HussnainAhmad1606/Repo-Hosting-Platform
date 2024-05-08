import React from 'react'
import { format } from 'timeago.js'

function CommitCard({username, message, created_at}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <div>

    <h2 className="card-title">Commit by: {username}</h2>
    <p>{message}</p>
    </div>
    <kbd className="kbd">Comitted {format(created_at)}</kbd>
  
  </div>
</div>
  )
}

export default CommitCard