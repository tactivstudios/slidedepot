import React, { Component } from "react";
import axios from "axios";
import "tw-elements";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PresentationCard from "@/components/Users/PresentationCard";
import UploadPresentation from "@/pages/Users/UploadPresentation";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentation: [],
      showModal: false,
      setModalNav: false,
    };
  }

  getPresentation() {
    axios
      .get(`http://127.0.0.1:8000/upload-presentation/`)
      .then((res) =>
        this.setState({
          presentation: res.data,
        })
      )
      .catch((error) => console.log(error));
  }

  getCard() {
    return this.state.presentation.map((item) => (
      <PresentationCard key={item.id} item={item} />
    ));
  }

  displayData() {
    if (this.getCard().length > 0) {
      return this.getCard();
    } else {
      return (
        <div className="grid grid-cols-4 gap-11">
          <div className="w-64 h-64 bg-white border border-black border-dashed box-border rounded-lg">
            <div className="text-black text-center p-5">
              <span className="not-italic font-bold text-lg">
                Upload your first presentation
              </span>
              <p className="not-italic font-normal text-sm items-center">
                Share your presentation. Get feedback and be part of the growing
                community!
              </p>
              <button
                className="static bg-purple-900 border-0 rounded-md shadow-sm px-3 py-2 justify-center items-center text-center"
                type="button"
                onClick={() => this.setState({ showModal: true })}>
                <span className="static text-white text-sm font-medium not-italic">
                  Upload
                </span>
              </button>
              {this.state.showModal && (
                <UploadPresentation
                  closeModal={() => this.setState({ showModal: false })}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    this.getPresentation();
  }

  render() {
    return (
      <div className="container flex flex-col max-h-screen mx-auto px-10">
        <ToastContainer transition={Bounce} />
        <button
          className="static bg-purple-900 border-0 rounded-md shadow-sm w-min px-3 py-2 justify-center items-center text-center"
          type="button"
          onClick={() => this.setState({ setModalNav: true })}>
          <span className="static text-white text-sm font-medium not-italic">
            Upload
          </span>
        </button>
        {this.state.setModalNav && (
          <UploadPresentation
            closeModal={() => this.setState({ setModalNav: false })}
          />
        )}
        <div className="flex m-10 items-center space-x-5">
          <img
            className="static w-32 h-32 p-0 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1635107510862-53886e926b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
            alt="profile_picture"
          />
          <div className="space-y-1 text-black">
            <div className="flex-none static text-2xl not-italic font-semibold">
              Sample Name Sample Name
            </div>
            <div className="flex-none static text-base not-italic font-normal">
              Sample description Sample description
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
            <div className="grid grid-cols-4 gap-11">{this.displayData()}</div>
          </div>
          <div
            className="tab-pane fade"
            id="tabs-saveSlides"
            role="tabpanel"
            aria-labelledby="tabs-profile-tabFill">
            My saved slides
          </div>
          <div
            className="tab-pane fade"
            id="tabs-all"
            role="tabpanel"
            aria-labelledby="tabs-profile-tabFill">
            All slides
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
