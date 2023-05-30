import TwoFAPage from "./TwoFAPage";
import jwt_decode from "jwt-decode";
import { confirm } from "./Confirmation";
import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  make_auth_get_request,
  make_auth_post_request,
} from "../domain/APIUtils";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";
import { API_BASE_URL } from "../domain/constants";
function Profile() {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("currentRole");

  const decodedToken = jwt_decode(token);
  const { first_name, last_name, email } = decodedToken;
  const jrole = JSON.parse(role);
  const navigate = useNavigate();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorValue, setTwoFactorValue] = useState("");
  const [qrCodeImageUrl, setQRCodeImageUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [authURL, setAuthURL] = useState({});
  const fetchQRCodeImageUrl = async () => {
    const { response, error } = await make_auth_get_request(
      "otp/qrcode/",
      navigate
    );
    if (response) {
      const parsedUrl = new URL(response.data.url, API_BASE_URL);

      const data = {
        username: decodeURIComponent(parsedUrl.pathname.split(":")[1]),
        secret: parsedUrl.searchParams.get("secret"),
        issuer: parsedUrl.searchParams.get("issuer"),
      };

      setAuthURL(data);

      setQRCodeImageUrl(response.data.image_url);
    } else {
      alert(error.response.data.detail);
      console.log(error);
    }
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = async (otp, e) => {
    e.preventDefault();
    const { response, error } = await make_auth_post_request(
      "otp/qrcode/",
      {
        two_factor_token: otp,
      },
      navigate
    );
    if (response) {
      setTwoFactorValue("");
      setTwoFactorEnabled(true);
      setShowModal(false);
    } else {
      alert(error.response.data.detail);
      console.log(error);
      // handle error here
    }
  };
  const handleTwoFactorToggle = async (e) => {
    if (twoFactorEnabled) {
      const disableConfirm = await confirm("Do you want to disable 2FA?");
      if (disableConfirm) {
        try {
          const { response, error } = await make_auth_get_request(
            "otp/disable/",
            navigate
          );
          if (response) {
            setTwoFactorEnabled(false);
            navigate("/profile");
          } else {
            console.log(error);
            alert(error.response.data.detail);
          }
        } catch (error) {
          console.log(error);
          alert("Failed to disable 2FA.");
        }
      }
    } else {
      fetchQRCodeImageUrl();
      setShowModal(true);
    }
  };
  async function get_two_fa_status() {
    const { response, error } = await make_auth_get_request(
      "accounts/profile",
      navigate
    );
    if (response) {
      setTwoFactorEnabled(response.data.is_otp_enabled);
    } else {
      console.log("error is ", error);
    }
  }
  useEffect(() => {
    get_two_fa_status();
  }, []);
  return (
    <div className="row">
      {showModal ? (
        <div>
          <TwoFAPage
            show={showModal}
            onHide={handleClose}
            onConfirm={handleConfirm}
            qrCodeImageUrl={qrCodeImageUrl}
            authURL={authURL}
          />
        </div>
      ) : (
        <>
          <div>
            <div className="user-avatar-section col-md-3">
              <div className=" d-flex align-items-center flex-column">
                <img
                  className="img-fluid rounded my-4"
                  src="img\user.svg"
                  height="110"
                  width="110"
                  alt="User avatar"
                />
                <div className="user-info text-center">
                  <h4 className="mb-2">
                    {first_name} {last_name}
                  </h4>
                  <span className="badge bg-label-secondary">{jrole.name}</span>
                </div>
              </div>
            </div>

            <h5 className="pb-2 border-bottom mb-4">Details</h5>
            <div className="info-container">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <span className="fw-bold me-2">Email:</span>
                  <span>{email}</span>
                </li>
                <li className="mb-3">
                  <span className="fw-bold me-2">Status:</span>
                  <span className="badge bg-label-success">Active</span>
                </li>
                <li className="mb-3">
                  <span className="fw-bold me-2">Role:</span>
                  <span>{jrole.name}</span>
                </li>
              </ul>
              <div className="col-md-4">
                <button
                  className={`btn b-full ${
                    twoFactorEnabled ? "btn-danger" : "btn-primary"
                  }`}
                  onClick={handleTwoFactorToggle}
                >
                  {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
