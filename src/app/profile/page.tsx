"use client"
import React from "react";
import axios from "axios";
import Link from "next/link";



const ProfilePage = () => {

  const onLogout = async () => {
    try {
      const response = await axios.put("/api/users/logout")
    } catch (err: any

    ) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col h-full">
      ProfilePage
      <hr />
      <button 
      onClick={onLogout}
      className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
