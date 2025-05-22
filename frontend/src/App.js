import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <ToastContainer />
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
