"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successfully!!");
      router.push("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || "An error occurred";
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>

      <div className="flex items-center justify-center flex-col h-full">
        ProfilePage
        <hr />
        <button
          onClick={onLogout}
          className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfilePage;

