import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ShowAgreementsPage = ({ agreement, onHideClicked, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    onEdit(agreement);
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
            <h5 className="m-0 me-2 pb-2">Agreement Details</h5>
          </div>
        </div>
        <Card.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Customer</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={agreement.customer.name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Agreement Term</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={agreement.agreement_term}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Required Minimum</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={agreement.required_minimum}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={agreement.start_date}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="text" readOnly value={agreement.end_date} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" readOnly value={agreement.status} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Minimum Adjustment Item</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={agreement.minimum_adjustment_item.name}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShowAgreementsPage;
