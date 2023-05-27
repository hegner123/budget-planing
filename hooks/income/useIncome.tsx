import { useState, useEffect } from "react";
import { getIncomes, addIncome, deleteIncome } from "@budget/supabaseTables";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
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
  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (fetchedIncome) return;
    if (!user) return;
    getIncomes(user?.id, supabaseClient)
      .then((res: any) => {
        setFetched(true);
        setIncome(res.data);
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

  const LiveIncome = supabaseClient
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
    addIncome({ ...data, supabaseClient: supabaseClient });
  }

  function deleteIncomeEntry(id: string) {
    deleteIncome(id, supabaseClient);
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
