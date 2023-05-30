import React from "react";

const PermissionTable = ({
  masterPermissions = [],
  rolePermissions = [],
  onCheckboxChange,
}) => {
  const groupedData = {};

  masterPermissions.forEach((item) => {
    if (!groupedData[item.module]) {
      groupedData[item.module] = {};
    }
    groupedData[item.module][item.action] = item;
  });
  const isPermissionChecked = (permission) => {
    if (rolePermissions) {
      return rolePermissions.some(
        (rolePermission) => rolePermission.id === permission.id
      );
    }
    return false;
  };
  const renderCheckbox = (item) => (
    <input
      type="checkbox"
      value={item.id}
      onChange={(e) => onCheckboxChange(e, item)}
      defaultChecked={Boolean(item) ? isPermissionChecked(item) : false}
    />
  );

  return (
    <div className="react-data-table mt-6">
      <table className="table table-stripped table-hover">
        <thead>
          <tr>
            <th>Module</th>
            <th>Read</th>
            <th>Write</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((module) => (
            <tr key={module}>
              <td>{module}</td>
              <td>{renderCheckbox(groupedData[module]["Read"])}</td>
              <td>{renderCheckbox(groupedData[module]["Write"])}</td>
              <td>{renderCheckbox(groupedData[module]["Update"])}</td>
              <td>{renderCheckbox(groupedData[module]["Delete"])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionTable;
