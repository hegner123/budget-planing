"use client";
import { useState, useEffect } from "react";
import {
  getExpenses,
  addExpenses,
  deleteExpenses,
} from "@budget/supabaseTables";
import { refreshedExpensesAtom } from "@budget/store/state";

import { useAtom } from "jotai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@budget/hooks/auth/useSession";
import { useSnackbar } from "notistack";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [fetchedExpenses, setFetched] = useState(false);
  const [, setRefreshedExpenses] = useAtom(refreshedExpensesAtom);
  const supabase = createClientComponentClient();
  const { enqueueSnackbar } = useSnackbar();
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
          handleUpdatedData(payload);
        }
      )
      .subscribe();
    function handleUpdatedData(data: any) {
      switch (data.eventType) {
        case "INSERT":
          let newExpenses = [data.new, ...expenses];
          setRefreshedExpenses(newExpenses as any);
          setExpenses(newExpenses);
          break;
        case "UPDATE":
          const updatedExpenses = expenses.map((entry: any) => {
            if (entry.uuid === data.new.uuid) {
              return data.new;
            }
            return entry;
          });
          setRefreshedExpenses(updatedExpenses);
          setExpenses(updatedExpenses);
          break;
        case "DELETE":
          const filteredExpenses = expenses.filter(
            (entry: any) => entry.uuid !== data.old.uuid
          );
          setRefreshedExpenses(filteredExpenses);
          setExpenses(filteredExpenses);
          break;
        default:
          console.log("No event type found");
      }
    }
  }, [connected, expenses, supabase, setRefreshedExpenses]);

  useEffect(() => {
    if (fetchedExpenses) return;
    if (!user) return;
    getExpenses({ user: user, supabaseClient: supabase })
      .then((res: any) => {
        setExpenses(res.data);
        setFetched(true);
        // enqueueSnackbar(`Expenses loaded`, { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchedExpenses, supabase, user, enqueueSnackbar]);

  function addExpense(data: any) {
    addExpenses({ ...data, supabaseClient: supabase });
  }

  function deleteExpense(id: string) {
    deleteExpenses({ id, supabaseClient: supabase });
  }

  return {
    expenses,
    fetchedExpenses,

    addExpense,
    deleteExpense,
  };
};
