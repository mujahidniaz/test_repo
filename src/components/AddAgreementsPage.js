import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import UnsavedChangesContext from "./useUnsavedChanges";
const AddAgreementsPage = ({
  onSubmit,
  onUpdate,
  onHide,
  agreementTerms,
  customers,
  items,
  selectedAgreement,
  updateMode,
}) => {
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );

  const [newAgreement, setNewAgreement] = useState({
    customer: "",
    agreement_term: "",
    required_minimum: "",
    start_date: "",
    end_date: "",
    status: "",
    minimum_adjustment_item: "",
  });

  const handleChange = (e) => {
    setUnsavedChanges(true);
    const updatedAgreement = {
      ...newAgreement,
      [e.target.name]: e.target.value,
    };
    setNewAgreement(updatedAgreement);
  };

  useEffect(() => {
    if (updateMode && selectedAgreement) {
      setNewAgreement(selectedAgreement);
    } else {
      setNewAgreement({
        customer: "",
        agreement_term: "",
        required_minimum: "",
        start_date: "",
        end_date: "",
        status: "",
        minimum_adjustment_item: "",
      });
    }
  }, [selectedAgreement, updateMode]);

  const handleSubmit = (e) => {
    setUnsavedChanges(false);
    e.preventDefault();
    if (updateMode) {
      onUpdate(newAgreement);
    } else {
      onSubmit(newAgreement);
    }
    setNewAgreement({
      customer: "",
      agreement_term: "",
      required_minimum: "",
      start_date: "",
      end_date: "",
      status: "",
      minimum_adjustment_item: "",
    });
  };

  return (
    <div style={{ marginTop: "3%" }}>
      <Form onSubmit={handleSubmit}>
        <h5>Create Agreement</h5>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control
                as="select"
                name="customer"
                value={newAgreement.customer}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a customer --</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Agreement Term</Form.Label>
              <Form.Control
                as="select"
                name="agreement_term"
                value={newAgreement.agreement_term}
                onChange={handleChange}
                required
              >
                <option value="">-- Select an agreement term --</option>
                {agreementTerms.map((agreementTerm) => (
                  <option key={agreementTerm.id} value={agreementTerm.id}>
                    {agreementTerm.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Required Minimum</Form.Label>
              <Form.Control
                type="number"
                name="required_minimum"
                value={newAgreement.required_minimum}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={newAgreement.start_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={newAgreement.end_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={newAgreement.status}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a status --</option>
                <option value="pending_activation">Pending Activation</option>
                <option value="active">Active</option>
                <option value="pending_cancellation">
                  Pending Cancellation
                </option>
                <option value="cancelled">Cancelled</option>
                <option value="renewed">Renewed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Minimum Adjustment Item</Form.Label>
              <Form.Control
                as="select"
                name="minimum_adjustment_item"
                value={newAgreement.minimum_adjustment_item}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a minimum adjustment item --</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
              <span className="fa fa-save"></span>&nbsp;Save
            </button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default AddAgreementsPage;
