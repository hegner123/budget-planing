import { Link } from "@mui/material";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expenses/useExpenses";
import useErrorHandler from "@budget/hooks/errorHandle/handler";
import { useState, useEffect, SyntheticEvent } from "react";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpenses/addExpenses";
import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import { hydrateRoot } from "react-dom/client";
import AddIcon from "@mui/icons-material/Add";
import MaterialTable, { MTableActions } from "@material-table/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import { showNotificationAtom, notificationQueAtom } from "@budget/store/state";

const Dashboard = () => {
  const { balance, fetchedBalance } = useBalance();
  const { expenses, fetchedExpenses } = useExpenses();
  const { handleError } = useErrorHandler();
  const [balanceData, setBalanceData] = useState<any>(null);
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationQue, setNotificationQue] = useAtom(notificationQueAtom);

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
  }, [fetchedBalance, balance]);

  function formatDate(date: any) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  function newTestMessage() {
    setShowNotification(true);
    setNotificationQue([
      ...notificationQue,
      {
        id: new Date().toDateString(),
        message: "Test Message",
        type: "success",
      },
    ]);
  }
  return (
    <main className="p-5 dashboard-main">
      <h1 className="mb-5 text-6xl">Dashboard</h1>
      <div className="mb-5 ">
        <ButtonGroup variant="contained">
          <AddIncomeForm />
          <AddExpenseForm />
          <AddBalanceForm />
          <button onClick={() => newTestMessage()}>Test SnackBar</button>
        </ButtonGroup>
      </div>
      {balanceData && (
        <MaterialTable
          title="Balance"
          columns={[
            { title: "Description", field: "name" },
            { title: "Amount", field: "amount" },
            { title: "Debit", field: "debit" },
            { title: "Credit", field: "credit" },
            { title: "Date", field: "date" },
          ]}
          data={balanceData}
        />
      )}
    </main>
  );
};

export default Dashboard;
