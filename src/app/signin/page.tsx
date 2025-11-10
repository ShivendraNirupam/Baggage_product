"use client";

import { useActionState } from "react";
import { signin } from "../action/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signin, {});

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-5xl flex flex-col sm:flex-row-reverse bg-white shadow-xl rounded-3xl overflow-hidden border border-yellow-200">
        {/* Right Image Section */}
        <div className="hidden sm:flex sm:w-1/2">
          <img
            src="/sign_up.jpg"
            alt="Login Illustration"
            className="object-cover w-full h-full opacity-90"
          />
        </div>

        {/* Left Form Section */}
        <div className="w-full sm:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-yellow-50">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-center text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in to continue your journey.
          </p>

          <form
            action={action}
            className="flex flex-col gap-4 w-full max-w-sm mx-auto"
          >
            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email" 
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-400 text-sm text-center font-semibold mt-2 animate-pulse">
                {state.errors.email}
              </p>
            )}

            {/* Password Field */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password" // 
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            {state?.errors?.password && (
              <p className="text-red-400 text-sm text-center font-semibold mt-2 animate-pulse">
                {state.errors.password}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 bg-black text-amber-50 py-2 rounded-xl hover:bg-gray-900 transition-all duration-200"
              disabled={pending}
            >
              {pending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-yellow-700 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
