import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FunnelTitle } from "devextreme-react/funnel";
import { make_auth_get_request } from "../domain/APIUtils";

function User() {
  const [currentRole, setCurrentRole] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [roles, setRoles] = useState([]);
  const userRef = useRef();
  const navigate = useNavigate();

  const getCurrentRole = (roles) => {
    const curr = localStorage.getItem("currentRole");

    if (curr !== null && curr !== undefined) {
      return JSON.parse(curr);
    } else {
      if (roles && roles.length > 0) {
        return roles[0];
      } else {
        return {}; // Return an empty object if roles is not available yet
      }
    }
  };

  async function get_profile() {
    const { response, error } = await make_auth_get_request("accounts/profile");
    if (response) {
      if (response.data.roles.length > 0) {
        setRoles(response.data.roles);
      } else {
        localStorage.removeItem("currentRole");
      }
    } else {
      localStorage.removeItem("currentRole");
    }
  }

  useEffect(() => {
    get_profile();
  }, []);

  useEffect(() => {
    const setActiveRole = () => {
      const curr = localStorage.getItem("currentRole");

      if (curr !== undefined && curr !== null) {
        const parsedCurr = JSON.parse(curr);
        const exists = roles.some((r) => r.id === parsedCurr.id);
        if (exists) {
          setCurrentRole(parsedCurr);
        } else {
          localStorage.removeItem("currentRole");
          if (roles && roles.length > 0) {
            setCurrentRole(roles[0]);
            localStorage.setItem("currentRole", JSON.stringify(roles[0]));
          }
        }
      } else {
        if (roles && roles.length > 0) {
          setCurrentRole(roles[0]);
          localStorage.setItem("currentRole", JSON.stringify(roles[0]));
        }
      }
    };

    if (roles.length > 0) {
      setActiveRole();
    }
  }, [roles]);

  const handleRoleClick = (role) => {
    if (role.id !== getCurrentRole(roles).id) {
      localStorage.setItem("currentRole", JSON.stringify(role));
      setCurrentRole(role); // Add this line to update the currentRole state
      navigate("/"); // Add this line to navigate to the home page
      window.location.reload(); // Add this line to reload the window
    }
  };

  const handleOutsideClick = (event) => {
    if (userRef.current && !userRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    // add more logic here if needed
  };

  const handlePasswordChange = () => {
    navigate("/password");
    // add more logic here if needed
  };

  const handleProfile = () => {
    navigate("/profile");
    // add more logic here if needed
  };

  // Decode JWT token and extract user information
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwt_decode(token);
  const { first_name, last_name } = decodedToken;

  return (
    <ul
      className="navbar-nav flex-row align-items-center ms-auto"
      style={{ alignContent: "right" }}
    >
      <li className="nav-item navbar-dropdown dropdown-user dropdown">
        <a
          className="nav-link dropdown-toggle hide-arrow"
          href="javascript:void(0);"
          data-bs-toggle="dropdown"
        >
          <div className="avatar avatar-online">
            <img
              src="main/assets/img/user.svg"
              className="w-px-40 h-auto rounded-circle"
            />
          </div>
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#" onClick={handleProfile}>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar avatar-online">
                    <img
                      src="main/assets/img/user.svg"
                      alt
                      className="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <span className="fw-semibold d-block">
                    {first_name} {last_name}
                  </span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <div className="dropdown-divider"></div>
          </li>
          <li>
            <li>
              <a className="dropdown-item">
                <i className="bx bx-shield me-2"></i>
                <span className="align-middle">Roles</span>
              </a>
            </li>
            <ul className="sub">
              {roles.map((r) => (
                <li
                  key={r.id}
                  className={`dropdown-item ${
                    getCurrentRole(roles).id === r.id ? "active" : ""
                  }`}
                  onClick={() => handleRoleClick(r)}
                >
                  <a>
                    <small className="align-middle">{r.name}</small>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="dropdown-divider"></div>
          </li>
          <li>
            <a className="dropdown-item" onClick={handleProfile}>
              <i className="bx bx-user me-2"></i>
              <span className="align-middle">My Profile</span>
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={handlePasswordChange}>
              <i className="bx bx-lock me-2"></i>
              <span className="align-middle">Change Password</span>
            </a>
          </li>

          <li>
            <div className="dropdown-divider"></div>
          </li>
          <li>
            <a className="dropdown-item" onClick={handleSignOut}>
              <i className="bx bx-power-off me-2"></i>
              <span className="align-middle">Log Out</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
}
export default User;
