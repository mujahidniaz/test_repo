import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ShowItemPage = ({ Item, onHideClicked, onEdit }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    onEdit(Item);
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
            <h5 className="m-0 me-2 pb-2">Item Details</h5>
          </div>
        </div>
        <Card.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" readOnly value={Item.id} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" readOnly value={Item.name} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Item Type</Form.Label>
                <Form.Control type="text" readOnly value={Item.item_type} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Item description</Form.Label>
                <Form.Control type="text" readOnly value={Item.description} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShowItemPage;
