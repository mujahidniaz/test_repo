import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import ItemsPage from "./pages/ItemsPage";
import ProfilePage from "./pages/profilePage";
import CustomersPage from "./pages/CustomersPage";
import AgreementsPage from "./pages/AgreementsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnsavedChangesContext from "./components/useUnsavedChanges";

import "./App.css";
import withAuth from "./components/withAuth";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import Forbidden from "./components/Forbidden";
import RolesPage from "./pages/RolesPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );
  const navigate = useNavigate();
  const handleBeforeUnload = (e) => {
    wrappedNavigate(-1);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // check if token is present in local storage
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // divide by 1000 to convert to seconds
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar */}
        <UnsavedChangesContext.Consumer>
          {({ wrappedNavigate }) => (
            <Sidebar wrappedNavigate={wrappedNavigate} />
          )}
        </UnsavedChangesContext.Consumer>
        {/* <Sidebar /> */}

        {/* Content */}
        <div className="layout-page">
          {/* Navbar */}
          <Navbar />

          {/* Main content */}
          <main>
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/agreements" element={<AgreementsPage />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/customer" element={<CustomersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/password" element={<ChangePasswordPage />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/users" element={<UsersPage />} />
              </Routes>
            </div>
          </main>

          {/* Toast container */}
          <ToastContainer autoClose={70} />
        </div>
      </div>
    </div>
  );
};

export default App;
