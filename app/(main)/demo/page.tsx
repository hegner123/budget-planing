"use client";
import { useEffect } from "react";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useIncome } from "@budget/hooks/income/useIncome";
import { demoData } from "@budget/constants/demo-data";
import { deleteUserData } from "@budget/supabaseTables";
import useLogin from "@budget/hooks/auth/useLogin";
import useSession from "@budget/hooks/auth/useSession";
import useRegister from "@budget/hooks/auth/useRegister";

export default function DemoLogin() {
  const register = useRegister();
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin();
  const { demoBalance, demoIncome, demoExpenses } = demoData();
  const { getSession } = useSession();
  const { addBalance } = useBalance();
  const { addExpense } = useExpenses();
  const { addIncome } = useIncome();

  useEffect(() => {
    const clearData = () => {};
    const refreshDemo = () => {
      addBalance(demoBalance("demo"));
      addIncome(demoIncome("demo"));
      let expenses = demoExpenses("demo");
      addExpense(expenses[0]);
      addExpense(expenses[1]);
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
  }, [
    handleSubmit,
    setEmail,
    setPassword,
    addBalance,
    addExpense,
    addIncome,
    demoBalance,
    demoExpenses,
    demoIncome,
  ]);
}
