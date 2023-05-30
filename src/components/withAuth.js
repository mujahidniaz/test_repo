import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState } from "react";
const withAuth = (Component) => {
  const AuthRoute = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken"); // check if token is present in local storage
    if (token) {
      const decodedToken = jwt_decode(token);

      var isAuthenticated = true;
      const currentTime = Date.now() / 1000; // divide by 1000 to convert to seconds
      if (decodedToken.exp < currentTime) {
        isAuthenticated = false;
        localStorage.removeItem("accessToken");
        return navigate("/login");
      }
      if (isAuthenticated) {
        return <Component />;
      } else {
        return navigate("/login");
      }
    } else {
      return navigate("/login");
    }
  };

  return AuthRoute;
};

export default withAuth;
