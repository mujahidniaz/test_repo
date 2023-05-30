import React from "react";
import { Button, Table, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ShowCustomerPage = ({ customer, onHideClicked, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    onEdit(customer);
  };

  const handleBack = (e) => {
    e.preventDefault();
    onHideClicked();
  };
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
            <h5 className="m-0 me-2 pb-2">Customer Details</h5>
          </div>
        </div>
        <Card.Body>
          <Row md={4} style={{ marginTop: "1%" }}>
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={customer.name}
                readOnly
              />
            </div>
          </Row>
          <Row>
            <h6>Contacts</h6>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Office Phone</th>
                  <th>Cell Phone</th>
                </tr>
              </thead>
              <tbody>
                {customer.contacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.first_name}</td>
                    <td>{contact.middle_name}</td>
                    <td>{contact.last_name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.office_phone}</td>
                    <td>{contact.cell_phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShowCustomerPage;
