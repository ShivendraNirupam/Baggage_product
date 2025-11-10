"use client";

import { logout } from "@/app/action/auth";
import { LogOut, User } from "lucide-react";


export default function SettingsPage() {
  

  // Mock user data — replace with real data later
  const user = {
    name: "Shivendra Nirupam",
    email: "nirupamgeek@gmail.com",
    joined: "Nov 2025",
  };

  return (
    <div className="h-screen  flex justify-center items-center bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl w-[90%]">
      <div className="w-full  max-w-2xl bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl border border-yellow-200 p-8 flex flex-col gap-8 items-center">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800">
          Settings ⚙️
        </h1>

        {/* User Info Card */}
        <div className="w-full bg-white rounded-2xl shadow-md p-6 flex items-center gap-6 border border-gray-200">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-yellow-700 shadow-inner">
            <User size={40} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">
              Joined {user.joined}
            </p>
          </div>
        </div>

        {/* Account Settings Section */}
        <div className="w-full flex flex-col gap-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Account Details
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={user.name}
              readOnly
              className="flex-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none"
            />
            <input
              type="email"
              value={user.email}
              readOnly
              className="flex-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none"
            />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-95"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
