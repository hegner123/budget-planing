import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { getBalance, addBalance } from "@budget/supabaseTables";
import { useAtom } from "jotai";
import { showNotificationAtom, notificationQueAtom } from "@budget/store/state";
import { NotificationObject } from "@budget/types/notifications";
export const useBalance = () => {
  const [balance, setBalance] = useState<any>(null);
  const [fetchedBalance, setFetched] = useState(false);
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationQue, setNotificationQue] = useAtom(notificationQueAtom);

  const user: any = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (fetchedBalance) return;
    if (!user) return;

    getBalance(user.id, supabase)
      .then((data): any => {
        setBalance(data);
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
      })
      .catch((err) => {
        console.log(err);
        setShowNotification(true);
        setNotificationQue(err);
        ("error");
      });
  }, [fetchedBalance, user, supabase]);

  function addBalance() {}
  return { balance, fetchedBalance };
};
