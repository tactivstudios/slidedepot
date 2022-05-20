import React from "react";
import { useState } from 'react';
import { useNavigate} from "react-router-dom";

import axios from "@/APIService/axios";
const USER_URL = '/api/edit-account/';

export default function EditUser() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    });
     
    const updateUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    };

    const submitHandler = async (e) => {

    try{
        const response = await axios.put(USER_URL, 
              JSON.stringify({first_name: user.first_name, last_name: user.last_name}), 
              {
                headers: {Authorization:`Token ${localStorage.getItem("token")}`, 'Content-Type': 'application/json'},
              }
            );
            const Token = JSON.stringify(response?.data?.token)
            navigate("/landing/")
      } 
        catch(error){
          console.log(error)
          alert(error) 
          }
    };

  return (
    <div className='w-screen h-screen grid place-items-center font-font'>
      <div className='w-96 border border-gray-200 py-10 px-10 rounded-sm shadow-md'>
        <h1 className='text-3xl font-semibold mb-2'>Account</h1>
        <p className='mb-5 text-left whitespace-pre'>
          Do you want to cancel? {" "} 
          <span className='font-thin-600 underline cursor-pointer text-purple-800' onClick={() => navigate("/landing")}>Cancel</span>
        </p>
        <form className='flex flex-col' onSubmit={submitHandler}>  
            <label className="my-1 font-semibold text-sm" htmlFor="old_password">First Name</label>
            <input 
                className='form-input'
                id="first_name"
                type="text"
                name="first_name"
                required
                autoFocus
                value={user.first_name}
                onChange={updateUser}
            />
            <label className="my-1 font-semibold text-sm" htmlFor="old_password">Last Name</label>
            <input 
                className='form-input'
                id="last_name"
                type="text"
                name="last_name"
                required
                value={user.last_name}
                onChange={updateUser}
            />
            <div>
            <button className='btn btn-block btn-default mt-5'>
              Save Changes
            </button>
            </div>    
        </form>
        </div>
    </div>
  );
};
