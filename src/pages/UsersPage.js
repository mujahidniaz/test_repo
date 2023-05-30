import withAuth from "../components/withAuth";
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Spinner } from "react-bootstrap";
import ShowUserPage from "../components/ShowUserPage";
import {
  make_auth_delete_request,
  make_auth_get_request,
  make_auth_post_request,
  make_auth_put_request,
} from "../domain/APIUtils";
import DataTableComponent from "../components/DataTableComponent";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fetchUsers = async () => {
    const { response, error } = await make_auth_get_request(
      "accounts/users",
      navigate
    );

    if (response) {
      console.log(response);
      setUsers(response.data);
    } else {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    setShowDetails(false);
    setSelectedUser(e);
    setUpdateMode(true);
    setShowForm(true);
  };
  const handleShowDetails = async (e) => {
    setUpdateMode(false);
    setShowForm(false);
    setShowDetails(true);
    setSelectedUser(e);
  };
  const handleAdd = (e) => {
    setSelectedUser(null);
    setUpdateMode(false);
    setShowForm(true);
  };

  const handleDelete = async (e) => {
    const { response, error } = await make_auth_delete_request(
      `accounts/users?id=${e.id}`,
      navigate
    );
    if (response) {
      fetchUsers();
    } else {
      console.log(error);
    }
  };

  // Fetch customers data from the API (use your actual API URL)
  useEffect(() => {
    fetchUsers();
  }, []);
  function handleShowHide() {
    setShowDetails(false);
  }
  const columns = [
    {
      name: "ID",
      selector: "id",
      onClick: handleShowDetails,
      sortable: true,
    },
    {
      name: "First Name",
      selector: "first_name",
      onClick: handleShowDetails,
      sortable: true,
    },
    { name: "Last Name", selector: "last_name", sortable: true },
    {
      name: "email",
      selector: "email",
      onClick: handleShowDetails,
      sortable: true,
    },
    { name: "Status", selector: "is_active", sortable: true },
    { name: "MFA Status", selector: "is_otp_enabled", sortable: true },
  ];
  const columnsWithBadge = {
    is_otp_enabled: {
      true: "success",
      false: "danger",
    },
    is_active: {
      true: "success",
      false: "danger",
    },
  };
  const booleanValues = {
    is_otp_enabled: {
      true: "Enabled",
      false: "Disabled",
    },
    is_active: {
      true: "Active",
      false: "Deactivated",
    },
  };
  // Add a new customer
  const addUser = async (User) => {
    // User.roles = Array.from(User.roles, (r) => r.id);
    User["roles_ids"] = User.roles;
    const data = JSON.stringify(User);
    if (selectedUser) {
      const { response, error } = await make_auth_put_request(
        `accounts/users?id=${selectedUser.id}`,
        data,
        navigate
      );
      if (response) {
        setShowForm(false);
        fetchUsers();
      } else {
        console.log(error);
      }
    } else {
      const { response, error } = await make_auth_post_request(
        "accounts/users",
        data,
        navigate
      );
      if (response) {
        setShowForm(false);
        fetchUsers();
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {showDetails ? (
        <ShowUserPage
          onHideClicked={handleShowHide}
          onEdit={handleUpdate}
          user={selectedUser}
        />
      ) : showForm ? (
        <UserForm
          onSubmit={addUser}
          onHide={() => setShowForm(false)}
          selectedUser={selectedUser}
          updateMode={updateMode}
        />
      ) : (
        <>
          <div className="row">
            <h2 className="my-3">Users</h2>
            <div>
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-primary float-right"
                    onClick={handleAdd}
                  >
                    <span className="fa fa-plus"></span>&nbsp;New User
                  </button>
                </div>
              </div>
              <DataTableComponent
                columns={columns}
                onViewClicked={handleShowDetails}
                columnsWithBadge={columnsWithBadge}
                data={Users}
                onRowDelete={handleDelete}
                onRowUpdate={handleUpdate}
                boolean_values={booleanValues}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withAuth(UsersPage);
