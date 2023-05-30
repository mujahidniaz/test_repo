import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Row } from "react-bootstrap";
import PermissionTable from "./PermissionTable";
import { make_auth_get_request } from "../domain/APIUtils";
import { useNavigate } from "react-router-dom";
import UnsavedChangesContext from "./useUnsavedChanges";

const RoleForm = ({ role, onSubmit, onCancel }) => {
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });
  const fetchPermissions = async () => {
    const { response, error } = await make_auth_get_request(
      "accounts/permissions",
      navigate
    );

    if (response) {
      setPermissions(response.data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPermissions();
    if (role) {
      setFormData({
        name: role.name,
        permissions: role.permissions.map((permission) => permission.id),
      });
    }
  }, []);

  const handleChange = (e) => {
    setUnsavedChanges(true);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setUnsavedChanges(false);
    e.preventDefault();
    onSubmit(formData);
  };
  const handleCheckboxChange = (e, permission) => {
    setUnsavedChanges(true);
    const checked = e.target.checked;
    if (checked) {
      setFormData({
        ...formData,
        permissions: Array.from(
          new Set([...formData.permissions, permission.id])
        ),
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permission.id),
      });
    }
  };

  return (
    <div className="row">
      <h2 className="my-3">
        {role ? `Edit Role - ${role.name}` : "Add New Role"}
      </h2>

      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="formRoleName">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                style={{ marginBottom: "5%" }}
                type="text"
                name="name"
                placeholder="Enter role name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <PermissionTable
            masterPermissions={permissions}
            rolePermissions={role?.permissions}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="row">
          <div className="col-md-2">
            <Button
              className="b-full"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                wrappedNavigate(onCancel);
              }}
            >
              <span className="fa fa-arrow-left"></span>&nbsp;Cancel
            </Button>
          </div>
          <div className="col-md-2">
            <Button className="b-full" variant="primary" type="submit">
              <span className="fa fa-save"></span>&nbsp;Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RoleForm;
