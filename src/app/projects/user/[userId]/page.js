"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const {setIsLogin, setUserId, UserId, setEmail, setUsername} = useUserStore();
  const getProjects = async(event) => {
    
    const data = {
        userId: UserId
    }
    console.log("Form submitted with values:", { email, password });
   
    const req = await fetch("/api/repositories/get-user-repo-view",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

    if (result.type == "success"){
      setProjects(result.response)
    }
    
  };


  useEffect(() => {
    getProjects();
  }, [])
  

  return (
    <>
    <div className="my-10 flex justify-center items-center">
    <h1 className="text-4xl font-bold">My Projects</h1>
    <Link href={"/projects/create-new"} className="mx-5 btn btn-sm btn-primary">Create New Project</Link>
    </div>
   <div className="grid grid-cols-3">
    {
        projects.map((project,index)=> {
            return (
                <Card key={index} repo_id={project.repo_id} username={project.username} name={project.repository_name} description={project.description} created_at={project.created_at}/>

            )

        })
    }
   </div>
    </>
  );
};

export default Login;
