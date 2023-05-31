"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getBalance, addBalance, deleteBalance } from "@budget/supabaseTables";
import { refreshedBalanceAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import { AppUser } from "@budget/types";
import { useSession } from "@budget/hooks/auth/useSession";
import { showNotificationMessageAtom } from "@budget/store/state";

export const useBalance = () => {
  const [balance, setBalance] = useState<any>(null);
  const [fetchedBalance, setFetched] = useState(false);
  const [, setShowNotificationMessage] = useAtom(showNotificationMessageAtom);
  const [refreshedBalance, setRefreshedBalance] = useAtom(refreshedBalanceAtom);
  const supabase = createClientComponentClient();
  const { user } = useSession();

  const LiveBalance = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Balance" },
      (payload) => {
        console.log("Change received!", payload);
        handleUpdatedData(payload);
      }
    )
    .subscribe();

  useEffect(() => {
    if (fetchedBalance) return;
    if (!user) return;

    getBalance(user, supabase)
      .then((res): any => {
        setBalance(res.data);
        setFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchedBalance, user, supabase, setShowNotificationMessage]);

  function addBalanceHook(data: any) {
    addBalance({ ...data, supabaseClient: supabase });
  }
  function deleteBalanceEntry(id: string) {
    deleteBalance(id, supabase);
  }

  function handleUpdatedData(data: any) {
    switch (data.eventType) {
      case "INSERT":
        let newBalance = [data.new, ...balance];
        setRefreshedBalance(newBalance as any);
        setBalance(newBalance);
        break;
      case "UPDATE":
        const updatedBalance = balance.map((entry: any) => {
          if (entry.id === data.new.id) {
            return data.new;
          }
          return entry;
        });
        setRefreshedBalance(updatedBalance);
        setBalance(updatedBalance);
        break;
      case "DELETE":
        const filteredBalance = balance.filter(
          (entry: any) => entry.id !== data.old.id
        );
        setRefreshedBalance(filteredBalance);
        setBalance(filteredBalance);
        break;
      default:
        console.log("No event type found");
    }
  }
  return {
    balance,
    fetchedBalance,
    LiveBalance,
    addBalanceHook,
    deleteBalanceEntry,
  };
};
