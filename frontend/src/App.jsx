import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "@/components/About/About";
import Login from "@/components/Authentication/Login/Login";
import Signup from "@/components/Authentication/Signup/Signup";
import GuestGallery from "@/components/Guest/Gallery/GuestGallery";
import Landing from "@/components/Users/Navbar/Landing";
import "@/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<GuestGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
