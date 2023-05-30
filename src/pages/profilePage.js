import React, { useEffect } from "react";
import withAuth from "../components/withAuth";
import Profile from "../components/profile";
const ProfilePage = () => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <Profile />
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
