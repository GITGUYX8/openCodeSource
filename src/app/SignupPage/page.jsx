"use client"
import { useState } from "react";
import Link from "next/link";
import { useFirebase } from "@/context/firebase"

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.438,36.333,48,31,48,24C48,22.659,47.862,21.35,47.611,20.083z"></path>
  </svg>
);

function SignupPage() {
  const firebase = useFirebase()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSignUp = (e) => {
    e.preventDefault();
    firebase.signupUser(email, password);
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Create an Account
        </h1>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-zinc-400">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-zinc-700"></div>
          <span className="flex-shrink mx-4 text-zinc-500 text-sm">OR</span>
          <div className="flex-grow border-t border-zinc-700"></div>
        </div>
        <button
          onClick={firebase.signinGoogle}
          className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white hover:bg-zinc-100 text-zinc-700 font-semibold rounded-md shadow-md transition-colors"
        >
          <GoogleIcon />
          Sign up with Google
        </button>
        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/LoginPage" className="font-medium text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main >
  )
}

export default SignupPage