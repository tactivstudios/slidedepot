import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_GET_CATEGORY, API_PT_UPLOAD } from "@/APIService/config";
import { div_style_two } from "@/components/Users/ModalBox";

import cookie from "react-cookies";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadPresentationModal({ closeModal }) {
  const [presentation_id, setPresentationID] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail_image, setThumbnailImage] = useState(null);
  const [tbnl_preview, setTbnlPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]);
  const [slctdCategory, setSlctdCategory] = useState("");

  function generateID(id) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 6;
    const prefix = "PST";
    let random = "";

    for (let i = 0; i < length; i++) {
      const suffix = Math.floor(Math.random() * characters.length);
      random += characters[suffix];
    }
    id = prefix + random;
    setPresentationID(id);
  }

  useEffect(() => {
    // Function
    generateID();
    document.getElementById("delete_thumbnail").style.display = "none";

    // API
    axios
      .get(`${API_GET_CATEGORY}`)
      .then((res) => {
        let categories = [];

        for (let i = 0; i < res.data.length; i++) {
          let data = res.data[i];
          let category = {};

          category["id"] = data.id;
          category["name"] = data.name;

          categories.push(category);
        }
        setCategory(categories);
      })
      .catch((err) => alert(err));
  }, []);

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }
  function onSelectedCategory(e) {
    setSlctdCategory(e.target.value);
  }
  function onChangeFile(e) {
    setFile(e.target.files[0]);
  }
  function onChangeThumbnailImage(e) {
    if (e.target.files[0]) {
      setThumbnailImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setTbnlPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    document.getElementById("thumbnail_view").style.display = "block";
    document.getElementById("upload_button").style.display = "none";
    document.getElementById("delete_thumbnail").style.display = "block";
  }

  function delete_thumbnail(e) {
    e.preventDefault();
    setThumbnailImage("");
    setTbnlPreview("");
    document.getElementById("thumbnail_view").style.display = "none";
    document.getElementById("upload_button").style.display = "flex";
    document.getElementById("delete_thumbnail").style.display = "none";
    document.getElementById("thumbnail_image").value = null;
  }

  function onSubmit(e) {
    e.preventDefault();

    let presentation_data = new FormData();

    presentation_data.append("presentation_id", presentation_id);
    presentation_data.append("file", file);
    presentation_data.append("thumbnail_image", thumbnail_image);
    presentation_data.append("title", title);
    presentation_data.append("category", slctdCategory);

    axios
      .post(`${API_PT_UPLOAD}`, presentation_data, {
        headers: {
          "X-CSRFToken": cookie.load("csrftoken"),
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success(`${title} uploaded successfully!`, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box sx={div_style_two}>
      <div className="relative w-full mb-20">
        <div className="static text-black text-2xl font-normal not-italic mb-2">
          <span>Upload Presentation</span>
        </div>
        <div className="absolute text-slate-600 text-base font-normal not-italic">
          <span>Share your presentation to the community</span>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="relative">
          <label
            htmlFor="set_file"
            className="setfiles flex flex-row bg-white border box-border rounded-md w-full p-16 justify-center items-center cursor-pointer outline-none">
            <input
              type="file"
              id="set_file"
              name="set_file"
              onChange={onChangeFile}
            />
            {file === null ? (
              <span className="absolute text-gray-300 text-base font-normal text-center">
                Drag and Drop file <br /> or <br />
                <span className="text-purple-900 hover:underline">Browse</span>
              </span>
            ) : (
              <span className="text-purple-900 hover:underline">Re-upload</span>
            )}
          </label>
        </div>
        <div className="relative w-full my-7">
          <div className="relative w-full mb-5">
            <div className="static text-slate-600 text-base font-normal not-italic mb-5">
              <span>
                Thumbnail (Optional) Upload your preferred thumbnail for the
                presentation. Recommended aspect ratio is 16:9.
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <img
                className="w-full aspect-video"
                src={tbnl_preview}
                alt="thumbnail_view"
                id="thumbnail_view"
                hidden={true}
              />
            </div>
            <label
              id="upload_button"
              htmlFor="thumbnail_image"
              className="thumbnail flex flex-row bg-purple-900 border-0 rounded-md shadow-sm justify-center items-center w-full py-2 cursor-pointer outline-none">
              <input
                type="file"
                id="thumbnail_image"
                name="thumbnail_image"
                onChange={onChangeThumbnailImage}
              />
              <span className="static text-white text-sm font-medium leading-5 not-italic">
                Upload
              </span>
            </label>
            <button
              id="delete_thumbnail"
              className="flex flex-row bg-purple-900 border-0 rounded-md shadow-sm justify-center items-center w-full my-5 py-2 cursor-pointer outline-none"
              onClick={delete_thumbnail}
              hidden={true}>
              <span className="static text-white text-sm font-medium leading-5 not-italic">
                Delete thumbnail
              </span>
            </button>
          </div>
        </div>
        <div className="relative w-full my-10">
          <div className="relative w-full mb-5">
            <div className="static text-black text-sm font-medium not-italic mb-1">
              <span>Title</span>
            </div>
            <div className="relative">
              <input
                className="static flex bg-white text-black placeholder-gray-300 border rounded-md w-full p-2 px-3 outline-none"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={title}
                onChange={onChangeTitle}
                required
              />
            </div>
          </div>
          <div className="relative w-full">
            <div className="static text-black text-sm font-medium not-italic mb-1">
              <span>Category</span>
            </div>
            <div className="relative">
              <select
                className="static flex bg-white border rounded-md w-full p-2 px-3 outline-none cursor-pointer"
                type="text"
                id="category"
                name="category"
                value={slctdCategory}
                onChange={onSelectedCategory}
                required>
                <option value="" disabled selected>
                  Choose Category
                </option>
                {category.map((categories, cat) => (
                  <option key={cat} value={categories.name}>
                    {categories.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="relative flex w-full items-end justify-end">
          <button
            className="static flex-row bg-gray-200 border-0 rounded-md mr-2 px-5 py-2 justify-center items-center text-center"
            type="button"
            onClick={() => closeModal(false)}>
            <span className="static text-black text-sm font-normal leading-5 not-italic">
              Cancel
            </span>
          </button>
          <button
            className="static flex-row bg-purple-900 border-0 rounded-md shadow-sm px-5 py-2 justify-center items-center text-center"
            type="submit">
            <span className="static text-white text-sm font-medium leading-5 not-italic">
              Continue
            </span>
          </button>
        </div>
      </form>
    </Box>
  );
}

export default UploadPresentationModal;
