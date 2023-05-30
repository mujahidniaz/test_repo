import React, { useEffect } from "react";
import "../css/homePage.css";
import withAuth from "../components/withAuth";
import Dashboard from "../components/dashboard";
const HomePage = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Dashboard />
    </div>
  );
};

export default withAuth(HomePage);
