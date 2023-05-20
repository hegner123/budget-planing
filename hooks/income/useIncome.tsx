import { useState, useEffect } from "react";
import { getIncomes } from "@budget/supabaseTables";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useAtom } from "jotai";
import { showNotificationAtom, notificationQueAtom } from "@budget/store/state";

export const useIncome = () => {
  const [income, setIncome] = useState(null);
  const [fetchedIncome, setFetched] = useState(false);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationQue, setNotificationQue] = useAtom(notificationQueAtom);
  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (fetchedIncome) return;
    if (!user) return;
    getIncomes(user?.id, supabaseClient)
      .then((data: any) => {
        setFetched(true);
        setShowNotification(true);
        setNotificationQue([
          ...notificationQue,
          {
            id: new Date().toDateString(),
            message: "Income fetched",
            type: "success",
          },
        ]);
        setIncome(data);
      })
      .then((err: any) => {
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
  }, [
    fetchedIncome,
    supabaseClient,
    user,
    notificationQue,
    setShowNotification,
    setNotificationQue,
  ]);

  function addIncome(e: any) {}

  return { income, fetchedIncome, addIncome };
};
