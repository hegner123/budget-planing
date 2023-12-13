"use client";
import { useEffect } from "react";
import { useBalance } from "@budget/hooks/balance/useBalance";
import { useExpenses } from "@budget/hooks/expense/useExpense";
import { useIncome } from "@budget/hooks/income/useIncome";
import { demoData } from "@budget/constants/demo-data";
import { useDeleteAccountData } from "@budget/hooks/admin/useAdmin";
import useLogin from "@budget/hooks/auth/useLogin";
import useSession from "@budget/hooks/auth/useSession";
import useRegister from "@budget/hooks/auth/useRegister";

export default function DemoLogin() {
  const register = useRegister();
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin();

  const { getSession } = useSession();

  const { handleDeleteAccountData } = useDeleteAccountData();

  useEffect(() => {
    const clearData = () => {
      handleDeleteAccountData();
    };

    const demoLogin = () => {
      setEmail("demo@budgetforecast.io");
      setPassword("delete#me");
      handleSubmit();
    };
    clearData();
    demoLogin();

    return () => {
      console.log("unmount");
    };
  }, [handleDeleteAccountData, handleSubmit, setEmail, setPassword]);
  return (
    <>
      <DemoData />
    </>
  );
}

export const DemoData = () => {
  const { addBalance } = useBalance();
  const { addExpense } = useExpenses();
  const { addIncome } = useIncome();
  const { demoBalance, demoIncome, demoExpenses } = demoData();
  useEffect(() => {
    const refreshDemo = () => {
      addBalance(demoBalance("demo"));
      addIncome(demoIncome("demo"));
      let expenses = demoExpenses("demo");
      addExpense(expenses[0]);
      addExpense(expenses[1]);
    };
    refreshDemo();
  }, [
    addBalance,
    addExpense,
    addIncome,
    demoBalance,
    demoExpenses,
    demoIncome,
  ]);
  return <></>;
};