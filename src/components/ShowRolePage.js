import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import PermissionTable from "./PermissionTable";
import { make_auth_get_request } from "../domain/APIUtils";
import { useNavigate } from "react-router-dom";

const ShowRolePage = ({ role, onHideClicked, onEdit }) => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const handleEdit = () => {
    onEdit(role);
  };

  const handleBack = (e) => {
    e.preventDefault();
    onHideClicked();
  };
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
  }, []);

  return (
    <div>
      <Row style={{ marginTop: "2%" }} className="d-flex flex-row-reverse">
        <Col sm={2}>
          <button
            className="btn btn-primary b-full"
            onClick={handleEdit}
            type="submit"
          >
            <span className="fa fa-edit"></span>&nbsp;Edit
          </button>
        </Col>
        <Col sm={2}>
          <Button variant="secondary b-full" onClick={handleBack}>
            <span className="fa fa-arrow-left"></span>&nbsp; Back
          </Button>
        </Col>
      </Row>
      <Card className="w-100" style={{ marginTop: "3%" }}>
        <div className="card-header d-flex align-items-center justify-content-between pb-0">
          <div className="card-title mb-0">
            <h5 className="m-0 me-2 pb-2">Role Details</h5>
          </div>
        </div>
        <Card.Body>
          <div className="row" style={{ marginTop: "1%" }}>
            <div className="row col-md-4">
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={role.name}
                  readOnly
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "1%" }}>
              <br />
              <h6>Permissions:</h6>
              <PermissionTable
                masterPermissions={permissions}
                rolePermissions={role.permissions}
                onCheckboxChange={() => {}}
                disabled
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShowRolePage;
