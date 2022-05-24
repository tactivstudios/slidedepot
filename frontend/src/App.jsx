import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/components/Authentication/Login/Login";
import Signup from "@/components/Authentication/Signup/Signup";
import Landing from "@/components/Users/Navbar/Landing";
import UserProfile from "@/pages/Users/UserProfile";
import GuestGallery from "@/components/Guest/Gallery/GuestGallery";
import About from "@/components/About/About";
import ChangePassword from "@/components/settings/ChangePassword";
import AuthContext from "@/context/AuthProvider";
import ProtectedLogin from "@/components/Authentication/ProtectedLogin";
import EditUser from "@/components/settings/ChangeEmal"

function App() {
  const setAuth = React.useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestGallery />} />
        <Route {...<ProtectedLogin/>} path="/login/" element={<Login />}auth={setAuth.auth} />
        <Route path="/about/" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing/" element={<Landing />} />
        <Route path="/profile/:id/" element={<UserProfile />} />
        <Route path="/account/" element={<EditUser />} />
        <Route path="/changepassword/" element={<ChangePassword />} />
        {/* <Route path="/profile/" element={<UserProfile />} /> */}
      </Routes>


    </BrowserRouter>
  );
}

export default App;
