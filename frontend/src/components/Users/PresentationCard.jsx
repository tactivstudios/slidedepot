import React from "react";

export default function PresentationCard(props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg relative h-72 cursor-pointer">
      <img
        src={props.item.thumbnail_image}
        alt="thumbnail"
        className="h-full object-cover"
      />
      <div className="flex items-center gap-6 px-5 py-2 absolute left-0 bottom-0 w-full bg-white">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          alt="user_avatar"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div>
          <h1 className="text-lg font-semibold">{props.item.title}</h1>
          <p className="text-sm">Sample name</p>
        </div>
      </div>
    </div>
  );
}
