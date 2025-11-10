"use client";

import { useActionState } from "react";
import { signup } from "../action/auth";

export default function SignUpPage() {
  const [state, action, pending] = useActionState(signup, {});

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-5xl flex flex-col sm:flex-row bg-white shadow-xl rounded-3xl overflow-hidden border border-yellow-200">
        {/* Left Image Section */}
        <div className="hidden sm:flex sm:w-1/2">
          <img
            src="/sign_up.jpg"
            alt="Travel Image"
            className="object-cover w-full h-full opacity-90"
          />
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-yellow-50">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-center text-gray-800">
            Let's Sign Up
          </h1>

          <form
            action={action}
            className="flex flex-col gap-4 w-full max-w-sm mx-auto"
          >
            {/* Username */}
            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username" // ✅ added
                placeholder="Enter your username"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            {state?.errors?.username && (
              <p className="text-red-400 text-sm text-center font-semibold mt-2 animate-pulse">
                {state?.errors.username}
              </p>
            )}

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email" // ✅ added
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-400 text-sm text-center font-semibold mt-2 animate-pulse">
                {state?.errors.email}
              </p>
            )}

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password" // ✅ added
                placeholder="Create your password"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            {state?.errors?.password && (
              <p className="text-red-400 text-sm text-center font-semibold mt-2 animate-pulse">
                {state?.errors.password}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 bg-black text-amber-50 py-2 rounded-xl hover:bg-gray-900 transition-all duration-200"
              disabled={pending}
            >
              {pending ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
