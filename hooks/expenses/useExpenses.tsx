"use client";
import { useState, useEffect } from "react";
import {
  getExpenses,
  addExpenses,
  deleteExpenses,
  updateExpense,
} from "@budget/supabaseTables";
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
  const supabase = createClientComponentClient();

  const { user } = useSession();

  useEffect(() => {
    if (connected) return;
    const LiveExpenses = supabase
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
  }, [connected, expenses, supabase, setRefreshedExpenses]);

  useEffect(() => {
    if (fetchedExpenses) return;
    if (!user) return;
    getExpenses({ user: user, supabaseClient: supabase } as {
      user: string;
      supabaseClient: any;
    })
      .then((res: any) => {
        setExpenses(res.data);
        setFetched(true);
      })
      .catch((err: string) => {
        console.log(err as string);
      });
  }, [fetchedExpenses, supabase, user]);

  function addExpense(data: ExpenseAdd) {
    addExpenses({ ...data, supabaseClient: supabase } as ExpenseAddHook);
  }

  function deleteExpense(id: string) {
    deleteExpenses({ id, supabaseClient: supabase } as {
      id: string;
      supabaseClient: any;
    });
  }

  function updateExpenses({ id, column, value }: ExpenseUpdateHook) {
    updateExpense({
      id,
      column,
      value,
      supabaseClient: supabase,
    } as ExpenseUpdateObject);
  }

  return {
    expenses,
    fetchedExpenses,
    addExpense,
    deleteExpense,
    updateExpenses,
  };
};
