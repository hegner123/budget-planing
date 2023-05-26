import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { getBalance, addBalance } from "@budget/supabaseTables";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";
import { useAtom } from "jotai";

export const useBalance = () => {
  const [balance, setBalance] = useState<any>(null);
  const [fetchedBalance, setFetched] = useState(false);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationMessage, setNotificationMessage] = useAtom(
    notificationMessageAtom
  );

  const user: any = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (fetchedBalance) return;
    if (!user) return;

    getBalance(user.id, supabase)
      .then((data): any => {
        setBalance(data);
        setFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchedBalance, user, supabase]);

  function addBalance() {}
  return { balance, fetchedBalance };
};
