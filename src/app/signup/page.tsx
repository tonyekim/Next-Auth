"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);
      console.log("Sign up success", response.data);
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);

      toast.error(err.message);
    } finally {
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Sign Up"}</h1>

      <div className="mb-6">
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full px-3 py-2 placeholder-text-[#717171] bg-white rounded-md focus:outline-none  text-[#263238] placeholder:text-black"
          placeholder="username"
        />
      </div>
      <div className="mb-6">
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-3 py-2 placeholder-text-[#717171] bg-white rounded-md focus:outline-none  text-[#263238] placeholder:text-black"
          placeholder="email"
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-3 py-2 placeholder-text-[#717171] bg-white rounded-md focus:outline-none  text-[#263238] placeholder:text-black"
          placeholder="password"
        />
      </div>

      <button
        onClick={onSignUp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
      >
        {buttonDisabled ? "No Sign up" : " Sign up"}
      </button>

      <Link href="/login">Visit login page</Link>
    </div>
  );
};

export default SignupPage;
