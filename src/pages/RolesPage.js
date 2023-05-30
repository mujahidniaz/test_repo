import withAuth from "../components/withAuth";
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Spinner } from "react-bootstrap";
import ShowRolePage from "../components/ShowRolePage";
import {
  make_auth_delete_request,
  make_auth_get_request,
  make_auth_post_request,
  make_auth_put_request,
} from "../domain/APIUtils";
import DataTableComponent from "../components/DataTableComponent";
import RoleForm from "../components/RoleForm";
import { useNavigate } from "react-router-dom";
const RolesPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fetchRoles = async () => {
    const { response, error } = await make_auth_get_request(
      "accounts/roles",
      navigate
    );

    if (response) {
      setRoles(response.data);
    } else {
      console.log(error);
    }
  };
  const handleShowDetails = async (e) => {
    setUpdateMode(false);
    setShowForm(false);
    setShowDetails(true);
    setSelectedRole(e);
  };
  const handleUpdate = async (e) => {
    setShowDetails(false);
    setSelectedRole(e);
    setUpdateMode(true);
    setShowForm(true);
  };

  const handleAdd = (e) => {
    setSelectedRole(null);
    setShowForm(true);
  };

  const handleDelete = async (e) => {
    const { response, error } = await make_auth_delete_request(
      `accounts/roles?id=${e.id}`,
      navigate
    );
    if (response) {
      fetchRoles();
    } else {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "ID",
      onClick: handleShowDetails,
      selector: "id",
      sortable: true,
    },
    {
      name: "Name",
      onClick: handleShowDetails,
      selector: "name",
      sortable: true,
    },
  ];
  // Fetch customers data from the API (use your actual API URL)
  useEffect(() => {
    fetchRoles();
  }, []);

  // Add a new customer
  const addRole = async (role) => {
    var crole = role;
    crole["permission_ids"] = role["permissions"];

    const data = JSON.stringify(crole);
    if (selectedRole) {
      const { response, error } = await make_auth_put_request(
        `accounts/roles?id=${selectedRole.id}`,
        data,
        navigate
      );
      if (response) {
        setShowForm(false);
        fetchRoles();
      } else {
        console.log(error);
      }
    } else {
      const { response, error } = await make_auth_post_request(
        "accounts/roles",
        data,
        navigate
      );
      if (response) {
        setShowForm(false);
        fetchRoles();
      } else {
        console.log(error);
      }
    }
  };
  function handleShowHide() {
    setShowDetails(false);
  }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {showDetails ? (
        <ShowRolePage
          onHideClicked={handleShowHide}
          onEdit={handleUpdate}
          role={selectedRole}
        />
      ) : showForm ? (
        <RoleForm
          role={selectedRole}
          onSubmit={addRole}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <div className="row">
            <h2 className="my-3">Roles</h2>
            <div>
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-primary float-right"
                    onClick={handleAdd}
                  >
                    <span className="fa fa-plus"></span>&nbsp;New Role
                  </button>
                </div>
              </div>
              <DataTableComponent
                onViewClicked={handleShowDetails}
                columns={columns}
                data={roles}
                onRowDelete={handleDelete}
                onRowUpdate={handleUpdate}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(RolesPage);
