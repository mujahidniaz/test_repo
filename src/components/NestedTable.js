import React from "react";

const NestedTable = ({ data }) => {
  const columnNames = data ? Object.keys(data) : [];

  return (
    <table className="table table-striped">
      <thead>
        <tr className="info">
          {columnNames.map((columnName, index) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {columnNames.map((columnName, index) => (
            <td key={index}>{data[columnName]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default NestedTable;
