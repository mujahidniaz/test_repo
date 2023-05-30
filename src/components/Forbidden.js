import React, { Component } from "react";
import "../css/forbidden.css";
function Forbidden() {
  return (
    <div className="error_main">
      <div className="lock"></div>
      <div className="message">
        <h3>Access to this page is restricted</h3>
        <p>Please check with the admin if you believe this is a mistake.</p>
      </div>
    </div>
  );
}

export default Forbidden;
