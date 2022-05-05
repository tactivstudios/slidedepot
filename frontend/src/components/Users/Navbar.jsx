import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/images/slide-depot.png";
import UploadPresentationModal from "@/components/Users/UploadPresentationModal";

import "tw-elements";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      success;
      setIsAuth(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setSuccess(false);
    navigate("/");
  };

  return (
    <nav>
      {isAuth === true ? (
        <Fragment>
          <div className="fixed top-0 left-0 right-0 w-screen py-4 bg-white font-font">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between space-x-10 sticky z-50">
              <div
                className="cursor-pointer"
                onClick={() => navigate("/user-gallery/")}
              >
                <img src={Logo} alt="logo" />
              </div>
              <div className="flex items-center gap-10">
                <Link to="/user-gallery/">Gallery</Link>
                <Link to="/user-about/">About</Link>
                <img
                  className="dropdown-toggle h-10 w-10 rounded-full object-cover cursor-pointer"
                  src="https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
                  alt="profile_pic"
                  id="dropdownMenuButton1tx"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul
                  className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                  aria-labelledby="dropdownMenuButton1tx"
                >
                  <li>
                    <a
                      className=" dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/profile/")}
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer"
                      href="#"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
                <button
                  className="static bg-purple-900 border-0 rounded-md shadow-sm w-min px-3 py-2 justify-center items-center text-center"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  <span className="static text-white text-sm font-medium not-italic">
                    Upload
                  </span>
                </button>
                {showModal && (
                  <UploadPresentationModal
                    closeModal={() => setShowModal(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="fixed top-0 left-0 right-0 w-screen py-4 bg-white font-font">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between space-x-10 sticky z-50">
              <div className="cursor-pointer" onClick={() => navigate("/")}>
                <img src={Logo} alt="logo" />
              </div>
              <div className="flex items-center gap-10">
                <Link to="/">Gallery</Link>
                <Link to="/about/">About</Link>
                <button
                  className="text-purple-900"
                  onClick={() => navigate("/signup/")}
                >
                  Sign up
                </button>
                <button
                  className="btn-default rounded-md px-4 py-1 text-white"
                  onClick={() => navigate("/login/")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </nav>
  );
}

export default Navbar;
