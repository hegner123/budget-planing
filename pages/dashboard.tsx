import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expenses/useExpenses";
import { useIncome } from "@budget/hooks/income/useIncome";
import useErrorHandler from "@budget/hooks/errorHandle/handler";
import { useState, useEffect, SyntheticEvent } from "react";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpenses/addExpenses";
import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import { hydrateRoot } from "react-dom/client";
import MaterialTable, { MTableActions } from "@material-table/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAtom } from "jotai";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";

const Dashboard = () => {
  const { balance, fetchedBalance } = useBalance();
  const { expenses, fetchedExpenses } = useExpenses();
  const { income, fetchedIncome } = useIncome();
  const { handleError } = useErrorHandler();
  const [balanceData, setBalanceData] = useState<any>(null);
  const [expenseData, setExpenseData] = useState<any>(null);
  const [incomeData, setIncomeData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [, setNotificationMessage] = useAtom(notificationMessageAtom);

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
  }, [
    fetchedBalance,
    balance,
    expenses,
    fetchedExpenses,
    income,
    fetchedIncome,
  ]);

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
      <h1 className="mb-5 text-6xl">Dashboard</h1>
      <div className="mb-5 ">
        <ButtonGroup>
          <AddBalanceForm />
          <AddIncomeForm />
          <AddExpenseForm />
        </ButtonGroup>
      </div>
      {data && (
        <MaterialTable
          title="Balance"
          columns={[
            { title: "Description", field: "name" },
            { title: "Amount", field: "amount" },
            { title: "Expenses", field: "expenses" },
            { title: "Income", field: "income" },
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
    </main>
  );
};

export default Dashboard;
