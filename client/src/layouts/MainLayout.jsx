import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../container/Container";
import { ToastContainer } from "react-toastify";

export default function MainLayout(props) {
  return (
    <>
      <Container>
        <Header></Header>
        <ToastContainer />

      </Container>

      <Container>
        <Container>
          <div className="">{props.children}</div>
        </Container>
      </Container>

      <Footer></Footer>
    </>
  );
}
