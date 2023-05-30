import React, { useEffect } from "react";
import withAuth from "../components/withAuth";
import Forbidden from "../components/Forbidden";
const AccessDenied = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <Forbidden />
      </div>
    </div>
  );
};

export default AccessDenied;
