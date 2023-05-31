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

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any>(null);
  const [fetchedExpenses, setFetched] = useState(false);
  const [, setRefreshedExpenses] = useAtom(refreshedExpensesAtom);
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSupabaseSession() {
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
      return { data: data.session.user.id, error: error };
    }
    getSupabaseSession()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [supabase.auth]);

  useEffect(() => {
    if (fetchedExpenses) return;
    if (!user) return;
    getExpenses({ user: user?.id, supabaseClient: supabase })
      .then((res: any) => {
        setExpenses(res.data);
        setFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchedExpenses, supabase, user]);

  const LiveExpenses = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Expenses" },
      (payload) => {
        console.log("Change received!", payload);
        handleUpdatedData(payload);
      }
    )
    .subscribe();

  function addExpense(data: any) {
    addExpenses({ ...data, supabaseClient: supabase });
  }

  function deleteExpense(id: string) {
    deleteExpenses({ id, supabaseClient: supabase });
  }

  function handleUpdatedData(data: any) {
    switch (data.eventType) {
      case "INSERT":
        let newExpenses = [data.new, ...expenses];
        setRefreshedExpenses(newExpenses as any);
        setExpenses(newExpenses);
        break;
      case "UPDATE":
        const updatedExpenses = expenses.map((entry: any) => {
          if (entry.id === data.new.id) {
            return data.new;
          }
          return entry;
        });
        setRefreshedExpenses(updatedExpenses);
        setExpenses(updatedExpenses);
        break;
      case "DELETE":
        const filteredExpenses = expenses.filter(
          (entry: any) => entry.id !== data.old.id
        );
        setRefreshedExpenses(filteredExpenses);
        setExpenses(filteredExpenses);
        break;
      default:
        console.log("No event type found");
    }
  }

  return {
    expenses,
    fetchedExpenses,
    LiveExpenses,
    addExpense,
    deleteExpense,
  };
};
