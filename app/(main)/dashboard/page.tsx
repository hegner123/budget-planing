"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expenses/useExpenses";
import { useIncome } from "@budget/hooks/income/useIncome";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpenses/addExpenses";
import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@budget/components/dialogs/deleteDialog";
import { useAtom } from "jotai";
import {
  loadingAtom,
  deleteEntryAtom,
  deleteEntryTypeAtom,
  refreshedBalanceAtom,
  refreshedExpensesAtom,
  refreshedIncomeAtom,
  compiledDataAtom,
} from "@budget/store/state";
import {
  DataGrid,
  GridActionsCellItem,
  GridEventListener,
} from "@mui/x-data-grid";

import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .super-app-theme--balance": {
    backgroundColor: "#dde0fe",
  },
  "& .super-app-theme--income": {
    backgroundColor: "#ddfee8",
  },
  "& .super-app-theme--expenses": {
    backgroundColor: "#fee7dd",
  },
}));

export default function Dashboard() {
  const { balance, fetchedBalance } = useBalance();
  const { expenses, fetchedExpenses, updateExpenses } = useExpenses();
  const { income, fetchedIncome, updateIncomeEntry } = useIncome();
  const [openDialog, setOpenDialog] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [balanceData, setBalanceData] = useState<any>(null);
  const [expenseData, setExpenseData] = useState<any>(null);
  const [incomeData, setIncomeData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [, setDeleteEntry] = useAtom(deleteEntryAtom);
  const [, setDeleteEntryType] = useAtom(deleteEntryTypeAtom);
  const [, setCompiledData] = useAtom(compiledDataAtom);
  const [refreshedBalance] = useAtom(refreshedBalanceAtom);
  const [refreshedExpenses] = useAtom(refreshedExpensesAtom);
  const [refreshedIncome] = useAtom(refreshedIncomeAtom);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setBalanceData(parseData(balance, "balance"));
    setExpenseData(parseData(expenses, "expenses"));
    setIncomeData(parseData(income, "income"));
    if (refreshedBalance.length > 0) {
      setBalanceData(parseData(refreshedBalance, "balance"));
    }
    if (refreshedExpenses.length > 0) {
      setExpenseData(parseData(refreshedExpenses, "expenses"));
    }
    if (refreshedIncome.length > 0) {
      setIncomeData(parseData(refreshedIncome, "income"));
    }

    function parseData(data: any, type: string) {
      let parsedData = data?.map((item: any) => {
        return {
          id: item.uuid,
          name: item.name,
          [type]: `$${item.amount}`,
          date: formatDate(new Date(item.date)),
          repeated: item.repeated,
          type: type,
        };
      });
      return parsedData;
    }
  }, [
    balance,
    expenses,
    income,
    fetchedBalance,
    fetchedExpenses,
    fetchedIncome,
    refreshedBalance,
    refreshedExpenses,
    refreshedIncome,
  ]);

  useEffect(() => {
    if (balanceData && expenseData && incomeData) {
      setTableData(balanceData, expenseData, incomeData);
      setLoading(false);
    }

    function setTableData(balanceData: any, expenseData: any, incomeData: any) {
      let combined = [...balanceData, ...expenseData, ...incomeData];
      let sorted = combined.sort((a: any, b: any) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setData(sorted);
      setCompiledData(sorted as any);
      localStorage.setItem("compiledData", JSON.stringify(sorted));
      enqueueSnackbar("Data loaded", { variant: "success" });
    }
  }, [balanceData, expenseData, incomeData, setCompiledData, enqueueSnackbar]);

  function prepDelete(id: string, type: string) {
    setDeleteEntry(id);
    setDeleteEntryType(type);
    setOpenDialog(true);
  }

  function formatDate(date: any) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const updateCell = (
    type: string,
    id: string,
    column: string,
    value: string
  ) => {
    switch (type) {
      case "balance":
        break;
      case "expenses":
        updateExpenses({ id: id, column: column, value: value });
        break;
      case "income":
        updateIncomeEntry({ id: id, column: column, value: value });
        break;
      default:
        break;
    }
  };

  const handleSaveEvent: GridEventListener<"rowClick"> = (
    params: any, // GridRowParams
    event: any, // MuiEvent<React.MouseEvent<HTMLElement>>
    details: any // GridCallbackDetails
  ) => {
    enqueueSnackbar(`${params.field} : ${params.value}`, {
      variant: "success",
    });

    updateCell(params.row.type, params.row.id, params.field, params.value);
  };

  const processRowUpdate = useCallback(async (newRow) => {
    console.log("newrow", newRow);
    // const response = await updateCell(newRow);
    enqueueSnackbar("User successfully saved", { variant: "success" });
    // return response;
  }, []);

  return (
    <main className="p-5 dashboard-main">
      <h2 className="self-end mt-2 mb-2 text-3xl text-white">Overview</h2>
      <div className="flex gap-3 mb-2">
        <ButtonGroup>
          <AddBalanceForm />
          <AddIncomeForm />
          <AddExpenseForm />
        </ButtonGroup>
        <Link href="/forecast" className="self-end ml-auto">
          <Button
            variant="contained"
            className="text-black bg-[#1976d2] border-[#1976d2] hover:text-white hover:bg-black hover:border-white border-solid border-2">
            Forecast
          </Button>
        </Link>
      </div>

      <div className="col-span-10 col-start-2 bg-white">
        <StyledDataGrid
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
            },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "balance", headerName: "Balance", flex: 1 },
            { field: "income", headerName: "Income", flex: 1 },
            { field: "expenses", headerName: "Expenses", flex: 1 },
            { field: "date", headerName: "Date", flex: 1 },
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

              type: "singleSelect",
              valueOptions: ["none", "weekly", "biweekly", "monthly", "yearly"],
            },
          ]}
          rows={data ? data : []}
          getRowClassName={(params) => `super-app-theme--${params.row.type}`}
          processRowUpdate={processRowUpdate}
          onCellEditStop={handleSaveEvent}
        />
      </div>
      <DeleteDialog open={openDialog} close={() => setOpenDialog(false)} />
    </main>
  );
}
