import { useUserStore } from '@/store/store';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import CommentCard from './CommentCard';

function IssueCard({issue_id, title, description, username, status, created_at}) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {UserId} = useUserStore();

  const getComments = async() => {
    setIsLoading(true)
    const data = {
      issueId: issue_id
    }
    const req = await fetch("/api/comments/get-issue-comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const res = await req.json();

    console.log(res.response);
    setComments(res.response);
    setIsLoading(false)
  }
  const addComment = async() => {
    setIsLoading(true)
    const data = {
      issueId: issue_id,
      userId: UserId,
      comment: comment
    }
    const req = await fetch("/api/comments/add-issue-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const res = await req.json();

    if(res.type =="success"){
      toast.success("Comment Added successfully");
      setComment("");
    }
    else {
      toast.error("Error occured while adding your comment");

    }
  }
  return (
    <>
    <div className="my-5 card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <div className='flex justify-between items-center flex-row'>

    <h2 className="card-title">{title}</h2>
    <div className="badge badge-secondary">{status}</div>
    </div>
    <p>{description}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>{
        document.getElementById(issue_id).showModal();
        getComments();
      }} className="btn btn-primary">Open Issue</button>
    </div>
  </div>
</div>
{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id={issue_id} className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Issue: {title}</h3>
    <p className="py-4">Description: {description}</p>
    {
      comments.length==0&&isLoading==false?(
        <h1 className='text-center text-3xl font-bold'>No Comments yet.</h1>

      ):null
    }
    {
      comments.map((comment, index)=> {
        return (
          <CommentCard username={comment.username} text={comment.comment_text} created_at={comment.comment_created_at}/>
        )
      })
    }

    <div>
    <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment:</span>
                </label>
                <input
                  type="text"
                  placeholder="Write your comment"
                  className="input input-bordered"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
      <button className='my-10 btn btn-sm btn-primary' onClick={addComment}>Add Comment</button>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  )
}

export default IssueCard