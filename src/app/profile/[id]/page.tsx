import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <h1> Profile</h1>
      <p className="text-4xl">
        User Profile
        <span className="p-2 rounded ml-2 bg-orange-500 text-black"> {params.id}</span>
      </p>
    </div>
  );
};

export default UserProfile;
