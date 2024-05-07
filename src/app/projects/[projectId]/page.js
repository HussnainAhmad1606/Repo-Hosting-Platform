"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
import { format } from "timeago.js";

import IssueCard from "@/components/IssueCard"
const Login = ({params}) => {
    const {projectId} = params;
  const router = useRouter();
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [project, setProject] = useState({});
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const {setIsLogin, setUserId, UserId, setEmail, setUsername} = useUserStore();
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
  }, [])
  

  return (
    <div className="flex justify-center items-center flex-col">
    <h1 className="my-10 text-4xl font-bold">Document Repo Info</h1>

    <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Title: {project?.repository_name}</h2>
    <p>Description: {project?.description}</p>
   <p>Created by: {project?.username}</p>
   <p>Created at: {format(project?.created_at)}</p>
  </div>
</div>
    
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
