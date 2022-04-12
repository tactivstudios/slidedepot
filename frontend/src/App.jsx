import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/components/Authentication/Login/Login";
import Signup from "@/components/Authentication/Signup/Signup";
import Landing from "@/components/Users/Navbar/Landing";
import UserProfile from "@/pages/Users/UserProfile";
import UploadPresentation from "@/pages/Users/UploadPresentation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/landing/" element={<Landing />} />

        <Route path="/profile/" element={<UserProfile />} />
        <Route path="/upload/" element={<UploadPresentation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;