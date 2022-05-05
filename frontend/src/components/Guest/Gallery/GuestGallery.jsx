import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

import GalleryCard from "@/components/GalleryCard";
import Navbar from "@/components/Guest/Navbar/Navbar";
import axios from "@/APIService/axios";
import { API_PT_UPLOAD } from "@/APIService/config";

const tabs = [
  "All",
  "Science",
  "Technology",
  "Business",
  "Arts and Design",
  "Education",
];

function GuestGallery() {
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState("");
  const [presentation, setPresentation] = useState([]);

  useEffect(() => {
    getPresentation();
  }, []);

  function getPresentation() {
    axios
      .get(`${API_PT_UPLOAD}`)
      .then((res) => {
        setPresentation(res.data);
        console.log("data is: ", res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  console.log("presentation is: ", presentation);
  return (
    <div className="font-font">
      <div className="w-screen h-64 grid place-items-center mt-9">
        <Navbar />
        {/* Text */}
        <div className="font-bold  tracking-tight text-4xl ">
          <h1>Browsing Presentations had</h1>
          <div className="mx-14 text-align-center">
            <h1>never been this fun</h1>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="grid place-items-center">
        <div className="border py-2 px-4 w-2/5 mb-10 rounded-md">
          <form className="">
            <div className="relative flex items-center">
              <SearchIcon className="w-5 h5 absolute text-gray-400" />
              <input
                className="px-7 items-center border-gray-500 outline-none"
                type="text"
                placeholder="Search"
              />
            </div>
          </form>
        </div>
      </div>

      {/* TABS */}
      <div>
        <div className="max-w-screen-xl mx-auto flex items-center justify-evenly">
          {tabs.map((tab, index) => (
            <div
              className={`border-b-2 border-gray-200 flex-1 py-2 text-center cursor-pointer transition-all duration-200 ease-out ${
                index === activeTab && "!border-purple-400 !border-b-2"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <p>{tab}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-screen">
        <div className="max-w-screen-xl mx-auto py-10 flex items-end justify-end">
          <select
            name=""
            id=""
            className="border border-gray-200 px-6 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Gallery */}
      <div className="p-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {presentation.map((item) => {
              console.log("item is: ", item.presentation_id);
              return (
                <GalleryCard
                  key={item.presentation_id}
                  presentation={item.presentation_id}
                  image={item.thumbnail_image}
                  title={item.title}
                  author={item.author}
                  avatar="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestGallery;
