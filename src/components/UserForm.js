import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { make_auth_get_request } from "../domain/APIUtils";
import { toast } from "react-toastify";
import UnsavedChangesContext from "./useUnsavedChanges";
const UserForm = ({ onSubmit, onHide, selectedUser, updateMode }) => {
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );
  const navigate = useNavigate();
  const [updatePassword, setUpdatePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");

  const [newUser, setNewUser] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    roles: [],
    is_active: true,
    is_staff: false,
    is_otp_enabled: false,
    secret_key: "",
  });
  const [roles, setRoles] = useState([]);
  const handlePasswordChange = (e) => {
    setUnsavedChanges(true);
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setUnsavedChanges(true);
    setConfirmPassword(e.target.value);
  };

  const handleChange = (e) => {
    setUnsavedChanges(true);
    const updatedUser = {
      ...newUser,
      [e.target.name]: e.target.value,
    };
    setNewUser(updatedUser);
  };

  const fetchRoles = async () => {
    const { response, error } = await make_auth_get_request(
      "accounts/roles",
      navigate
    );

    if (response) {
      setRoles(response.data);
    } else {
      console.log(error);
    }
  };

  const handleRoleChange = (e) => {
    setUnsavedChanges(true);
    const selectedRoles = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const updatedUser = {
      ...newUser,
      roles: selectedRoles,
    };
    setNewUser(updatedUser);
  };

  useEffect(() => {
    fetchRoles();

    if (updateMode && selectedUser) {
      setNewUser({
        ...selectedUser,
        roles: selectedUser.roles.map((role) => role.id),
      });
    } else {
      // Only set initial state when newUser is undefined
      setNewUser({
        first_name: "",
        middle_name: "",
        last_name: "",
        password: "",
        email: "",
        roles: [],
        is_active: true,
        is_staff: false,
        is_otp_enabled: false,
        secret_key: "",
      });
    }
  }, [selectedUser, updateMode]);

  function is_selected(role) {
    if (selectedUser) {
      return selectedUser.roles.filter((r) => r.id === role.id).length > 0;
    } else {
      return false;
    }
  }

  const handleSubmit = (e) => {
    setUnsavedChanges(false);
    e.preventDefault();
    if (!updateMode || (updateMode && updatePassword)) {
      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match", {
          autoClose: 1000,
        });
        return;
      }
    }

    const userData = { ...newUser };

    if (updateMode) {
      if (updatePassword) {
        userData.password = password;
      } else {
        delete userData.password;
      }
    } else {
      // Set the password when creating a new user
      userData.password = password;
    }

    userData.roles = newUser.roles;

    onSubmit(userData);
    setNewUser({ ...newUser });
  };

  return (
    <div style={{ marginTop: "1%" }}>
      <Form onSubmit={handleSubmit}>
        <h5>{updateMode ? "Update User" : "Create User"}</h5>
        <Row>
          <Col className="col-md-6">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={newUser.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={newUser.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                name="middle_name"
                value={newUser.middle_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col className="col-md-6">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={updateMode && !updatePassword ? "" : password}
                onChange={handlePasswordChange}
                required={!updateMode}
                disabled={updateMode && !updatePassword}
              />
            </Form.Group>
            {!updateMode || (updateMode && updatePassword) ? (
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required={!updateMode || (updateMode && updatePassword)}
                />
              </Form.Group>
            ) : null}
            {updateMode && (
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  name="update_password"
                  checked={updatePassword}
                  onChange={(e) => setUpdatePassword(e.target.checked)}
                  label="Update Password"
                />
              </Form.Group>
            )}
            <Row>
              <Col className="col-md-6">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    name="is_active"
                    checked={newUser.is_active}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        is_active: e.target.checked,
                      })
                    }
                    label="Active"
                  />
                </Form.Group>
              </Col>
              <Col className="col-md-6">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    name="is_otp_enabled"
                    checked={newUser.is_otp_enabled}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        is_otp_enabled: e.target.checked,
                      })
                    }
                    label="OTP Enabled"
                  />
                </Form.Group>
              </Col>
              <Form.Group>
                <Form.Label>Roles</Form.Label>
                <Form.Control
                  as="select"
                  name="roles"
                  onChange={handleRoleChange}
                  multiple
                  required
                >
                  {roles.map((role) => (
                    <option
                      selected={is_selected(role)}
                      key={role.id}
                      value={role.id}
                    >
                      {role.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "3%" }}>
          <div className="col-md-2">
            <button
              className="btn btn-secondary b-full"
              onClick={(e) => {
                e.preventDefault();
                wrappedNavigate(onHide);

                //
              }}
            >
              <span className="fa fa-arrow-left"></span>&nbsp;Cancel
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary b-full" type="submit">
              <span className="fa fa-save"></span>&nbsp; Save
            </button>
          </div>
        </Row>
      </Form>
    </div>
  );
};
export default UserForm;
