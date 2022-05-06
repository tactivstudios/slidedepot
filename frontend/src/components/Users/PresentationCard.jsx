import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL, API_PT_DETAILS } from "@/APIService/config";

import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TrashIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tw-elements";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "scroll",
  p: 4,
};

export default function PresentationCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const date_posted = props.item.date_posted;

  function handleDelete(e) {
    e.preventDefault();

    axios
      .delete(`${API_PT_DETAILS}${props.item.presentation_id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.info(`Presentation "${props.item.title}" deleted!`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .then(handleClose)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg relative h-72 cursor-pointer"
        onClick={handleOpen}>
        <img
          src={props.item.thumbnail_image}
          alt="thumbnail"
          className="h-full object-cover"
        />
        <div className="flex items-center gap-6 px-5 py-2 absolute left-0 bottom-0 w-full bg-white">
          <img
            src="https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
            alt="user_avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h1 className="text-black text-lg font-semibold">
              {props.item.title}
            </h1>
            <p className="text-sm">Sample name</p>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={"!outline-none"}>
        <Box sx={style}>
          <iframe
            src={`${BACKEND_URL}${props.item.file}`}
            width="100%"
            height="100%"
            frameBorder="0"></iframe>
          <div className="font-font mt-10 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={props.item.thumbnail_image}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-black font-bold text-3xl">
                  {props.item.title}
                </h1>
                <p className="text-gray-400">
                  {props.item.title} •{" "}
                  {dayjs(date_posted).format("MMMM DD, YYYY")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-black">
              <TrashIcon
                className="h-7 w-7 cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
              />
              <div
                className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="exampleModalCenter"
                tabindex="-1"
                aria-labelledby="exampleModalCenterTitle"
                aria-modal="true"
                role="dialog">
                <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                  <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                      <h5
                        className="text-xl font-medium leading-normal text-gray-800"
                        id="exampleModalScrollableLabel">
                        Alert!
                      </h5>
                      <button
                        type="button"
                        className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body relative p-4">
                      <p>Are you sure you want to delete this presentation?</p>
                    </div>
                    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out"
                        data-bs-dismiss="modal">
                        Close
                      </button>
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        data-bs-dismiss="modal"
                        onClick={handleDelete}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm inline-flex font-normal px-5 py-2 bg-[#F5F3FF] text-[#4C1D95] rounded-full">
            {props.item.category}
          </div>
        </Box>
      </Modal>
    </>
  );
}
