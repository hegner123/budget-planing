"use client";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
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
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { darken, lighten, styled } from "@mui/material/styles";

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
  const supabase = createClientComponentClient();

  const { balance, fetchedBalance } = useBalance();
  const { expenses, fetchedExpenses } = useExpenses();
  const { income, fetchedIncome } = useIncome();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
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
  const [, setLoadingAtom] = useAtom(loadingAtom);

  useEffect(() => {
    setLoadingAtom(false);
  }, [setLoadingAtom]);

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
          id: item.id,
          name: item.name,
          [type]: `$${item.amount}`,
          date: formatDate(new Date(item.date)),
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
      sessionStorage.setItem("compiledData", JSON.stringify(sorted));
    }
  }, [balanceData, expenseData, incomeData, setCompiledData]);

  function prepDelete(id: string, type: string) {
    setDeleteEntry(id);
    setDeleteEntryType(type);
  }

  function formatDate(date: any) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
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
                  onClick={() => setOpenDialog(true)}
                  label="Delete"
                />,
              ],
            },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "balance", headerName: "Balance", flex: 1 },
            { field: "income", headerName: "Income", flex: 1 },
            { field: "expenses", headerName: "Expenses", flex: 1 },
            { field: "date", headerName: "Date", flex: 1 },
          ]}
          rows={data ? data : []}
          getRowClassName={(params) => `super-app-theme--${params.row.type}`}
        />
      </div>
      <DeleteDialog open={openDialog} close={() => setOpenDialog(false)} />
    </main>
  );
}
