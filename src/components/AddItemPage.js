import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import withAuth from "./withAuth";
import UnsavedChangesContext from "./useUnsavedChanges";
const AddItemPage = ({
  onHide,
  onAdd,
  itemTypes,
  onUpdate,
  item,
  updateMode,
}) => {
  const { wrappedNavigate, setUnsavedChanges } = useContext(
    UnsavedChangesContext
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    item_type: "",
  });

  const handleFormChange = (e) => {
    setUnsavedChanges(true);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (updateMode && item) {
      setFormData({
        name: item.name,
        description: item.description,
        item_type: item.item_type,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        item_type: "",
      });
    }
  }, [item, updateMode]);

  const handleFormSubmit = (e) => {
    setUnsavedChanges(false);
    e.preventDefault();
    if (updateMode) {
      onUpdate(formData);
    } else {
      onAdd(formData);

      onHide();
    }
    setFormData({
      name: "",
      description: "",
      item_type: "",
    });

    onHide();
  };

  return (
    <div className="col-md-8" style={{ marginTop: "3%" }}>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <h5>Add New Item</h5>
        </Row>
        <div>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </Form.Group>

          <Form.Group controlId="formItemType">
            <Form.Label>Item Type</Form.Label>
            <Form.Control
              as="select"
              name="item_type"
              value={formData.item_type}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Item Type</option>
              {itemTypes.map((itemType) => (
                <option key={itemType} value={itemType}>
                  {itemType}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <Row style={{ marginTop: "3%" }}>
          <div className="col-md-3">
            <Button
              className="b-full"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                wrappedNavigate(onHide);

                //
              }}
            >
              <span className="fa fa-arrow-left"></span>&nbsp;Cancel
            </Button>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary b-full" type="submit">
              <span className="fa fa-save"></span>&nbsp;Save
            </button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default AddItemPage;
