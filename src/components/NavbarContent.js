import React from "react";
import Notifications from "./Notifications";
import User from "./User";
import withAuth from "./withAuth";

function NavbarContent() {
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
    <div
      className="navbar-nav-right d-flex align-items-center"
      id="navbar-collapse"
    >
      <div
        id="toggle-sidebar"
        className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
        onClick={handleClick}
      >
        <a className="nav-item nav-link px-0 me-xl-4">
          <i className="bx bx-menu bx-sm"></i>
        </a>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center"></div>
        </div>
      </div>

      <User />
    </div>
  );
}

export default withAuth(NavbarContent);
