import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App({text, repoId, userId }) {
  const [documentText, setDocumentText] = useState("");
  const [message, setMessage] = useState("");

  const addCommit = async(event) => {
    const data = {
      repoId: repoId,
      message: message,
      userId: userId,
      documentText: documentText
  
    }
   
    const req = await fetch("/api/commits/add-commit",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result)

    if(Response.type=="success"){
      toast.success("Commit added");

    }
    
    
  };
    const handleEditorChange = (content, editor) => {
      setDocumentText(content);
        console.log(text);
        console.log('Content was updated:', content);
        // You can update the state or perform other actions with the content
      };
  return (
    <>
    <Editor
      apiKey='qecngtthmhtbskcydhthx27wme520d9um93gi04azdu5xg18'
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue={text?.document_text}
      onEditorChange={handleEditorChange}
      />
    
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="my-10 btn btn-sm btn-primary" onClick={()=>document.getElementById('commit').showModal()}>Commit</button>
<dialog id="commit" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <div className="form-control">
                <label className="label">
                  <span className="label-text">Commit Message:</span>
                </label>
                <input
                  type="text"
                  placeholder="Message"
                  className="input input-bordered"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button onClick={addCommit} className='my-5 btn btn-sm btn-primary'>Commit</button>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      </>
  );
}