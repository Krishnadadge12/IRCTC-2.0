import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import React from "react";
import "../Components/Layout/Layout.css";

const PublicLayout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
