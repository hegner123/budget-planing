"use client";
import { useState, useEffect } from "react";
import { deleteExpenses, updateExpense } from "@budget/supabaseTables";
import { ExpensePayload, ExpenseEntry, ExpenseAdd } from "@budget/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@budget/hooks/auth/useSession";
import useSWR from "swr";

export const useExpenses = () => {
  const [expenses, setExpense] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [fetchedExpenses, setFetched] = useState(false);
  const [expenseLog, setExpenseLog] = useState<string>("");
  const { getSession } = useSession();
  const [user, setUser] = useState<any>(() => getSession());
  const supabaseClient = createClientComponentClient();
  const { data, error, isLoading } = useSWR(`/expenses/${user}`, () =>
    getExpense(user, supabaseClient)
  );

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

  useEffect(() => {
    if (connected) return;
    const LiveExpenses = supabaseClient
      .channel("expense")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Expenses" },
        (payload) => {
          console.log("Change received!", payload);
          handleUpdatedData(payload as ExpensePayload);
        }
      )
      .subscribe();

    function handleUpdatedData(data: ExpensePayload) {
      switch (data.eventType) {
        case "INSERT":
          let newExpenses = [data.new, ...expenses];

          setExpense(newExpenses as ExpenseEntry[]);
          break;
        case "UPDATE":
          const updatedExpenses = expenses.map((entry: ExpenseEntry) => {
            if (entry.uuid === data.new.uuid) {
              return data.new;
            }
            return entry;
          });

          setExpense(updatedExpenses as ExpenseEntry[]);
          break;
        case "DELETE":
          const filteredExpenses = expenses.filter(
            (entry: ExpenseEntry) => entry.uuid !== data.old.uuid
          );

          setExpense(filteredExpenses as ExpenseEntry[]);
          break;
        default:
          console.log("No event type found");
      }
    }
    return () => {
      LiveExpenses.unsubscribe();
    };
  }, [connected, expenses, supabaseClient]);

  return {
    expenses,
    fetchedExpenses,
    expenseLog,
    addExpense,
    deleteExpense,
    updateExpenses,
  };
};
