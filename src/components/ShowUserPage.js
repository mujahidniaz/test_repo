import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const ShowUserPage = ({ user, onHideClicked, onEdit }) => {
  const handleEdit = () => {
    onEdit(user);
  };

  const handleBack = (e) => {
    e.preventDefault();
    onHideClicked();
  };
  return (
    <div>
      <Row
        style={{ marginTop: "2%", marginBottom: "2%" }}
        className="d-flex flex-row-reverse"
      >
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
      <Card>
        <Card.Header>
          <h5>User Details</h5>
        </Card.Header>
        <Card.Body>
          <form style={{ marginTop: "1%" }}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.first_name}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.last_name}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.middle_name}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={user.email}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Active</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.is_active ? "Yes" : "No"}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>OTP Enabled</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.is_otp_enabled ? "Yes" : "No"}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Roles</label>
                  <ul className="list-group">
                    {user.roles.map((role) => (
                      <li
                        style={{ backgroundColor: "#eceef1" }}
                        key={role.id}
                        className="list-group-item"
                      >
                        {role.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShowUserPage;
