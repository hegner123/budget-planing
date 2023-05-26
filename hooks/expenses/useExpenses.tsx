import { useState, useEffect } from "react";
import { getExpenses } from "@budget/supabaseTables";
import { ExpenseObject } from "@budget/types/expenses";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useAtom } from "jotai";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any>(null);
  const [fetchedExpenses, setFetched] = useState(false);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationMessage, setNotificationMessage] = useAtom(
    notificationMessageAtom
  );

  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (fetchedExpenses) return;
    if (!user) return;
    getExpenses(user?.id, supabaseClient)
      .then((data: any) => {
        setFetched(true);
        setExpenses(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    fetchedExpenses,
    supabaseClient,
    user,
    notificationMessage,
    setShowNotification,
    setNotificationMessage,
  ]);

  function addExpense(e: any) {}

  return { expenses, fetchedExpenses, addExpense };
};
