import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DownloadIcon, BookmarkIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import Comment from "@/components/Comment/Comment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};

function GalleryCard({
  presentation,
  image,
  title,
  firstname,
  lastname,
  avatar,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg h-72 relative cursor-pointer font-font"
        onClick={handleOpen}
      >
        <img src={image} alt="" className="h-full object-cover" />
        <div className="flex items-center gap-6 px-5 py-2 absolute left-0 bottom-0 w-full bg-white">
          <img
            src={avatar}
            alt="avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-sm">{firstname + " " + lastname}</p>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        classes={"!outline-none"}
      >
        <Box sx={style}>
          <img src={image} alt="" className="w-full h-[500px] object-cover" />
          <div className="font-font py-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={avatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h1 className="font-bold text-3xl">{title}</h1>
                <p className="text-gray-400">
                  {firstname + " " + lastname} • March 17, 2022
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray">
              <DownloadIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => navigate("/login")}
              />
              <BookmarkIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
          <Comment presentation={presentation} />
        </Box>
      </Modal>
    </>
  );
}

export default GalleryCard;
