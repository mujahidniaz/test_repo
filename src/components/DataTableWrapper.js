import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DataGrid, {
  Column,
  Grouping,
  Editing,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  MasterDetail,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.blue.light.compact.css";
import "../css/datagrid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
const CustomDataGrid = ({ data }) => {
  const handleDelete = (e) => {
    alert(e.id);
  };

  const handleUpdate = (e) => {
    // ... Implement your save logic here
    alert(e.id);
  };
  const ActionButtonCell = (cellData) => {
    return (
      <div className="row" style={{ width: "100%" }}>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <Button
            variant="danger"
            block
            onClick={() => handleUpdate(cellData.row.data)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <Button
            block
            variant="info"
            onClick={() => handleDelete(cellData.row.data)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="react-data-table">
      <DataGrid
        className="table table-striped table-responsive table-hover "
        dataSource={data}
        showBorders={true}
        columnAutoWidth={true}
        wordWrapEnabled={false}
        striped={true}
      >
        {/* 'batch' | 'cell' | 'form' | 'popup' */}
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="id" caption="ID" allowSorting={true} />
        <Column dataField="name" caption="Customer" allowSorting={true} />
        <Column
          dataField="created_at"
          caption="created at"
          allowSorting={true}
        />
        <Column
          caption="Actions"
          cellRender={ActionButtonCell}
          allowSorting={false}
          allowFiltering={false}
          width="130"
        />
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
        <MasterDetail
          enabled={true}
          component={(rowInfo) => <DetailComponent rowData={rowInfo.data} />}
        />
      </DataGrid>
    </div>
  );
};

const DetailComponent = ({ rowData }) => {
  if (!rowData.data.contacts || rowData.data.contacts.length === 0) {
    return <div>No contacts available for this company.</div>;
  }

  return (
    <div>
      <h5>Contacts:</h5>
      <DataGrid
        dataSource={rowData.data.contacts}
        showBorders={true}
        columnAutoWidth={true}
        wordWrapEnabled={false}
        striped={true}
      >
        <Column dataField="first_name" caption="First Name" />
        <Column dataField="last_name" caption="Last Name" />
        <Column dataField="email" caption="Email" />
        <Column dataField="office_phone" caption="Office Phone" />
        <Column dataField="cell_phone" caption="Cell Phone" />
      </DataGrid>
    </div>
  );
};

export default CustomDataGrid;
