import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="justify-center">
      <h1 className="text-2xl text-center font-bold underline">Welcome User</h1>
      <button
        className="btn-default rounded-md px-4 py-1 text-white"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}

export default Landing;
