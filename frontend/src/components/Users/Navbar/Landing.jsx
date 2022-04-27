import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const logout = () =>{
    localStorage.removeItem("Token");
    setSuccess(false);
    navigate("/");
  }
  return (
    <div className="justify-center">
      <h1 className="text-2xl text-center font-bold underline">Welcome User</h1>
      <div>
          <h1>You are Logged in!</h1>
          <button onClickCapture={logout}>Logout</button>
      </div>
      <button
        className="btn-default rounded-md px-4 py-1 text-white"
        onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default Landing;
