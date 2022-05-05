import React, { useState } from "react";
import Comments from "@/components/Comment/Comments";
import { API_COMMENTS } from "@/APIService/config";
import axios from "@/APIService/axios";

function Comment({ presentation }) {
  const [comment, setComment] = useState("");

  console.log(presentation);
  function addComment() {
    console.log(comment, presentation);
    axios
      .post(
        `${API_COMMENTS}`,
        JSON.parse(
          JSON.stringify({
            comment_body: comment,
            presentation: presentation,
            author: "Sample User",
          })
        )
      )
      .then(() => {
        alert("success");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <div className="flex gap-5">
        <img
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
          alt=""
          className="h-10 w-10 rounded-full"
        />
        <div className="border py-2 px-4 w-full mb-5 rounded-md">
          <form>
            <div className="relative flex items-center">
              <input
                type="text"
                className="px-1 border-gray-500 outline-none"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-1 w-full place-content-end">
        <button
          className="text-center justify-center items-end btn-default rounded-md px-4 py-1"
          onClick={addComment}
        >
          Comment
        </button>
      </div>
      <Comments />
    </div>
  );
}

export default Comment;
