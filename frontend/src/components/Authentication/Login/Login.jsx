import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Guest/Navbar/Navbar";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen grid place-items-center font-font">
      <Navbar />
      {/* Login */}
      <form className="w-96 border border-gray-200 py-10 px-10 rounded-sm shadow-md">
        <h1 className="text-3xl font-semibold mb-2">Log in</h1>
        <p className="mb-5">
          Don't have an account?{" "}
          <span
            className="font-thin-600 underline cursor-pointer text-purple-800"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
        <div className="flex flex-col">
          <h1 className="my-1 font-semibold text-sm">Email Address</h1>
          <input className="form-input " type="text" placeholder="Email" />
          <h1 className="my-1 font-semibold text-sm">Password</h1>
          <input
            className="form-input"
            type="password"
            placeholder="Password"
          />
          <div className="flex items-center mt-3">
            <input type="checkbox" />
            <h1 className="mx-1 font-semibold text-sm">Remember me</h1>
          </div>
          <button
            className="btn btn-block btn-default mt-5"
            onClick={() => navigate("/landing")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
