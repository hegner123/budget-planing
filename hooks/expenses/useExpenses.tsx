import { useState, useEffect } from "react";
import { getExpenses } from "@budget/supabaseTables";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useAtom } from "jotai";
import { showNotificationAtom, notificationQueAtom } from "@budget/store/state";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(null);
  const [fetchedExpenses, setFetched] = useState(false);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationQue, setNotificationQue] = useAtom(notificationQueAtom);

  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (fetchedExpenses) return;
    if (!user) return;
    getExpenses(user?.id, supabaseClient)
      .then((data: any) => {
        setFetched(true);
        setShowNotification(true);
        setNotificationQue([
          ...notificationQue,
          {
            id: new Date().toDateString(),
            message: "Balance fetched",
            type: "success",
          },
        ]);
        setExpenses(data);
      })
      .catch((err) => {
        console.log(err);

        setShowNotification(true);
        setNotificationQue([
          ...notificationQue,
          {
            id: new Date().toDateString(),
            message: "Balance fetched",
            type: "success",
          },
        ]);
      });
  }, [fetchedExpenses, supabaseClient, user]);

  function addExpense(e: any) {}

  return { expenses, fetchedExpenses, addExpense };
};
