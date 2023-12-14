"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useIncome } from "@budget/hooks/income/useIncome";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpense/addExpense";
import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import DeleteDialog from "@budget/components/dialogs/deleteDialog";
import ImportDialog from "@budget/components/dialogs/importDialog";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAtom } from "jotai";
import useSession from "@budget/hooks/auth/useSession";
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
  GridColDef,
  GridComparatorFn,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { updateBalance } from "@budget/supabaseTables";
import { useSubscribe } from "@budget/hooks/subscribe/useSubscribe";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  const supabaseClient = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const { balance, fetchedBalance } = useBalance();
  const { expenses, fetchedExpenses, updateExpenses } = useExpenses();
  const { income, fetchedIncome, updateIncomeEntry } = useIncome();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<any>(false);
  const [openImportDialog, setOpenImportDialog] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const [balanceData, setBalanceData] = useState<any>(null);
  const [expenseData, setExpenseData] = useState<any>(null);
  const [incomeData, setIncomeData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [rowUpdating, setRowUpdating] = useState<boolean>(false);
  const [, setDeleteEntry] = useAtom(deleteEntryAtom);
  const [, setDeleteEntryType] = useAtom(deleteEntryTypeAtom);
  const [, setCompiledData] = useAtom(compiledDataAtom);
  const { updatedBalance, updatedIncome, updatedExpense } = useSubscribe(
    balance,
    income,
    expenses
  );
  const { getSession } = useSession();

  console.log(getSession());

  if (!user) {
    getSession().then((res) => {
      setUser(res.data.session.user.id as string);
    });
  }

  if (user === "842f7daf-6d49-425a-a6d8-09484a1b9457") {
    console.log("demo");
  }
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
          repeated: item.repeated ? item.repeated : null,
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
      if (rowUpdating) {
        return;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceData, expenseData, incomeData, setCompiledData, enqueueSnackbar]);

  function prepDelete(id: string, type: string) {
    setDeleteEntry(id);
    setDeleteEntryType(type);
    setOpenDeleteDialog(true);
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
              updateBalance({ newRow, supabaseClient }).then((res) => {
                setRowUpdating(true);
                console.log(res);
                resolve(res.newRow);
              });
            } catch (error) {
              console.error(error);
              reject(error);
            }
            break;
          case "expenses":
            try {
              updateExpenses(newRow).then((res) => {
                setRowUpdating(true);
                resolve(res.data);
              });
            } catch (error) {
              console.error(error);
              reject(error);
            }

            break;
          case "income":
            try {
              updateIncomeEntry(newRow).then((res) => {
                setRowUpdating(true);
                resolve(res.data);
              });
            } catch (error) {
              console.error(error);
              reject(error);
            }
            break;
          default:
            break;
        }
        setRowUpdating(false);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRowUpdateError = useCallback(async (error) => {
    enqueueSnackbar(`${error}`, { variant: "error" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDeleteSelectedRows() {}

  const dayInMonthComparator: GridComparatorFn<Date> = (v1, v2) =>
    v1.getDate() - v2.getDate();

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
