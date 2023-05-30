import React, { useState, useEffect } from "react";
import DataTableComponent from "../components/DataTableComponent";
import AddAgreementsPage from "../components/AddAgreementsPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowAgreementsPage from "../components/ShowAgreementsPage";
import {
  make_auth_post_request,
  make_auth_get_request,
  make_auth_delete_request,
  make_auth_put_request,
} from "../domain/APIUtils";
import withAuth from "../components/withAuth";
import { useNavigate } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";

function AgreementsPage() {
  const navigate = useNavigate();
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [agreementTerms, setAgreementTerms] = useState([]);

  const fetchAgreementTerms = async () => {
    const { response, error } = await make_auth_get_request(
      "agreements/frequency/",
      navigate
    );
    console.log("data is ", response);
    if (response) {
      setAgreementTerms(response.data);
    } else {
      toast.error(error.response.data);
    }
  };
  const fetchCustomers = async () => {
    const { response, error } = await make_auth_get_request(
      "customer/",
      navigate
    );
    console.log("data is ", response);
    if (response) {
      setCustomers(response.data);
    } else {
      toast.error(error.response.data);
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
    const agreement = await fetchSingleAgreements(e.id);
    setSelectedAgreement(agreement);
    setUpdateMode(true);
    handleShow();
  };

  function handleShowHide() {
    setShowDetails(false);
  }
  const handleDelete = async (e) => {
    const { response, error } = await make_auth_delete_request(
      `agreements/?id=${e.id}`,
      navigate
    );
    if (response) {
      fetchAgreements();
    } else {
      toast.error(error.response.data);
      toast.error(error.response.data);
    }
  };

  const handleShowDetails = async (e) => {
    setUpdateMode(false);
    setShowForm(false);
    setShowDetails(true);
    setSelectedAgreement(e);
  };
  const handleShow = async (e) => {
    fetchCustomers();
    setShowDetails(false);
    fetchItems();
    fetchAgreementTerms();
    setShowForm(true);
  };
  const handleHide = async (e) => {
    setShowForm(false);
    setUpdateMode(false);
  };

  const handleAddAgreement = async (formData) => {
    console.log("daafafasd", JSON.stringify(formData));
    const { response, error } = await make_auth_post_request(
      "agreements/",
      formData,
      navigate
    );
    if (response) {
      fetchAgreements();
      setShowForm(false);
    } else {
      toast.error(error.response.data);
      toast.error(error.response.data);
    }
  };

  const fetchAgreements = async () => {
    const { response, error } = await make_auth_get_request(
      "agreements/",
      navigate
    );
    console.log("data is ", response);
    if (response) {
      setAgreements(response.data);
    } else {
      toast.error(error.response.data);
    }
  };
  const fetchSingleAgreements = async (agreement_id) => {
    const { response, error } = await make_auth_get_request(
      `agreements/?id=${agreement_id}`,
      navigate
    );
    console.log("data is ", response);
    if (response) {
      return response.data;
    } else {
      toast.error(error.response.data);
      return null;
    }
  };
  const handleUpdateAgreement = async (formData) => {
    // Replace "your_update_api" with the correct API endpoint for updating agreements.
    const { response, error } = await make_auth_put_request(
      `agreements/?id=${formData.id}`,
      formData,
      navigate
    );
    if (response) {
      fetchAgreements();
      setShowForm(false);
      setUpdateMode(false);
    } else {
      toast.error(error.response.data);
      toast.error(error.response.data);
    }
  };

  const viewItem = async (e) => {
    navigate(`/items?id=${e.minimum_adjustment_item.id}`);
  };
  const viewCustomer = async (e) => {
    navigate(`/customer?id=${e.customer.id}`);
  };
  useEffect(() => {
    fetchAgreements();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: "id",
      onClick: handleShowDetails,
      sortable: true,
    },
    {
      name: "Customer",
      selector: "customer.name",
      onClick: viewCustomer,
      sortable: true,
    },
    {
      name: "Min Adjst. Item",
      selector: "minimum_adjustment_item.name",
      onClick: viewItem,
      sortable: true,
    },
    {
      name: "Agreement Term",
      selector: "agreement_term",
      sortable: true,
    },
    {
      name: "Required Minimum",
      selector: "required_minimum",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: "start_date",
      sortable: true,
      format: (row) => new Date(row.start_date).toLocaleString(),
    },
    {
      name: "End Date",
      selector: "end_date",
      sortable: true,
      format: (row) => new Date(row.end_date).toLocaleString(),
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
  ];
  const columnsWithBadge = {
    status: {
      renewed: "success",
      active: "primary",
      pending_activation: "warning",
      cancelled: "danger",
      pending_cancellation: "warning",
    },
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h2 className="my-3">Agreements</h2>
      <div>
        {showDetails ? (
          <ShowAgreementsPage
            onHideClicked={handleShowHide}
            onEdit={handleUpdate}
            agreement={selectedAgreement}
          />
        ) : showForm ? (
          <AddAgreementsPage
            onSubmit={handleAddAgreement}
            onUpdate={handleUpdateAgreement}
            agreementTerms={agreementTerms}
            customers={customers}
            items={items}
            selectedAgreement={selectedAgreement}
            updateMode={updateMode}
            onHide={() => handleHide()}
          />
        ) : (
          <>
            <div className="row">
              <div className="col-md-12">
                <button
                  className="btn btn-primary float-right"
                  onClick={() => handleShow()}
                >
                  <span className="fa fa-plus"></span>&nbsp;New Agreement
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <DataTableComponent
                  onViewClicked={handleShowDetails}
                  columns={columns}
                  data={agreements}
                  columnsWithBadge={columnsWithBadge}
                  onRowDelete={handleDelete}
                  onRowUpdate={handleUpdate}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withAuth(AgreementsPage);
