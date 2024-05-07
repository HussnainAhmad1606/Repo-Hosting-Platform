"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {UserId, setIsLogin, setUserId, setEmail, setUsername} = useUserStore();
  const handleSubmit = async(event) => {
    
    const data = {

      name: name,
      description: description,
      userId: UserId
  
    }
   
    const req = await fetch("http://localhost:3000/api/repositories/create-repo",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

    if (result.type == "success"){
      toast.success("Repository Created");
      router.push("/")
    }
    else {
      toast.error("Error while creating repo")
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
    <h1 className="text-4xl font-bold">Create New Project</h1>
    <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Repo Title:</span>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
   
    <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Repo Description:</span>
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
 </label>

 <button onClick={handleSubmit} className="my-10 btn btn-sm btn-primary">Create</button>
   
    </div>
  );
};

export default Login;
