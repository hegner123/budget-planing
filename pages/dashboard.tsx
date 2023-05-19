import { Link } from "@mui/material";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";

const Dashboard = () => {
  const { balance, fetched } = useBalance();
  useEffect(() => {
    if (!fetched) return;
    console.log(balance);
  }, [fetched, balance]);
  return (
    <main className="p-5">
      <h1 className="text-6xl">Dashboard</h1>
      <Link href="/login">Login</Link>
      <MaterialTable
        title="Balance"
        columns={[
          { title: "Amount", field: "amount" },
          { title: "Debit", field: "debit" },
          { title: "Credit", field: "credit" },
          { title: "Date", field: "date" },
        ]}
        data={[{ amount: "$400", date: "05/18/23" }]}
      />
    </main>
  );
};

export default Dashboard;
