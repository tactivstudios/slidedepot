import axios from "@/APIService/axios";
import { API_COMMENTS } from "@/APIService/config";
import React, { useEffect, useState } from "react";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    axios
      .get(`${API_COMMENTS}`)
      .then((res) => {
        setComments(res.data);
        console.log("data is: ", res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div>
      {comments.map((item) => (
        <div>
          <h1>{item.comment_body}</h1>
        </div>
      ))}
    </div>
  );
}

export default Comments;
