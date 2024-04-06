import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getRole = () => {
  const user = JSON.parse(localStorage.getItem("auth"));

  return user ? user.role : null;
};

export default function AdminLayout(props) {
  const userRole = getRole();
  if (userRole === "admin") {
    return (
      <>
        <Header></Header>
        <ToastContainer />

        {props.children}
        <Footer></Footer>
      </>
    );
  } else {
    return (window.location.href = "/");
  }
}
