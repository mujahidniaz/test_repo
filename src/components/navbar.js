import React from "react";
import Logo from "./Logo";
import NavbarContent from "./NavbarContent";

function Navbar() {
  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <NavbarContent />
    </nav>
  );
}

export default Navbar;
