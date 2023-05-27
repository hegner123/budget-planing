import { useState, useEffect } from "react";
import {
  getExpenses,
  addExpenses,
  deleteExpenses,
} from "@budget/supabaseTables";
import { refreshedExpensesAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any>(null);
  const [fetchedExpenses, setFetched] = useState(false);
  const [, setRefreshedExpenses] = useAtom(refreshedExpensesAtom);
  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (fetchedExpenses) return;
    if (!user) return;
    getExpenses(user?.id, supabaseClient)
      .then((res: any) => {
        setExpenses(res.data);
        setFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchedExpenses, supabaseClient, user]);

  const LiveExpenses = supabaseClient
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
    addExpenses({ ...data, supabaseClient: supabaseClient });
  }

  function deleteExpense(id: string) {
    deleteExpenses(id, supabaseClient);
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
