"use client";
import { useEffect, useState } from "react";
import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { getBalance, addBalance, deleteBalance } from "@budget/supabaseTables";
import { refreshedBalanceAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import useSWR from "swr";
import { useSession } from "@budget/hooks/auth/useSession";

export const useBalance = () => {
  const [balance, setBalance] = useState<any>(null);
  const [fetchedBalance, setFetched] = useState(false);
  const [, setRefreshedBalance] = useAtom(refreshedBalanceAtom);
  const supabaseClient = createClientComponentClient();
  const [connected, setConnected] = useState(false);
  const { user } = useSession();
  const { data, error, isLoading } = useSWR(`balance/${user}`, () =>
    getBalance(user, supabaseClient)
  );

  async function getBalance(user: string, supabaseClient: any) {
    if (!user) return;
    let { data, error } = await supabaseClient
      .from("Balance")
      .select("*")
      .eq("user", user);
    return { data, error };
  }

  useEffect(() => {
    if (data) {
      setBalance(data.data);
      setFetched(true);
    }
  }, [data]);

  useEffect(() => {
    const LiveBalance = supabaseClient
      .channel("balance")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Balance" },
        (payload) => {
          console.log("Change received!", payload);
          handleUpdatedData(payload);
        }
      )
      .subscribe();

    function handleUpdatedData(data: any) {
      switch (data.eventType) {
        case "INSERT":
          let newBalance = [data.new, ...balance];
          setRefreshedBalance(newBalance as any);
          setBalance(newBalance);
          break;
        case "UPDATE":
          const updatedBalance = balance?.map((entry: any) => {
            if (entry.uuid === data.new.uuid) {
              return data.new;
            }
            return entry;
          });
          setRefreshedBalance(updatedBalance);
          setBalance(updatedBalance);
          break;
        case "DELETE":
          const filteredBalance = balance?.filter(
            (entry: any) => entry.uuid !== data.old.uuid
          );
          setRefreshedBalance(filteredBalance);
          setBalance(filteredBalance);
          break;
        default:
          console.log("No event type found");
      }
    }

    return () => {
      LiveBalance.unsubscribe();
    };
  }, [connected, supabaseClient, balance, setRefreshedBalance]);

  function addBalanceHook(data: any) {
    addBalance({ ...data, supabaseClient });
  }
  function deleteBalanceEntry(id: string) {
    deleteBalance(id, supabaseClient);
  }

  async function updateBalance(newRow: any) {
    const { data, error } = await updateBalance({
      newRow,
      supabaseClient,
    });
    if (data === null && error === null) {
      return { data: newRow, error: null };
    }
    return { data, error };
  }

  return {
    balance,
    fetchedBalance,
    updateBalance,
    addBalanceHook,
    deleteBalanceEntry,
  };
};
