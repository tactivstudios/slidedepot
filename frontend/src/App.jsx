import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/components/Authentication/Login/Login";
import Signup from "@/components/Authentication/Signup/Signup";
import Landing from "@/components/Users/components/Landing";
import UserProfile from "@/pages/Users/UserProfile";
import GuestGallery from "@/components/Guest/Gallery/GuestGallery";
import About from "@/components/About/About";
import UserAbout from "@/components/Users/components/UserAbout";
import UserGallery from "@/components/Users/components/UserGallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest */}
        <Route path="/" element={<GuestGallery />} />
        <Route path="/about/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* User */}
        <Route path="/landing/" element={<Landing />} />
        <Route path="/profile/:id/" element={<UserProfile />} />
        <Route path="/user-about/" element={<UserAbout />} />
        <Route path="/user-gallery/" element={<UserGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
