import React from "react";
import Navbar from "@/components/Guest/Navbar/Navbar";
import {Link} from 'react-router-dom';


function Signup() {

  return (
    <div className="w-screen h-screen grid place-items-center font-Inter">
      <Navbar />
      {/* Signup */}
      <form className="w-96 border border-gray-200 py-10 px-10 rounded-sm shadow-md">
        <h1 className="text-3xl font-semibold mb-2">Sign Up</h1>
        <p className="mb-5">
          Already have an Account?{" "}
          <Link to="/">
            <span className="font-thin-600 underline cursor-pointer text-purple-800">
              Sign in
            </span>
          </Link>        
        </p>
        <div className="flex flex-col">
          <h1 className="my-1 font-semibold text-sm">First Name</h1>
          <input className="form-input" type="text" placeholder="First Name" />
          <h1 className="my-1 font-semibold text-sm">Last Name</h1>
          <input className="form-input" type="text" placeholder="Last Name" />
          <h1 className="my-1 font-semibold text-sm">Email</h1>
          <input className="form-input" type="email" placeholder="Email" />
          <h1 className="my-1 font-semibold text-sm">Password</h1>
          <input
            className="form-input"
            type="password"
            placeholder="Password"
          />
          <div className="flex items-center">
            <input type="checkbox" />
            <h1 className="mx-1 font-normal text-sm">
              I agree to the{" "}
              <span className="underline">Terms and Aggrement</span>{" "}
            </h1>
          </div>
          <button className="btn btn-block btn-default mt-5">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
