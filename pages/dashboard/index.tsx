import Link from "next/link";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expenses/useExpenses";
import { useIncome } from "@budget/hooks/income/useIncome";
import useErrorHandler from "@budget/hooks/errorHandle/handler";
import { useState, useEffect, SyntheticEvent } from "react";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpenses/addExpenses";
import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import { useRouter } from "next/router";
import MaterialTable, { MTableActions } from "@material-table/core";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@budget/components/dialogs/deleteDialog";
import { useAtom } from "jotai";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";

const Dashboard = () => {
  const { balance, fetchedBalance } = useBalance();
  const { expenses, fetchedExpenses, deleteExpense } = useExpenses();
  const { income, fetchedIncome } = useIncome();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { handleError } = useErrorHandler();
  const [balanceData, setBalanceData] = useState<any>(null);
  const [expenseData, setExpenseData] = useState<any>(null);
  const [incomeData, setIncomeData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [, setNotificationMessage] = useAtom(notificationMessageAtom);
  const router = useRouter();

  useEffect(() => {
    if (!balance) return;
    let parsedBalanceData = balance?.data?.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        amount: `$${item.amount}`,
        date: formatDate(new Date(item.date)),
      };
    });
    setBalanceData(parsedBalanceData);
    let parsedExpensesData = expenses?.data?.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        expenses: `$${item.amount}`,
        date: formatDate(new Date(item.date)),
      };
    });
    setExpenseData(parsedExpensesData);
    let parsedIncomeData = income?.data?.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        income: `$${item.amount}`,
        date: formatDate(new Date(item.date)),
      };
    });
    setIncomeData(parsedIncomeData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [
    fetchedBalance,
    balance,
    expenses,
    fetchedExpenses,
    income,
    fetchedIncome,
  ]);

  function handleDelete(id: string) {
    deleteExpense(id);
    setShowNotification(true);
    setNotificationMessage("Expense Deleted");
  }

  useEffect(() => {
    if (balanceData && expenseData && incomeData) {
      setData([...balanceData, ...expenseData, ...incomeData]);
    }
  }, [balanceData, expenseData, incomeData]);

  function formatDate(date: any) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return (
    <main className="p-5 dashboard-main">
      <h1 className="mt-5 mb-5 text-6xl">Dashboard</h1>
      <div className="flex justify-between mb-5">
        <ButtonGroup>
          <AddBalanceForm />
          <AddIncomeForm />
          <AddExpenseForm />
        </ButtonGroup>
        <Link href="/dashboard/forecast">
          <Button
            variant="contained"
            className="text-black bg-[#1976d2] border-[#1976d2] hover:text-white hover:bg-black hover:border-white border-solid border-2">
            Forecast
          </Button>
        </Link>
      </div>
      {data && (
        <MaterialTable
          isLoading={loading}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete",
              onClick: (e, rowData: any) => {
                setOpenDialog(true);
                handleDelete(rowData.id);
              },
            },
          ]}
          components={{
            Actions: (props) => {
              return (
                <>
                  <div className="text-white cursor-pointer">
                    {props.actions.map((action: any) => {
                      return (
                        <div className="flex justify-between" key={action.icon}>
                          <div
                            className="mr-5"
                            onClick={(e) => action.onClick(e, props.data)}>
                            <DeleteIcon />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            },
          }}
          title="Balance"
          columns={[
            { title: "Description", field: "name" },
            { title: "Amount", field: "amount" },
            { title: "Income", field: "income" },
            { title: "Expenses", field: "expenses" },
            { title: "Date", field: "date" },
          ]}
          data={data}
          options={{
            headerStyle: { color: "white", background: "black" },
            pageSize: 20,
          }}
          style={{ background: "black", color: "white" }}
        />
      )}
      <DeleteDialog open={openDialog} close={() => setOpenDialog(false)} />
    </main>
  );
};

export default Dashboard;
