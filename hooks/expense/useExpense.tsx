"use client";
import { useState, useEffect } from "react";
import { deleteExpenses, updateExpense } from "@budget/supabaseTables";
import { ExpenseAdd } from "@budget/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSession from "@budget/hooks/auth/useSession";
import useSWR from "swr";

export const useExpenses = () => {
  const supabaseClient = createClientComponentClient();
  const [expenses, setExpense] = useState<any>(null);

  const [fetchedExpenses, setFetched] = useState(false);
  const [expenseLog, ] = useState<string>("");
  const [user, setUser] = useState<any>("");
  const { getSession } = useSession();
  const { data, error, isLoading } = useSWR(`/expenses/${user}`, () =>
    getExpense(user, supabaseClient)
  );

    if (error) {
        console.error(error)
    }

  useEffect(() => {
    getSession().then((res) => {
      setUser(res.data.session.user.id);
    });
  }, [getSession]);

  async function getExpense(user: string, supabaseClient: any) {
    if (!user) return;
    let { data, error } = await supabaseClient
      .from("Expenses")
      .select("*")
      .eq("user", user);
    return { data, error };
  }

  async function addExpense({
    user,
    name,
    amount,
    repeated,
    date,
  }: ExpenseAdd) {
    if (!user) throw new Error("No user provided");
    if (!name) throw new Error("No name provided");
    if (!amount) throw new Error("No amount provided");

    const { data, error } = await supabaseClient.from("Expenses").insert([
      {
        user: `${user}`,
        name: `${name}`,
        amount: `${amount}`,
        repeated: repeated,
        date: `${date}`,
      },
    ]);

    return { data, error };
  }

  async function deleteExpense(id: string) {
    const { data, error } = await deleteExpenses({ id, supabaseClient } as {
      id: string;
      supabaseClient: any;
    });
    return { data, error };
  }

  async function updateExpenses(newRow) {
    const { data, error } = await updateExpense({
      newRow,
      supabaseClient,
    });
    if (data === null && error === null) {
      return { data: newRow, error: null };
    }
    return { data, error };
  }

  useEffect(() => {
    if (data) {
      setExpense(data?.data);
      setFetched(true);
    }
  }, [data, isLoading]);

  return {
    expenses,
    fetchedExpenses,
    expenseLog,
    addExpense,
    deleteExpense,
    updateExpenses,
  };
};
