"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
import { format } from "timeago.js";
import Editor from "@/components/Editor"
import IssueCard from "@/components/IssueCard";


import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import CommitCard from "@/components/CommitCard";
const Login = ({params}) => {

    const {projectId} = params;
  const router = useRouter();
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [project, setProject] = useState({});
  const [issues, setIssues] = useState([]);
  const [commits, setCommits] = useState([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const {setIsLogin, setUserId, UserId, setEmail, setUsername} = useUserStore();

  const starRepo = async () => {

  }
  const getProject = async(event) => {
    
    const data = {
        repoId: projectId
    }
   
    const req = await fetch("/api/repositories/get-single-repo",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

    if (result.type == "success"){
      setProject(result.response[0])
    }
    
  };

  const getIssues = async(event) => {
    
    const data = {
        repoId: projectId
    }
   
    const req = await fetch("/api/issues/get-issues",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

    if (result.type == "success"){
      setIssues(result.response)
    }

    setIsLoading(false)
    
  };


  const getCommits = async(event) => {
    
    const data = {
        repoId: projectId
    }
   
    const req = await fetch("/api/commits/get-commits",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

    if (result.type == "success"){
      setCommits(result.response)
    }

    setIsLoading(false)
    
  };
  const addIssue = async(event) => {
    
    const data = {
        title: title,
        description: description,
        userId: UserId,
        repoId: projectId
    }
   
    const req = await fetch("/api/issues/add-issue",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

    if (result.type == "success"){
      toast.success("Issue Added");
    }

    setIsLoading(false)
    
  };


  useEffect(() => {
    getProject();
    getIssues();
    getCommits();
  }, [])
  

  return (
    <div className="flex justify-center items-center flex-col">
<div className="w-full flex justify-evenly items-center flex-row">

    <h1 className="my-10 text-4xl font-bold">Document Repo Info</h1>
    <FaRegStar onClick={starRepo} className="text-4xl"/>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>{commits.length} Commits</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Commits on: {project?.repository_name}</h3>
    {
      commits.map((commit, index)=> {
        return (
          <CommitCard username={commit.username} message={commit.commit_message} created_at={commit.commit_date
          }/>
        )
      })
    }
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    {/* <FaStar onClick={starRepo} className="text-4xl"/> */}
</div>

    <div className="my-10 card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Title: {project?.repository_name}</h2>
    <p>Description: {project?.description}</p>
   <p>Created by: {project?.username}</p>
   <p>Created at: {format(project?.created_at)}</p>
  </div>
</div>


<Editor text={commits[commits.length-1]}/>
    
<div className="my-10">
    <div className="flex justify-center items-center">

    <h1 className="text-3xl text-center font-bold">Issues</h1>
    {issues.length!=0?(
        <p className="font-bold mx-5 text-3xl">({issues.length})</p>
        ):null
    }
    </div>

    {
        isLoading==false&&issues.length==0?(
            <h1 className="text-center my-10">No Issues Found</h1>
        ):null
    }

    {
        issues.map((issue, index)=> {
            return (
                <>
                <IssueCard issue_id={issue.issue_id} key={index} title={issue.title} description={issue.description} username={issue.reporter_username} status={issue.status} created_at={issue.created_at}/>
              
                </>
            )
        })
    }

<h1 className="text-3xl text-center my-10 font-bold">Add New Issue</h1>

<label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Issue Title:</span>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
   
    <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Issue Description:</span>
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
 </label>
<div className="flex justify-center items-center">

 <button onClick={addIssue} className="my-5 btn btn-sm btn-primary">Add Issue</button>

</div>




</div>
</div>
    
  );
};

export default Login;
