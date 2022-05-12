import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import axios from "@/APIService/axios";
const PASSWORD_URL = '/api/change-password/';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function ChangePassword() {
    const navigate = useNavigate();
    const errRef = useRef();
    
    const [user, setUser] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
    });
    const validPassword = useState(false);
    const passwordFocus = useState(false);

    const [errMsg, setErrMsg] = useState('');
    
    useEffect(() => { 
      setErrMsg('');
    }, [user.new_password, user.confirm_password])

    useEffect(() => {
      const result = PWD_REGEX.test(user.new_password);
      console.log(result);
      console.log(user.new_password);
    }, [user.new_password])
    
    const updatePass = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    };
    const submitHandler = async (e) => {
    
    e.preventDefault();
    if(user.new_password != user.confirm_password){
        setErrMsg("Password Mismatch!");
        return;
    }else{

    try{
        const response = await axios.put(PASSWORD_URL, 
              JSON.stringify({old_password: user.old_password, new_password: user.new_password}), 
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
      }
    };

  return (
    <div>
      <div>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={submitHandler}>  
            <label className="my-1 font-semibold text-sm">Old Password</label>
            <input 
                id="old_password"
                type="password"
                name="old_password"
                required
                autoFocus
                value={user.old_password}
                onChange={updatePass}
            />
            <label className="my-1 font-semibold text-sm">New Password</label>
            <input 
                id="new_password"
                name="new_password"
                type="password"
                onChange={updatePass}
                aria-invalid={validPassword ? "false" : "true"}
                value={user.new_password}
                required
            />
            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
            <span className='text-sm'>
              
               4 to 8 character. <br />
              Must include uppercase and lowecase letters, a number and a special character. <br />
              Allowed special characters: <span aria-label='exclamation'>!</span>
              <span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span>
              <span aria-label='dollar sign'>$</span>
              
            </span>
            </p>            
            <label className="my-1 font-semibold text-sm">Confirm Password</label>
            <input 
                id="confirm_password"
                name="confirm_password"
                type="password"
                onChange={updatePass}
                value={user.confirm_password}
                required
            />
            <button className="btn-default rounded-md px-4 py-1 text-white">
              Update
            </button>
        </form>
        </div>
    </div>
  );
};
