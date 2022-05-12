import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_USERS, API_PT_GET_UPLOAD } from "@/APIService/config";
import PresentationCard from "@/components/Users/PresentationCard";
import UploadPresentation from "@/components/Users/UploadPresentation";
import Navbar from "@/components/Users/Navbar";

import "tw-elements";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserProfile() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [presentation, setPresentation] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [isAuth, setIsAuth] = useState(false);

  const { id } = useParams();

  function AuthToken() {
    if (localStorage.getItem("token") !== null) {
      setIsAuth(true);
    }
  }

  function getUserDetails() {
    axios
      .get(`${API_USERS}${id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getPresentation() {
    axios
      .get(`${API_PT_GET_UPLOAD}`)
      .then((res) => {
        setPresentation(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function getCard() {
    return presentation.map((item) => (
      <PresentationCard key={item.presentation_id} item={item} />
    ));
  }

  function displayData() {
    if (getCard().length > 0) {
      return getCard();
    } else {
      return (
        <Fragment>
          {isAuth === true ? (
            <div className="grid grid-cols-4 gap-11">
              <div className="w-64 h-64 bg-white border border-black border-dashed box-border rounded-lg">
                <div className="text-black text-center p-5 space-y-4">
                  <span className="not-italic font-bold text-lg">
                    Upload your first presentation
                  </span>
                  <p className="not-italic font-normal text-sm items-center">
                    Share your presentation. Get feedback and be part of the
                    growing community!
                  </p>
                  <button
                    className="static bg-purple-900 border-0 rounded-md shadow-sm px-3 py-2 justify-center items-center text-center"
                    type="button"
                    onClick={() => setShowModal(true)}>
                    <span className="static text-white text-sm font-medium not-italic">
                      Upload
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </Fragment>
      );
    }
  }

  useEffect(() => {
    AuthToken();
    getPresentation();
    getUserDetails();
  }, []);

  return (
    <div className="container flex flex-col mx-auto px-10 mt-20">
      <ToastContainer transition={Bounce} />
      <div className="flex m-10 items-center space-x-5">
        <img
          className="static w-32 h-32 p-0 rounded-full object-cover"
          src="https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
          alt="profile_picture"
        />
        <div className="space-y-1 text-black">
          <div className="flex-none static text-2xl not-italic font-semibold">
            {first_name + " " + last_name}
          </div>
          <div className="flex-none static text-base not-italic font-normal">
            {email}
          </div>
        </div>
      </div>
      <ul
        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 mx-10"
        id="tabs-tabFill"
        role="tablist">
        <li className="nav-item flex-auto text-center" role="presentation">
          <a
            href="#tabs-mySlides"
            className="nav-link w-full block font-medium text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
            id="tabs-home-tabFill"
            data-bs-toggle="pill"
            data-bs-target="#tabs-mySlides"
            role="tab"
            aria-controls="tabs-mySlides"
            aria-selected="true">
            My Slides
          </a>
        </li>
        <li className="nav-item flex-auto text-center" role="presentation">
          <a
            href="#tabs-saveSlides"
            className="nav-link w-full block font-medium text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-profile-tabFill"
            data-bs-toggle="pill"
            data-bs-target="#tabs-saveSlides"
            role="tab"
            aria-controls="tabs-saveSlides"
            aria-selected="false">
            My Slides ()
          </a>
        </li>
        <li className="nav-item flex-auto text-center" role="presentation">
          <a
            href="#tabs-all"
            className="nav-link w-full block font-medium text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-messages-tabFill"
            data-bs-toggle="pill"
            data-bs-target="#tabs-all"
            role="tab"
            aria-controls="tabs-all"
            aria-selected="false">
            All
          </a>
        </li>
      </ul>
      <div className="tab-content m-10" id="tabs-tabContentFill">
        <div
          className="tab-pane fade show active"
          id="tabs-mySlides"
          role="tabpanel"
          aria-labelledby="tabs-home-tabFill">
          <div className="grid grid-cols-4 gap-11">{displayData()}</div>
        </div>
        <div
          className="tab-pane fade"
          id="tabs-saveSlides"
          role="tabpanel"
          aria-labelledby="tabs-profile-tabFill"></div>
        <div
          className="tab-pane fade"
          id="tabs-all"
          role="tabpanel"
          aria-labelledby="tabs-profile-tabFill"></div>
      </div>
      <Navbar />
      {showModal ? (
        <UploadPresentation closeModal={() => setShowModal(false)} />
      ) : null}
    </div>
  );
}

export default UserProfile;
