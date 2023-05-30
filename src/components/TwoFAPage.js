import { Height } from "devextreme-react/chart";
import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  InputGroup,
  Form,
  FormControl,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import UnsavedChangesContext from "./useUnsavedChanges";

const TwoFAPage = ({ show, onHide, onConfirm, qrCodeImageUrl, authURL }) => {
  useEffect(() => {
    setUnsavedChanges(true);
    return () => {};
  }, []);
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setUnsavedChanges(true);
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    setUnsavedChanges(false);
    e.preventDefault();
    onConfirm(otp, e);
  };

  return (
    <Row style={{ marginTop: "3%" }}>
      <Col md={3} className="d-flex">
        <img
          style={{ width: "100%", height: "100%" }}
          src={qrCodeImageUrl}
          alt="QR Code"
        />
      </Col>

      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <h5>Authentication URL Details</h5>
            <Form.Group as={Row} controlId="username">
              <Form.Label column sm="2">
                User:
              </Form.Label>

              <Col sm="9">
                <Form.Control plaintext readOnly value={authURL.username} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="secret">
              <Form.Label column sm="2">
                Secret:
              </Form.Label>

              <Col sm="9">
                <Form.Control plaintext readOnly value={authURL.secret} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="issuer">
              <Form.Label column sm="2">
                Issuer:
              </Form.Label>

              <Col sm="9">
                <Form.Control plaintext readOnly value={authURL.issuer} />
              </Col>
            </Form.Group>

            <InputGroup className="mb-3">
              <FormControl
                pattern="\d{6}"
                maxLength={6}
                minLength={6}
                className="form-control"
                type="text"
                placeholder="Enter 6 Digit OTP from Authentication App"
                value={otp}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Row>

          <Row>
            <Col>
              <Button
                variant="secondary"
                className="b-full"
                onClick={(e) => {
                  e.preventDefault();
                  wrappedNavigate(onHide);
                }}
              >
                <span className="fa fa-arrow-left"></span>&nbsp; Back
              </Button>
            </Col>
            <Col>
              <button className="btn btn-primary b-full" type="submit">
                <span className="fa fa-check"></span>&nbsp; Verify
              </button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default TwoFAPage;
