import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Alignment } from "react-data-table-component";
import { useContext } from "react";
import UnsavedChangesContext from "./useUnsavedChanges";

const AddCustomerPage = ({
  show,
  onHide,
  onSubmit,
  onUpdate,
  customer,
  updateMode,
}) => {
  const [newCustomerName, setNewCustomerName] = useState("");
  const [formValues, setFormValues] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );

  useEffect(() => {
    if (updateMode && customer) {
      setNewCustomerName(customer.name);
      setContacts(customer.contacts);
    } else {
      setNewCustomerName("");
      setContacts([]);
    }
  }, [customer, updateMode]);

  const addContact = () => {
    setContacts([...contacts, { id: contacts.length + 1 }]);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };
  const handleContactChange = (id, field, value) => {
    setUnsavedChanges(true);
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };
  const handleFormSubmit = (e) => {
    setUnsavedChanges(false);
    e.preventDefault();
    const filteredContacts = contacts.map(({ id, ...rest }) => rest);
    const allFormValues = { name: newCustomerName, contacts: filteredContacts };
    console.log(JSON.stringify(allFormValues));
    if (updateMode) {
      onUpdate(allFormValues);
    } else {
      onSubmit(allFormValues);
      onHide();
    }
    setNewCustomerName("");
    setFormValues([]);
    onHide();
  };

  return (
    <Row show={show} onHide={onHide}>
      <Form onSubmit={handleFormSubmit}>
        <Row style={{ marginTop: "2%" }} className="d-flex flex-row-reverse">
          <h3> {customer ? "Update" : "Add"} Customer</h3>
          <Col sm={2}>
            <button className="btn btn-primary b-full" type="submit">
              <span className="fa fa-save"></span>&nbsp;Save
            </button>
          </Col>
          <Col sm={2}>
            <Button
              variant="secondary b-full"
              onClick={(e) => {
                e.preventDefault();
                wrappedNavigate(onHide);

                //
              }}
            >
              <span className="fa fa-arrow-left"></span>&nbsp; Cancel
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newCustomerName}
                onChange={(e) => {
                  setUnsavedChanges(true);
                  setNewCustomerName(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: "1%" }}>
          <h4 className="pb-2 border-bottom mb-4">Contacts</h4>
          <Row
            className="d-flex flex-row-reverse"
            style={{ marginRight: "2%" }}
          >
            <Col md={1} className="text-right">
              <Button className="align-middle b-full" onClick={addContact}>
                <i className="fa fa-plus"></i>
              </Button>
            </Col>
          </Row>
        </Row>
        {contacts.map((contact) => (
          <React.Fragment key={contact.id}>
            <Row>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={contact.first_name || ""}
                    onChange={(e) =>
                      handleContactChange(
                        contact.id,
                        "first_name",
                        e.target.value
                      )
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={contact.middle_name || ""}
                    onChange={(e) =>
                      handleContactChange(
                        contact.id,
                        "middle_name",
                        e.target.value
                      )
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={contact.last_name || ""}
                    onChange={(e) =>
                      handleContactChange(
                        contact.id,
                        "last_name",
                        e.target.value
                      )
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={contact.email || ""}
                    onChange={(e) =>
                      handleContactChange(contact.id, "email", e.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Office Phone</Form.Label>
                  <Form.Control
                    value={contact.office_phone || ""}
                    onChange={(e) =>
                      handleContactChange(
                        contact.id,
                        "office_phone",
                        e.target.value
                      )
                    }
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={1}>
                <Form.Group>
                  <Form.Label>Cell Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={contact.cell_phone || ""}
                    onChange={(e) =>
                      handleContactChange(
                        contact.id,
                        "cell_phone",
                        e.target.value
                      )
                    }
                  />
                </Form.Group>
              </Col>
              <Col className="align-self-end" md={1}>
                <Button
                  variant="danger"
                  onClick={() => removeContact(contact.id)}
                >
                  <i className="fa fa-minus"></i>
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        ))}
      </Form>
    </Row>
  );
};
export default AddCustomerPage;
