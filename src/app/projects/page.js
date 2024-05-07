"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, SetUsername] = useState("");
  const {setIsLogin, setUserId, setEmail, setUsername} = useUserStore();
  const handleSubmit = async(event) => {
    
    const data = {

      username: email,
  
      password: password
    }
    console.log("Form submitted with values:", { email, password });
   
    const req = await fetch("http://localhost:3000/api/auth/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

    if (result.type == "success"){
      toast.success("Logged In Success");
      setIsLogin(true);
      setUsername(result.response[0].username)
      setEmail(result.response[0].email)
      setUserId(result.response[0].id)
      localStorage.setItem("lms-token", result.token);
      router.push("/")
    }
    else {
      toast.error("Wrong credentials")
    }
  };

  return (
    <>
    <div className="my-10 flex justify-center items-center">
    <h1 className="text-4xl font-bold">Projects</h1>
    <Link href={"/projects/create-new"} className="mx-5 btn btn-sm btn-primary">Create New Project</Link>
    </div>
   <div>
    <Card/>
   </div>
    </>
  );
};

export default Login;
