import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

import GalleryCard from "@/components/GalleryCard";
import Navbar from "@/components/Guest/Navbar/Navbar";

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
            <GalleryCard
              image="https://static.remove.bg/remove-bg-web/b27c50a4d669fdc13528397ba4bc5bd61725e4cc/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
              title="Gestalt Principle"
              firstname="John"
              lastname="Laderna"
              avatar="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
            />
            <GalleryCard
              image="https://www.incimages.com/uploaded_files/image/1920x1080/getty_655998316_2000149920009280219_363765.jpg"
              title="Gestalt Principle"
              firstname="John"
              lastname="Laderna"
              avatar="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
            />
            <GalleryCard
              image="https://static.remove.bg/remove-bg-web/b27c50a4d669fdc13528397ba4bc5bd61725e4cc/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
              title="Gestalt Principle"
              firstname="John"
              lastname="Laderna"
              avatar="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
            />
            <GalleryCard
              image="https://static.remove.bg/remove-bg-web/b27c50a4d669fdc13528397ba4bc5bd61725e4cc/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
              title="Gestalt Principle"
              firstname="John"
              lastname="Laderna"
              avatar="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestGallery;
