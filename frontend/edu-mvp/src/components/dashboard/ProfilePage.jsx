import React from "react";

const ProfilePage = () => {
  // Placeholder profile info
  const profile = {
    name: "Jane Doe",
    role: "Educator",
    email: "jane.doe@example.com",
    joined: "March 2024",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-[#426ED8] font-semibold">Profile</h2>
      <div>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Joined:</strong> {profile.joined}</p>
      </div>
      <button className="bg-[#426ED8] text-white px-4 py-2 rounded hover:bg-[#365bb3]">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfilePage;
