import React, { useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirm } from "./Confirmation";
import "../css/data_table.css";
import {
  faSortUp,
  faSortDown,
  faTrashAlt,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
const DataTableComponent = ({
  columns,
  data,
  columnsWithBadge,
  onRowDelete,
  onRowUpdate,
  boolean_values = null,
  onViewClicked,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig.key) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const renderBadge = (row, column) => {
    if (column.includes(".")) {
      const [parentColumn, nestedColumn] = column.split(".");
      return row[parentColumn][nestedColumn];
    }
    if (columnsWithBadge && columnsWithBadge[column]) {
      const badgeDict = columnsWithBadge[column];
      var badgeContent = row[column];
      const badgeClass = badgeDict[badgeContent];
      if (boolean_values) {
        const con = boolean_values[column];
        var conValue = row[column];
        badgeContent = con[conValue];
      }
      return (
        <span
          className={`badge badge-${badgeClass}  rounded-pill d-inline-flex justify-content-center align-items-center capitalize`}
        >
          {badgeContent}
        </span>
      );
    }
    // Check if the value is an object, and if so, stringify it or extract the appropriate value
    const value = row[column];
    return typeof value === "object" ? JSON.stringify(value) : value;
  };

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePaginationClick = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderButtons = (row, index) => {
    const url = window.location.pathname;

    // Modify the URL to singular if it's plural
    const singularUrl = url.endsWith("s")
      ? url.slice(0, -1).replace("/", "")
      : url.replace("/", "");

    // Update the state with the modified URL
    const handleDelete = async () => {
      const result = await confirm(
        `Do you want to delete this ${singularUrl}?`
      );
      if (result) {
        onRowDelete(row);
      }
    };
    const handleUpdate = async () => {
      onRowUpdate(row);
    };

    const handleView = async () => {
      onViewClicked(row);
    };

    return (
      <td key={index}>
        <Button variant="success" onClick={handleView}>
          <FontAwesomeIcon icon={faEye} />
        </Button>{" "}
        <Button variant="danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>{" "}
        <Button variant="info" onClick={handleUpdate}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </td>
    );
  };

  return (
    <div className="react-data-table mt-6">
      <Table striped bordered hover responsive className="custom-table mt-6">
        <thead className="bg-light">
          <tr>
            {columns.map((column, index) => {
              if (column.nested) {
                return <th key={index}>{column.name}</th>;
              }
              return (
                <th
                  key={index}
                  className={getClassNamesFor(column.selector)}
                  onClick={() => requestSort(column.selector)}
                >
                  {column.name}
                  {sortConfig.key === column.selector && (
                    <FontAwesomeIcon
                      icon={
                        sortConfig.direction === "asc" ? faSortUp : faSortDown
                      }
                      className="ml-1"
                    />
                  )}
                </th>
              );
            })}
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => {
                if (column.nested) {
                  return (
                    <td key={index}>
                      {row[column.parent].map((nestedRow) => (
                        <div key={nestedRow.id}>
                          {nestedRow[column.selector]}
                        </div>
                      ))}
                    </td>
                  );
                }
                if (column.onClick) {
                  return (
                    <td key={index} onClick={() => column.onClick(row)}>
                      <a href="#" className="Link">
                        {renderBadge(row, column.selector)}
                      </a>
                    </td>
                  );
                } else {
                  return (
                    <td key={index}>{renderBadge(row, column.selector)}</td>
                  );
                }
              })}
              {renderButtons(row, index)}
            </tr>
          ))}
        </tbody>
      </Table>
      <nav>
        <ul className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index === currentPage - 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePaginationClick(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default DataTableComponent;
