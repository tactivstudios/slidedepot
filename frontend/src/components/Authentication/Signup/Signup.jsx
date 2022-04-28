import React from 'react';
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect} from "react";

import axios from "@/APIService/axios";
import Navbar from '@/components/Guest/Navbar/Navbar';
const REGISTER_URL = '/api/users/';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //this will happen when the component loads and set to focus to username input
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password])

  useEffect(() => {
    const result = first_name;
    console.log(result);
    console.log(first_name);
    setFirstName(result);
  }, [first_name])

  useEffect(() => {
    const result = last_name;
    console.log(result);
    console.log(last_name);
    setLastName(result);
  }, [last_name])

  useEffect(() => {
    setErrMsg('');
  }, [email, password, first_name, last_name])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2){
      setErrMsg("Unable to sign up with provided credentials.");
      return;
    }
    try{
      const response = await axios.post(REGISTER_URL, 
            JSON.stringify({email: email, password: password, first_name: first_name, last_name: last_name}), 
            {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true
            }
          );
          console.log(response.data);
          console.log(response.accessToken)
          console.log(JSON.stringify(response)); 
          setSuccess(true);

          setEmail('');
          setPassword('');
    } catch(err){
      if(!err?.response){
        setErrMsg('No server Response');
      }else if (err.response?.status === 400){
        setErrMsg('Unable to log in with provided credentials.');
      }else if (err.response?.status === 401){
        setErrMsg('Unauthorized');
      }else {
        setErrMsg('Register Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <div className='w-screen h-screen grid place-items-center font-font'>
        {success ? (
            <div>
              <h1>Success!</h1>
                  {/* <span onClick={() => navigate("/")}>Sign In</span> */}
            </div>
         ) : (
          <div className='w-96 border border-gray-200 py-10 px-10 rounded-sm shadow-md'>
            <Navbar />
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className='text-3xl font-semibold mb-2'>Sign up</h1>
            <p className='mb-5'>
                Already have an acount? {" "}
                    <span className='font-thin-600 underline cursor-pointer text-purple-800' onClick={() => navigate("/")}>Sign In</span>
            </p>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                  <label className='my-1 font-semibold text-sm' htmlFor="first_name">
                        First Name: 
                      </label>
                    <input 
                      className='form-input'
                      placeholder='First Name'
                      type="text" 
                      id="first_name"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setFirstName(e.target.value)}
                      value={first_name}
                      required
                    /> 
                    
                  <label className='my-1 font-semibold text-sm' htmlFor="last_name">
                        Last Name: 
                      </label>
                    <input 
                      className='form-input'
                      placeholder='Last Name'
                      type="text" 
                      id="last_name"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setLastName(e.target.value)}
                      value={last_name}
                      required
                    /> 
                   
                    <label className='my-1 font-semibold text-sm' htmlFor="username">
                        Email: 
                        <span className={validEmail ? "valid" : "hide"} />
                        <span className={validEmail || !email ? "hide" : "invalid"} />
                      </label>
                    <input 
                      className='form-input'
                      placeholder='Email'
                      type="email" 
                      id="username"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby = "uidnote"
                      onFocus = {() => setPasswordFocus(true)}
                      onBlur = {() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    </p>

                    <label className='my-1 font-semibold text-sm' htmlFor="password">
                        Password: 
                        <span className={validPassword ? "valid" : "hide"} />
                        <span className={validPassword || !password ? "hide" : "invalid"} />
                      </label>
                    <input 
                      className='form-input'
                      placeholder='Password'
                      type="password" 
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      aria-invalid={validPassword ? "false" : "true"}
                      aria-describedby = "pwdnote"
                      onFocus = {() => setUserFocus(true)}
                      onBlur = {() => setUserFocus(false)}
                    />
                    <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    </p>
                    <div className='flex items-center'>
                      <input type="checkbox" />
                      <h1 className='mx-1 font-normal text-sm'>
                        I agree to the {" "}
                        <span className='underline'>Terms and Condition</span>
                      </h1>
                    </div>
                    <button className='btn btn-block btn-default mt-5' disabled = {!validEmail || !validPassword ? true : false}>
                      Sign Up
                    </button>
                </form>
          </div>
        )}
    </div>
  )
}

export default Signup;




