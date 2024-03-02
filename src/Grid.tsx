import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import style from "./styles/style.module.css"; 

// Helper Functions
const formatDate = (date: any) => {
  const formatDate = new Date(date.value);
  return formatDate.toISOString().split("T")[0];
};

const formatPha = (string: any) => {
  if (string.value === "Y") {
    return "Yes";
  } else if (string.value === "N") {
    return "No";
  } else {
    return "";
  }
};

// Constants
const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation" },
  {
    field: "discovery_date",
    headerName: "Discovery Date",
    valueFormatter: formatDate,
  },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  {
    field: "pha",
    headerName: "Potentially Hazardous",
    valueFormatter: formatPha,
  },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true },
];

const NeoGrid = (): JSX.Element => {
  
  // Refs
  const gridApiRef = useRef<GridApi | null>(null);

  // Memoized default column definition
  const defautColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  // Clear Filters and Sorters Function
  const clearFiltersAndSort = () => {
    const gridApi = gridApiRef.current;
    if (gridApi) {
      // Clear Filters
      gridApi.setFilterModel(null);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <h1>Near-Earth Object Overview</h1>
      <button onClick={clearFiltersAndSort} className={style.clearButton}>
        Clear Filters and Sorters
      </button>{" "}
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={"always"}
        defaultColDef={defautColDef}
        onGridReady={({ api }) => {
          gridApiRef.current = api;
        }}
      />
    </div>
  );
};

export default NeoGrid;
