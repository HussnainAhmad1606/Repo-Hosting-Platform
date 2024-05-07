"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/store/store";
import { useRouter } from "next/navigation";
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
      setUserId(result.response[0].user_id)
      localStorage.setItem("doc-repo-token", result.token);
      router.push("/")
    }
    else {
      toast.error("Wrong credentials")
    }
  };

  return (
    <>
      <div
        className="hero min-h-screen bg-base-200"
       
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
         
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body" >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  Don't have an account?{" "}
                  <a href="/signup" className="link link-hover">
                    Create One!
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
