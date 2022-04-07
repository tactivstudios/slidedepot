import React from "react";
import Navbar from "@/components/Guest/Navbar/Navbar";
import Picture from "@/assets/images/about-pic.jpg";

function About() {
  return (
    <div className="font-font">
      <Navbar />
      {/* About */}
      <div className="flex h-screen">
        <div className="flex flex-col pt-32 px-20">
          <h2 className="text-xl font-bold text-purple-900">About</h2>
          <h1 className="text-4xl font-bold my-10">How Slide Depot happened</h1>
          <p className="text-lg">
            Slides have been a part of people’s lives, whether for academic,
            business, or personal presentations. With our love for creating
            slides, we could not just hide them from the crowd. <br /> <br />
            Not only do slides educate, but they can also entertain us. Hence,
            we have created a platform to share our slides with the rest of the
            world! Moreover, we also want others to showcase their proudly-made
            slides. <br /> <br />
            Join us in our journey in creating and spreading more knowledge and
            happiness through Slide Depot!
          </p>
        </div>
        <img src={Picture} alt="Image" className="w-2/5 object-cover" />
      </div>
    </div>
  );
}

export default About;
