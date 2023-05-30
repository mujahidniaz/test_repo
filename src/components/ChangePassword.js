import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
import { make_auth_post_request } from "../domain/APIUtils";
import { API_BASE_URL } from "../domain/constants";
import { toast } from "react-toastify";
import UnsavedChangesContext from "./useUnsavedChanges";
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );
  const navigate = useNavigate();
  const onHide = async (e) => {
    navigate(-2);
  };
  const handleSubmit = async (e) => {
    setUnsavedChanges(false);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.", {
        autoClose: 1000,
      });
      return;
    }
    try {
      const { response, error } = await make_auth_post_request(
        "accounts/reset_password/",
        {
          current_password: oldPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
        },
        navigate
      );
      if (response) {
        toast.success("Password changed successfully.", {
          autoClose: 1000,
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        navigate(-2);
      } else {
      }
    } catch (error) {
      console.log(error);
      toast.error(error, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicOldPassword">
            <Form.Label>Old password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => {
                setUnsavedChanges(true);
                setOldPassword(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicNewPassword">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setUnsavedChanges(true);
                setNewPassword(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm new password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setUnsavedChanges(true);
              }}
              required
            />
          </Form.Group>

          <Row style={{ marginTop: "3%" }}>
            <div className="col-md-6">
              <Button
                className="b-full"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  wrappedNavigate(onHide);

                  //
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary b-full" type="submit">
                Save
              </button>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
