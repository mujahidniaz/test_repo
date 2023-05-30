import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  const handleClick = () => {
    if (
      document.documentElement.className ==
      "light-style layout-menu-fixed layout-menu-100vh"
    ) {
      document.documentElement.className =
        "light-style layout-menu-fixed layout-menu-100vh layout-menu-expanded";
    } else {
      document.documentElement.className =
        "light-style layout-menu-fixed layout-menu-100vh";
    }
  };

  return (
    <div className="app-brand demo">
      <a href="/" className="app-brand-link">
        <span className="app-brand-logo demo">
          <img alt="logo" src="main/img/logo.png" width="200"></img>
        </span>
      </a>

      <a
        onClick={handleClick}
        className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
      >
        <i className="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
    </div>
  );
};

export default Logo;
