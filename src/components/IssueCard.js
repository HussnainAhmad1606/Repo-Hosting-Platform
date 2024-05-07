import React from 'react'

function IssueCard({issue_id, title, description, usrename, status, created_at}) {
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
      <button onClick={()=>document.getElementById(issue_id).showModal()} className="btn btn-primary">Open Issue</button>
    </div>
  </div>
</div>
{/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id={issue_id} className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Issue: {title}</h3>
    <p className="py-4">Description: {description}</p>
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