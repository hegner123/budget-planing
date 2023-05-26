import { useState, useEffect } from "react";
import { getIncomes, addIncome } from "@budget/supabaseTables";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useAtom } from "jotai";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";

export const useIncome = () => {
  const [income, setIncome] = useState<any>(null);
  const [fetchedIncome, setFetched] = useState(false);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationMessage, setNotificationMessage] = useAtom(
    notificationMessageAtom
  );
  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (fetchedIncome) return;
    if (!user) return;
    getIncomes(user?.id, supabaseClient)
      .then((data: any) => {
        setFetched(true);
        setIncome(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [
    fetchedIncome,
    supabaseClient,
    user,
    notificationMessage,
    setShowNotification,
    setNotificationMessage,
  ]);

  function addIncomeSubmit(data: any) {
    setShowNotification(true);
    setNotificationMessage(JSON.stringify(data));
    addIncome({ ...data, supabaseClient });
  }

  return { income, fetchedIncome, addIncomeSubmit };
};
