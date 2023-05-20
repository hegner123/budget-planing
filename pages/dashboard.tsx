import { Link } from "@mui/material";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useState, useEffect } from "react";
import { AddIncomeForm } from "@budget/components/addIncome/addIncome";
import { AddExpenseForm } from "@budget/components/addExpenses/addExpenses";
import { AddBalanceForm } from "@budget/components/addBalance/addBalance";
import { hydrateRoot } from "react-dom/client";
import AddIcon from "@mui/icons-material/Add";
import MaterialTable, { MTableActions } from "@material-table/core";

const Dashboard = () => {
  const { balance, fetched } = useBalance();
  useEffect(() => {
    if (!fetched) return;
    console.log(balance);
  }, [fetched, balance]);
  return (
    <main className="p-5">
      <h1 className="mb-5 text-6xl">Dashboard</h1>
      <div className="mb-5 ">
        <AddIncomeForm />
        <AddExpenseForm />
        <AddBalanceForm />
      </div>
      <MaterialTable
        title="Balance"
        columns={[
          { title: "Amount", field: "amount" },
          { title: "Debit", field: "debit" },
          { title: "Credit", field: "credit" },
          { title: "Date", field: "date" },
        ]}
        data={[{ id: "1", amount: "$400", date: "05/18/23" }]}
      />
    </main>
  );
};

export default Dashboard;
