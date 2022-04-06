import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "@/assets/images/slide-depot.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-screen py-4 bg-white font-font">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between space-x-10 sticky z-50">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={Logo} alt="logo" />
        </div>
        <div className="flex items-center gap-16">
          <NavLink to="/">Gallery</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/signup" className="text-purple-900">
            Signup
          </NavLink>
          <button
            onClick={() => navigate("/login")}
            className="btn-default rounded-md px-4 py-1 text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
