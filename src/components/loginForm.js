import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { make_post_request } from "../domain/APIUtils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(""); // define otp

  // define handleChange
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  useEffect(() => {
    // check if the user is authenticated
    const userToken = localStorage.getItem("accessToken");
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    navigate("/");
    window.location.reload();
  }

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = async (otp, e) => {
    const { response, error } = await make_post_request(
      "login/token/",
      {
        email: email,
        password: password,
        two_factor_token: otp,
      },
      navigate
    );
    console.log(response);
    switch (response.status) {
      case 200: {
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        navigate("/");
        window.location.reload();
        break;
      }
      default: {
        toast.error("Invalid OTP code");
        break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (showModal) {
        handleConfirm(otp);
        return;
      }
      const { response, error } = await make_post_request(
        "login/token/",
        {
          email: email,
          password: password,
        },
        navigate
      );
      if (error) {
        if (error.response.status === 400) {
          setShowModal(true);
        }
      }

      switch (response.status) {
        case 200: {
          const { access, refresh } = response.data;
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          navigate("/");
          window.location.reload();
          break;
        }
        case 400: {
          setShowModal(true);
          break;
        }

        default: {
          // toast.error(response.message);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTwoFactorChange = (e) => {
    setTwoFactorToken(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <div className="password-input-wrapper">
            <input
              id="password-field"
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={handleTogglePassword}
              className="field-icon toggle-password"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {showModal && (
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter 6 Digit OTP from Authentication App"
              value={otp}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <button type="submit" className="form-control btn btn-primary px-3">
            Sign In
          </button>
        </div>
        <div className="form-group d-md-flex">
          <div className="w-50">
            <label className="checkbox-wrap checkbox-primary">
              Remember Me
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="w-50 text-md-right">
            <a href="#" style={{ color: "#fff" }}>
              Forgot Password
            </a>
          </div>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default LoginForm;
