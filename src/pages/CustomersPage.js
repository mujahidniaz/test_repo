import React, { useState, useEffect } from "react";
import { Button, Form, Row, Spinner } from "react-bootstrap";
import {
  make_auth_delete_request,
  make_auth_get_request,
  make_auth_post_request,
  make_auth_put_request,
} from "../domain/APIUtils";
import DataTableComponent from "../components/DataTableComponent";
import CustomGrid from "../components/DataTableWrapper";
import AddCustomerPage from "../components/AddCustomerPage";
import withAuth from "../components/withAuth";
import { useNavigate, useLocation, json } from "react-router-dom";
import { toast } from "react-toastify";
import ShowCustomerPage from "../components/ShowCustomerPage";

const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCustomers = async () => {
    setLoading(true);
    const { response, error } = await make_auth_get_request(
      "customer/",
      navigate
    );
    console.log("data is ", response);
    if (response) {
      setCustomers(response.data);
    } else {
      console.log(error);
    }
    setLoading(false);
  };

  function handleShowHide() {
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get("id");

    if (customerId) {
      navigate(-2);
    } else {
      setShowDetails(false);
    }
  }

  function handleShowDetails(e) {
    setUpdateMode(false);
    setShowForm(false);
    setShowDetails(true);
    setSelectedCustomer(e);
  }

  const handleUpdate = async (e) => {
    setShowDetails(false);
    setSelectedCustomer(e);
    setUpdateMode(true);
    setShowForm(true);
  };

  const handleUpdateCustomer = async (formData) => {
    const data = JSON.stringify(formData);
    console.log(data);
    const { response, error } = await make_auth_put_request(
      `customer/?id=${selectedCustomer.id}`,
      data,
      navigate
    );
    if (response) {
      fetchCustomers();
      setShowForm(false);
      setUpdateMode(false);
    } else {
      console.log(error);
      alert(error.response.data);
    }
  };

  const handleDelete = async (e) => {
    const { response, error } = await make_auth_delete_request(
      `customer/?id=${e.id}&force=true`,
      navigate
    );

    if (response) {
      fetchCustomers();
    } else {
      toast.error(JSON.stringify(error), { autoClose: 1500 });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get("id");

    if (customerId) {
      const customer = customers.find((c) => c.id === parseInt(customerId));
      if (customer) {
        handleShowDetails(customer);
      }
    }
  }, [location.search, customers]);

  // Add a new customer
  const addCustomer = async (customer) => {
    const data = JSON.stringify(customer);
    const { response, error } = await make_auth_post_request(
      "customer/",
      data,
      navigate
    );
    if (response) {
      setShowForm(false);
      fetchCustomers();
    } else {
      console.log(error);
    }
  };

  const columns = [
    { name: "ID", selector: "id", sortable: true, onClick: handleShowDetails },
    {
      name: "Name",
      selector: "name",
      onClick: handleShowDetails,
      sortable: true,
    },
    { name: "Created At", selector: "created_at", sortable: true },
  ];
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {showDetails ? (
        <ShowCustomerPage
          onHideClicked={handleShowHide}
          onEdit={handleUpdate}
          customer={selectedCustomer}
        />
      ) : showForm ? (
        <AddCustomerPage
          show={showForm}
          onHide={(e) => {
            setShowForm(false);
            setUpdateMode(false);
          }}
          onSubmit={addCustomer}
          onUpdate={handleUpdateCustomer}
          customer={selectedCustomer}
          updateMode={updateMode}
        />
      ) : (
        <>
          <h2 className="my-3">Customers</h2>
          <div>
            <div className="row">
              <div className="col-12">
                <button
                  className="btn btn-primary float-right"
                  onClick={() => {
                    setShowForm(true);
                    setSelectedCustomer(null);
                    setUpdateMode(false);
                  }}
                >
                  <span className="fa fa-plus"></span>&nbsp;New Customer
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <DataTableComponent
                  onViewClicked={handleShowDetails}
                  columns={columns}
                  data={customers}
                  onRowDelete={handleDelete}
                  onRowUpdate={handleUpdate}
                />
                {/* <CustomGrid data={customers} /> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default withAuth(CustomersPage);
