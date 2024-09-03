import React, { useState, useMemo, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Users = () => {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: "yes" },
    { make: "Ford", model: "F-Series", price: 33850, electric: "yes" },
    { make: "Toyota", model: "Corolla", price: 29600, electric: "no" },
  ]);
  const [colDefs, setColDefs] = useState([
    {
      field: "firstname",
      checkboxSelection: true,
    },
    { field: "secondname" },
    { field: "age", filter: "agNumberColumnFilter" },
    { field: "mail" },
    { field: "username" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/users").then((res) =>
      res.json().then((data) => {
        setRowData(data);
      })
    );
  }, []);
  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [100, 200, 500, 1000];
  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        rowSelection="multiple"
      />
    </div>
  );
};
