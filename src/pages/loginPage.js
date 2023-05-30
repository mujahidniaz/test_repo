import React, { useEffect, useState } from "react";
import LoginForm from "../components/loginForm";
import "../css/LoginPage.css";
function LoginPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/style.css";
    document.head.appendChild(link);
    document.body.style.backgroundImage = "url(/images/bg.jpg)";
    document.body.classList.add("img");
    document.body.classList.add("js-fullheight");
    document.body.style.height = `${window.innerHeight}px`;
    return () => {
      document.body.style.height = "auto";
      document.body.classList.remove("img");
      document.body.classList.remove("js-fullheight");
      document.body.classList.add("bg-gray-100");
      document.head.removeChild(link);
    };
  }, []);
  return (
    <div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-6">
              <h2 className="heading-section">Login</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
