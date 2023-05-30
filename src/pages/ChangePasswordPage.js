import React, { useEffect } from "react";
import withAuth from "../components/withAuth";
import ChangePassword from "../components/ChangePassword";
const ChangePasswordPage = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h2 className="my-3">Change Password</h2>
      <ChangePassword />
    </div>
  );
};

export default withAuth(ChangePasswordPage);
