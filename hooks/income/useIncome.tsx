"use client";
import { useState, useEffect } from "react";
import {
  getIncomes,
  addIncome,
  deleteIncome,
  updateIncome,
} from "@budget/supabaseTables";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@budget/hooks/auth/useSession";
import { useAtom } from "jotai";
import { refreshedIncomeAtom } from "@budget/store/state";
import { useSnackbar } from "notistack";
import { IncomeUpdateObject, IncomeUpdateHook } from "@budget/types/income";

export const useIncome = () => {
  const [income, setIncome] = useState<any>(null);
  const [fetchedIncome, setFetched] = useState(false);
  const [connected, setConnected] = useState(false);
  const [, setRefreshedIncome] = useAtom(refreshedIncomeAtom);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSession();
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (connected) return;
    const LiveIncome = supabase
      .channel("income")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Income" },
        (payload) => {
          console.log("Change received!", payload);
          handleUpdatedData(payload);
          setConnected(true);
        }
      )
      .subscribe();

    function handleUpdatedData(data: any) {
      switch (data.eventType) {
        case "INSERT":
          let newIncome = [data.new, ...income];
          setRefreshedIncome(newIncome as any);
          setIncome(newIncome);
          enqueueSnackbar("Income added", { variant: "success" });
          break;
        case "UPDATE":
          const updatedIncome = income.map((entry: any) => {
            if (entry.uuid === data.new.uuid) {
              return data.new;
            }
            return entry;
          });
          setRefreshedIncome(updatedIncome);
          setIncome(updatedIncome);
          enqueueSnackbar("Income updated", { variant: "success" });
          break;
        case "DELETE":
          const filteredIncome = income.filter(
            (entry: any) => entry.uuid !== data.old.uuid
          );
          setRefreshedIncome(filteredIncome);
          setIncome(filteredIncome);
          enqueueSnackbar("Income deleted", { variant: "success" });
          break;
        default:
          console.log("No event type found");
      }
    }
  }, [connected, supabase, income, setRefreshedIncome, enqueueSnackbar]);

  useEffect(() => {
    if (fetchedIncome) return;
    if (!user) return;
    getIncomes(user, supabase)
      .then((res: any) => {
        setFetched(true);
        setIncome(res.data);
        enqueueSnackbar("Income loaded", { variant: "success" });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [fetchedIncome, supabase, user, enqueueSnackbar]);

  function addIncomeSubmit(data: any) {
    addIncome({ ...data, supabaseClient: supabase });
  }

  function deleteIncomeEntry(id: string) {
    deleteIncome(id, supabase);
  }

  function updateIncomeEntry({ id, column, value }: IncomeUpdateHook) {
    updateIncome({
      id,
      column,
      value,
      supabaseClient: supabase,
    } as IncomeUpdateObject);
  }

  return {
    income,
    fetchedIncome,
    addIncomeSubmit,
    deleteIncomeEntry,
    updateIncomeEntry,
  };
};
