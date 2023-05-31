"use client";
import { useState, useEffect } from "react";
import { getIncomes, addIncome, deleteIncome } from "@budget/supabaseTables";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import {
  showNotificationAtom,
  notificationMessageAtom,
  refreshedIncomeAtom,
} from "@budget/store/state";

export const useIncome = () => {
  const [income, setIncome] = useState<any>(null);
  const [fetchedIncome, setFetched] = useState(false);
  const [, setShowNotification] = useAtom(showNotificationAtom);
  const [, setRefreshedIncome] = useAtom(refreshedIncomeAtom);
  const [notificationMessage, setNotificationMessage] = useAtom(
    notificationMessageAtom
  );
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

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
    if (fetchedIncome) return;
    if (!user) return;
    getIncomes(user?.id, supabase)
      .then((res: any) => {
        setFetched(true);
        setIncome(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [
    fetchedIncome,
    supabase,
    user,
    notificationMessage,
    setShowNotification,
    setNotificationMessage,
  ]);

  const LiveIncome = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Income" },
      (payload) => {
        console.log("Change received!", payload);
        handleUpdatedData(payload);
      }
    )
    .subscribe();

  function addIncomeSubmit(data: any) {
    addIncome({ ...data, supabaseClient: supabase });
  }

  function deleteIncomeEntry(id: string) {
    deleteIncome(id, supabase);
  }

  function handleUpdatedData(data: any) {
    switch (data.eventType) {
      case "INSERT":
        let newIncome = [data.new, ...income];
        setRefreshedIncome(newIncome as any);
        setIncome(newIncome);
        break;
      case "UPDATE":
        const updatedIncome = income.map((entry: any) => {
          if (entry.id === data.new.id) {
            return data.new;
          }
          return entry;
        });
        setRefreshedIncome(updatedIncome);
        setIncome(updatedIncome);
        break;
      case "DELETE":
        const filteredIncome = income.filter(
          (entry: any) => entry.id !== data.old.id
        );
        setRefreshedIncome(filteredIncome);
        setIncome(filteredIncome);
        break;
      default:
        console.log("No event type found");
    }
  }

  return {
    income,
    fetchedIncome,
    LiveIncome,
    addIncomeSubmit,
    deleteIncomeEntry,
  };
};
