// OTPModal.js

import React, { useState, useEffect } from "react";
import { Modal, Button, InputGroup, Form, FormControl } from "react-bootstrap";
import "../css/OTPModal.css";

const OTPModal = ({ show, onHide, onConfirm }) => {
  useEffect(() => {
    return () => {};
  }, []);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onConfirm(otp, e);
    setOtp("");
    onHide();
  };

  return (
    <Modal id="otp-modal" show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="custom_h">Enter 6 Digit OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button className="btn-primary" type="submit">
            Confirm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OTPModal;
