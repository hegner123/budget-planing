"use client";


import React from "react";
import dayjs from "dayjs";

import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpense/addExpense";
import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import DeleteDialog from "@budget/components/dialogs/deleteDialog";
import ImportDialog from "@budget/components/dialogs/importDialog";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  DataGrid,
  GridActionsCellItem,
  GridEventListener,
  GridRowModel,
  GridCellParams,
  GridColDef,
  GridComparatorFn,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import useSupabaseFetch from "@budget/hooks/fetch/useSupabaseFetch";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  ".super-app-theme--header": {
    backgroundColor: "#ffffff",
    color: "#1f1f1f",
  },
  ".super-app-theme--header button": {
    color: "#1f1f1f",
  },
  "& .super-app-theme--balance": {
    backgroundColor: "#d2d6fd",
    color: "#1f1f1f",
  },
  "& .super-app-theme--income": {
    backgroundColor: "#e8fff1",
    color: "#1f1f1f",
  },
  "& .super-app-theme--expenses": {
    backgroundColor: "#fbdada",
    color: "#1f1f1f",
  },
}));

export default function Dashboard() {
  const {
    data,
    handleRowUpdateError,
    dayInMonthComparator,
    handleDeleteSelectedRows,
    processRowUpdate,
    prepDelete,
    setOpenImportDialog,
    openImportDialog,
    openDeleteDialog,
    setOpenDeleteDialog,
  } = useSupabaseFetch();
  return (
    <main className="p-5 dashboard-main">
      <h2 className="self-end mt-2 mb-2 text-3xl text-white">Overview</h2>
      <div className="flex gap-3 mb-2">
        <ButtonGroup>
          <Button variant="outlined" onClick={() => handleDeleteSelectedRows()}>
            Delete
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <AddBalanceForm />
          <AddIncomeForm />
          <AddExpenseForm />
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outlined"
            onClick={() => setOpenImportDialog(!openImportDialog)}>
            Import
          </Button>
        </ButtonGroup>
      </div>

      <div className="col-span-10 col-start-2 bg-white">
        <StyledDataGrid
          checkboxSelection={true}
          columns={[
            {
              field: "delete",
              headerName: "Delete",
              type: "actions",
              getActions: (params) => [
                <GridActionsCellItem
                  key={params.id}
                  icon={<DeleteIcon />}
                  onClick={() => prepDelete(`${params.id}`, params.row.type)}
                  label="Delete"
                />,
              ],
              headerClassName: "super-app-theme--header",
            },
            {
              field: "name",
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
          ]}
          rows={data ? data : []}
          getRowClassName={(params) => `super-app-theme--${params.row.type}`}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleRowUpdateError}
        />
      </div>
      <DeleteDialog
        open={openDeleteDialog}
        close={() => setOpenDeleteDialog(false)}
      />
      <ImportDialog
        open={openImportDialog}
        close={() => setOpenImportDialog(false)}
      />
    </main>
  );
}
