import Link from "next/link";
import React from "react";
import { IoMdCreate } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { BiSolidDollarCircle } from "react-icons/bi";
import { format } from "timeago.js";
const Card = (params) => {


  return (
    <>
      <div className="my-10 card w-80 bg-base-100 shadow-xl mx-auto">
        <div className="card-body">
          <h2 className="card-title">{params.name}</h2>
         <div className="my-5 grid grid-cols-2 gap-5">
         <p className="flex items-center"><IoPersonSharp className="mx-2 text-3xl"/>{params.username}</p>
        
          <p className="flex items-center"><IoMdCreate className="mx-2 text-3xl"/>{format(params.created_at)}</p>
         </div>
          
          <div className="card-actions justify-end">
            <Link href={`/projects/${params.repo_id}`} className="btn btn-primary">View Project</Link>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Card;
