"use client";
import { useState, useEffect } from "react";
import {
  getExpenses,
  addExpenses,
  deleteExpenses,
  updateExpense,
} from "@budget/supabaseTables";
import useSWR from "swr";
import { refreshedExpensesAtom } from "@budget/store/state";
import {
  ExpensePayload,
  ExpenseEntry,
  ExpenseUpdateObject,
  ExpenseUpdateHook,
  ExpenseAdd,
  ExpenseAddHook,
} from "@budget/types";
import { useAtom } from "jotai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@budget/hooks/auth/useSession";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [fetchedExpenses, setFetched] = useState(false);
  const [, setRefreshedExpenses] = useAtom(refreshedExpensesAtom);
  const supabaseClient = createClientComponentClient();
  const { user } = useSession();
  const { data, error, isLoading } = useSWR(`/expenses/${user}`, () =>
    getExpenses(user, supabaseClient)
  );

  async function getExpenses(user: string, supabaseClient: any) {
    if (!user) return;
    let { data, error } = await supabaseClient
      .from("Expenses")
      .select("*")
      .eq("user", user);
    return { data, error };
  }

  useEffect(() => {
    if (data) {
      setExpenses(data?.data);
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
          setRefreshedExpenses(newExpenses as ExpenseEntry[]);
          setExpenses(newExpenses as ExpenseEntry[]);
          break;
        case "UPDATE":
          const updatedExpenses = expenses.map((entry: ExpenseEntry) => {
            if (entry.uuid === data.new.uuid) {
              return data.new;
            }
            return entry;
          });
          setRefreshedExpenses(updatedExpenses as ExpenseEntry[]);
          setExpenses(updatedExpenses as ExpenseEntry[]);
          break;
        case "DELETE":
          const filteredExpenses = expenses.filter(
            (entry: ExpenseEntry) => entry.uuid !== data.old.uuid
          );
          setRefreshedExpenses(filteredExpenses as ExpenseEntry[]);
          setExpenses(filteredExpenses as ExpenseEntry[]);
          break;
        default:
          console.log("No event type found");
      }
    }
    return () => {
      LiveExpenses.unsubscribe();
    };
  }, [connected, expenses, supabaseClient, setRefreshedExpenses]);

  function addExpense(data: ExpenseAdd) {
    addExpenses({ ...data, supabaseClient } as ExpenseAddHook);
  }

  function deleteExpense(id: string) {
    deleteExpenses({ id, supabaseClient } as {
      id: string;
      supabaseClient: any;
    });
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

  return {
    expenses,
    fetchedExpenses,
    addExpense,
    deleteExpense,
    updateExpenses,
  };
};
