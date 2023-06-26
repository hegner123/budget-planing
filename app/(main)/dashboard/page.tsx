"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useIncome } from "@budget/hooks/income/useIncome";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpense/addExpense";
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
  compiledDataAtom,
} from "@budget/store/state";
import {
  DataGrid,
  GridActionsCellItem,
  GridEventListener,
  GridRowModel,
  GridCellParams,
} from "@mui/x-data-grid";

import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { updateBalance } from "@budget/supabaseTables";
import { useSubscribe } from "@budget/hooks/subscribe/useSubscribe";

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
  const { updatedBalance, updatedIncome, updatedExpense } = useSubscribe(
    balance,
    income,
    expenses
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedBalance) {
      enqueueSnackbar("Balance Updated", { variant: "success" });
      setBalanceData(parseData(updatedBalance, "balance"));
    }
    if (updatedIncome) {
      enqueueSnackbar("Income Updated", { variant: "success" });
      setIncomeData(parseData(updatedIncome, "income"));
    }
    if (updatedExpense) {
      enqueueSnackbar("Expense Updated", { variant: "success" });
      setExpenseData(parseData(updatedExpense, "expenses"));
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
  }, [updatedBalance, updatedIncome, updatedExpense, enqueueSnackbar]);

  useEffect(() => {
    setBalanceData(parseData(balance, "balance"));
    setExpenseData(parseData(expenses, "expenses"));
    setIncomeData(parseData(income, "income"));

    function parseData(data: any, type: string) {
      let parsedData = data?.map((item: any) => {
        return {
          id: item.uuid,
          name: item.name,
          amount: item.amount,
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
    return `${dayjs(date).add(1, "day").format("MM/DD/YYYY")}`;
  }

  const processRowUpdate = useCallback(
    (newRow: any) =>
      new Promise((resolve, reject) => {
        switch (newRow.type) {
          case "balance":
            try {
              updateBalance(newRow).then((res) => {
                resolve(res.data);
              });
            } catch (error) {
              reject(error);
            }
            break;
          case "expenses":
            try {
              updateExpenses(newRow).then((res) => {
                resolve(res.data);
              });
            } catch (error) {
              reject(error);
            }

            break;
          case "income":
            try {
              updateIncomeEntry(newRow).then((res) => {
                resolve(res.data);
              });
            } catch (error) {
              console.log(error);
            }
            break;
          default:
            break;
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRowUpdateError = useCallback(async (error) => {
    enqueueSnackbar(`${error}`, { variant: "error" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Link href="/forecast-test" className="self-end ml-auto">
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
              headerClassName: "super-app-theme--header",
            },
            {
              field: "name",
              headerName: "Name",
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
      <DeleteDialog open={openDialog} close={() => setOpenDialog(false)} />
    </main>
  );
}
