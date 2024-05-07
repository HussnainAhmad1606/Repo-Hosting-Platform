"use client"
import React from "react";
import { FaBars } from "react-icons/fa";

import { toast } from "react-hot-toast";

import Link from "next/link";
import {useUserStore} from "@/store/store";
const Navbar = () => {

  const {setIsLogin} = useUserStore();

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("lms-token");
    toast.success("Log Out Success");

  }

  const {isLogin, Username, UserId} = useUserStore();
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="drawer w-10 lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn mr-3 drawer-button">
              <FaBars />
            </label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-1/2 min-h-full bg-base-200 text-base-content">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Explore Projects</Link>
              </li>

              {
                isLogin?(
                  <li>
                  <Link href={`/projects/${UserId}`}>My Projects</Link>
                </li>

                ):null
              }

             
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">DocHost</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 hidden lg:flex md:flex">
          <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Explore Projects</Link>
              </li>
              {
                isLogin?(
                  <li>
                  <Link href={`/projects/user/${UserId}`}>My Projects</Link>
                </li>

                ):null
              }
          </ul>

          {
            isLogin==false?(
              <>
              <Link className="btn btn-primary mx-2" href="/login">Login</Link>
              <Link className="btn btn-primary" href="/signup">Signup</Link>
              </>

            ):(
              <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`https://ui-avatars.com/api/?name=${Username}&background=random`} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/dashboard"} className="justify-between">
                  Welcome, {Username}
                </Link>
              </li>
              <li>
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
