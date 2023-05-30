import React, { useState, useRef, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Logo from "./Logo";
import UnsavedChangesContext from "./useUnsavedChanges";

function Sidebar(wrappedNavigate) {
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [activeLi, setActiveLi] = useState(null);
  const liRef = useRef(null);

  const toggleAccountSettings = () => {
    setIsAccountSettingsOpen(!isAccountSettingsOpen);
    setActiveLi("parent"); // activate the parent li when the account settings link is clicked
  };

  const handleLinkClick = () => {
    setActiveLi(null); // deactivate the parent li when any other link is clicked
    document.documentElement.className =
      "light-style layout-menu-fixed layout-menu-100vh";
  };

  return (
    <UnsavedChangesContext.Consumer>
      {({ wrappedNavigate }) => (
        <aside
          id="layout-menu"
          className="layout-menu menu-vertical menu bg-menu-theme"
        >
          <Logo />
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">MENU</span>
          </li>
          <div className="menu-inner-shadow"></div>
          <ul className="menu-inner py-1">
            <SidebarLink
              className="menu-link"
              to="/"
              handler={handleLinkClick}
              wrappedNavigate={wrappedNavigate}
            >
              <i className="menu-icon tf-icons bx bxs-dashboard"></i>
              Analytics dashboard
            </SidebarLink>

            <SidebarLink
              className="menu-link"
              to="/agreements"
              handler={handleLinkClick}
              wrappedNavigate={wrappedNavigate}
            >
              <i className="menu-icon tf-icons bx bxs-file-doc"></i>
              Agreements
            </SidebarLink>

            <SidebarLink
              className="menu-link"
              to="/items"
              handler={handleLinkClick}
              wrappedNavigate={wrappedNavigate}
            >
              <i className="menu-icon tf-icons bx bxs-cart"></i>
              Items
            </SidebarLink>

            <SidebarLink
              className="menu-link"
              to="/customer"
              handler={handleLinkClick}
              wrappedNavigate={wrappedNavigate}
            >
              <i className="menu-icon tf-icons bx bxs-user"></i>
              Customers
            </SidebarLink>

            {/* <SidebarLink
          className="menu-link"
          to="/contact"
            handler={handleLinkClick} wrappedNavigate={wrappedNavigate}
        >
          <i className="menu-icon tf-icons bx bxs-contact"></i>
          Contacts
        </SidebarLink> */}
            <li
              id="parent"
              className={`menu-item ${activeLi === "parent" ? "active" : ""} ${
                isAccountSettingsOpen ? "open" : ""
              }`}
              onClick={() => setActiveLi("parent")}
            >
              <a
                href="#"
                className="menu-link menu-toggle"
                onClick={toggleAccountSettings}
              >
                <i className="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Account Settings">Account Settings</div>
              </a>
              <ul className="menu-sub">
                <SidebarLink
                  className="menu-link"
                  to="/users"
                  handler={handleLinkClick}
                  wrappedNavigate={wrappedNavigate}
                  parentLi={
                    activeLi === "parent"
                      ? document.getElementById("parent")
                      : null
                  }
                >
                  <div>Users</div>
                </SidebarLink>
                <SidebarLink
                  className="menu-link"
                  to="/roles"
                  handler={handleLinkClick}
                  wrappedNavigate={wrappedNavigate}
                  parentLi={
                    activeLi === "parent"
                      ? document.getElementById("parent")
                      : null
                  }
                >
                  <div>Roles</div>
                </SidebarLink>
              </ul>
            </li>
          </ul>
        </aside>
      )}
    </UnsavedChangesContext.Consumer>
  );
}

function SidebarLink({
  to,
  children,
  wrappedNavigate,
  handler,
  parentLi,
  ...props
}) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  useEffect(() => {
    console.log(parentLi); // log the parentLi element whenever it changes
    console.log(parentLi?.classList); // log the classList of parentLi
  }, [parentLi]);
  const handleSidebarLinkClick = (event) => {
    event.preventDefault();
    handler();
    wrappedNavigate(to);
  };

  return (
    <li className={`menu-item ${isActive ? "active" : ""}`}>
      <Link
        className="menu-link"
        to={to}
        onClick={handleSidebarLinkClick}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}

export default Sidebar;
