"use client";
import { useEffect } from "react";
import { useLogin } from "@budget/hooks/auth/useLogin";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useIncome } from "@budget/hooks/income/useIncome";
import {
  demoBalance,
  demoIncome,
  demoExpenses,
} from "@budget/constants/demo-data";
import { deleteUserData } from "@budget/supabaseTables";

export default function DemoLogin() {
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin();
  const { addBalance } = useBalance();
  const { addExpense } = useExpenses();
  const { addIncome } = useIncome();

  useEffect(() => {
    const clearData = () => {};
    const refreshDemo = () => {
      addBalance([{ ...demoBalance, user: "demo" }]);
      addIncome(demoIncome);
      addExpense(demoExpenses[0]);
      addExpense(demoExpenses[1]);
    };
    const demoLogin = () => {
      setEmail("demo@budgetforecast.io");
      setPassword("delete#me");
      handleSubmit();
    };
    refreshDemo();
    demoLogin();

    return () => {
      console.log("unmount");
    };
  }, [handleSubmit, setEmail, setPassword]);
}
