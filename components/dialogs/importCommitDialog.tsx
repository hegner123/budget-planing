import dayjs from "dayjs";
import React, { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridEventListener,
  GridRowModel,
  GridCellParams,
  GridColDef,
  GridComparatorFn,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
export default function ImportCommitDialog({ data }) {
  function processRowUpdate() {
    console.log("update");
  }
  function handleRowUpdateError() {
    console.log("error");
  }

  const dayInMonthComparator: GridComparatorFn<Date> = (v1, v2) =>
    v1.getDate() - v2.getDate();

  return (
    <>
      <div className="bg-white col-span-full">
        <DataGrid
          checkboxSelection={true}
          columns={[
            {
              field: "label",
              headerName: "Label",
              flex: 1,
              editable: true,
              headerClassName: "super-app-theme--header",
            },
            {
              field: "amount",
              headerName: "Amount",
              flex: 1,
              editable: true,
              headerClassName: "super-app-theme--header",
            },
            {
              field: "date",
              headerName: "Date",
              flex: 1,
              valueGetter: (params) => {
                return new Date(params.value);
              },
              valueParser: (value: any, params: GridCellParams) => {
                return dayjs(value).format("MM/DD/YYYY");
              },
              editable: true,
              type: "date",
              sortComparator: dayInMonthComparator,
              headerClassName: "super-app-theme--header",
            },
            {
              field: "repeated",
              headerName: "Repeated",
              flex: 1,
              editable: true,
              renderCell: (params) => (
                <p>
                  {params.value &&
                    params.value.charAt(0).toUpperCase() +
                      params.value.slice(1)}
                </p>
              ),
              headerClassName: "super-app-theme--header",

              type: "singleSelect",
              valueOptions: ["None", "Weekly", "Biweekly", "Monthly", "Yearly"],
            },
            { field: "type", headerName: "Type", flex: 1, editable: true },
          ]}
          rows={data ? data : []}
          getRowClassName={(params) => `super-app-theme--${params.row.type}`}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleRowUpdateError}
        />
      </div>
    </>
  );
}
