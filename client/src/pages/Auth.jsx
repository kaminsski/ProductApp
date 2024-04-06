import React, { useState } from "react";
import { loginAction, registerAction } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const { authForm } = useSelector((state) => state.authForm);

  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChangeHandle = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  const authFunc = () => {
    if (!authForm.authForm) {
      dispatch(loginAction(authData));
    } else {
      dispatch(registerAction(authData));
    }
  };

  return (
    <>
    

   
    <div className=" w-full flex justify-center relative pt-32 pb-80 min-h-screen">

    <img className="w-full h-full absolute top-0 bottom-0 right-0 left-0 -z-10" src="background.jpeg
      " alt="" />


      <div className="w-full md:w-2/3 lg:w-1/3 bg-gray-200 p-3 rounded-lg h-[350px] flex flex-col justify-between">
        <h1 className="text-2xl text-gray-700 font-bold">
          {authForm.authForm ? "Register" : "Login"}{" "}
        </h1>
        <div className="flex flex-col space-y-3 my-5">
          <input
            value={authData.username}
            name="username"
            onChange={onChangeHandle}
            type="text"
            placeholder="Username"
            className=" input"
          />
          {authForm.authForm && (
            <input
              value={authData.email}
              name="email"
              onChange={onChangeHandle}
              type="text"
              placeholder="Email"
              className="input"
            />
          )}
          <input
            value={authData.password}
            name="password"
            onChange={onChangeHandle}
            type="password"
            placeholder="Password"
            className="input"
          />
        </div>
        <div className=" text-red-500 text-sm cursor-pointer mb-4">
          {" "}
          {authForm.authForm ? (
            <span
              onClick={() =>
                dispatch({ type: "FORM", payload: { authForm: false } })
              }
            >
              Login
            </span>
          ) : (
            <span
              onClick={() =>
                dispatch({ type: "FORM", payload: { authForm: true } })
              }
            >
              Register
            </span>
          )}{" "}
        </div>

        <div
          onClick={authFunc}
          className="cursor-pointer w-full p-2 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-800 "
        >
          {authForm.authForm ? "Register" : "Login"}{" "}
        </div>
      </div>
    </div>
    </>
  );
}
