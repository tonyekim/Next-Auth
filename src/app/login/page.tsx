"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true); 
      const response = await axios.post("/api/users/login", user);
      console.log("Sign up success", response.data);
      router.push("/profile");
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
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
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none"
      >
        Login
      </button>

      <Link href="/signup">
      Visit Signup page
      </Link>
    </div>
  );
};

export default LoginPage;
