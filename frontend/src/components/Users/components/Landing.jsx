import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Users/Navbar";

function Landing() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setSuccess(false);
    navigate("/");
  };
  return (
    <div className="justify-center">
      <Navbar />
    </div>
  );
}

export default Landing;
