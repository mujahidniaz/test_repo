import React, { useState, useEffect } from "react";
import DataTableComponent from "../components/DataTableComponent";
import AddItemPage from "../components/AddItemPage";
import ShowItemPage from "../components/ShowItemPage";
import { toast } from "react-toastify";
import {
  make_auth_post_request,
  make_auth_get_request,
  make_auth_delete_request,
  make_auth_put_request,
} from "../domain/APIUtils";
import withAuth from "../components/withAuth";
import { useNavigate, useLocation } from "react-router-dom";
function ItemsPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const itemTypes = [
    "SERVICE",
    "INVENTORY",
    "SUB-ASSEMBLY",
    "ASSEMBLY",
    "NON-INVENTORY",
  ];
  const handleAddItem = async (formData) => {
    const { response, error } = await make_auth_post_request(
      "item/",
      formData,
      navigate
    );
    if (response) {
      fetchItems();
      setShowForm(false);
    } else {
      toast.error(error.response.data);

      toast.error(error.response.data.detail);
    }
  };

  const fetchItems = async () => {
    const { response, error } = await make_auth_get_request("item/", navigate);
    console.log("data is ", response);
    if (response) {
      setItems(response.data);
    } else {
      toast.error(error.response.data);
    }
  };
  const handleUpdate = async (e) => {
    setSelectedItem(e);
    setUpdateMode(true);
    setShowDetails(false);
    setShowForm(true);
  };
  const handleUpdateItem = async (formData) => {
    const { response, error } = await make_auth_put_request(
      `item/?id=${selectedItem.id}`,
      formData,
      navigate
    );
    if (response) {
      fetchItems();
      setShowForm(false);
      setUpdateMode(false);
    } else {
      toast.error(error.response.data);
      toast.error(error.response.data);
    }
  };
  const handleShowDetails = async (e) => {
    setUpdateMode(false);
    setShowForm(false);
    setShowDetails(true);
    setSelectedItem(e);
  };
  const handleShowHide = async (e) => {
    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams.get("id");

    if (itemId) {
      navigate(-2);
    } else {
      setShowDetails(false);
      setSelectedItem(null);
    }
  };
  const handleDelete = async (e) => {
    const { response, error } = await make_auth_delete_request(
      `item/?id=${e.id}`,
      navigate
    );
    if (response) {
      fetchItems();
    } else {
      toast.error(error, { autoClose: 1500 });
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams.get("id");

    if (itemId) {
      const item = items.find((c) => c.id === parseInt(itemId));
      if (item) {
        handleShowDetails(item);
      }
    }
  }, [location.search, items]);
  const columns = [
    {
      name: "ID",
      onClick: handleShowDetails,
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      onClick: handleShowDetails,
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Item Type",
      selector: "item_type",
      sortable: true,
    },
    {
      name: "Created At",
      selector: "created_at",
      sortable: true,
      format: (row) => new Date(row.created_at).toLocaleString(),
    },
  ];

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h2 className="my-3">Items</h2>
      {showDetails ? (
        <ShowItemPage
          onHideClicked={handleShowHide}
          onEdit={handleUpdate}
          Item={selectedItem}
        />
      ) : showForm ? (
        <AddItemPage
          onHide={() => setShowForm(false)}
          onAdd={handleAddItem}
          itemTypes={itemTypes} // pass itemTypes as a prop
          onUpdate={handleUpdateItem}
          updateMode={updateMode}
          item={selectedItem}
        />
      ) : (
        <>
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-primary float-right"
                onClick={() => {
                  setShowForm(true);
                  setUpdateMode(false);
                }}
              >
                <span className="fa fa-plus"></span>&nbsp;New Item
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <DataTableComponent
                onViewClicked={handleShowDetails}
                columns={columns}
                data={items}
                onRowDelete={handleDelete}
                onRowUpdate={handleUpdate}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default withAuth(ItemsPage);
