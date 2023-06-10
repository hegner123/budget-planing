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

import { useSnackbar } from "notistack";
import {
  IncomeUpdateObject,
  IncomeUpdateHook,
  IncomeAdd,
  IncomeAddHook,
  IncomeEntry,
  IncomePayload,
} from "@budget/types/income";
import useSWR from "swr";

export const useIncome = () => {
  const [income, setIncome] = useState<any>(null);
  const [fetchedIncome, setFetched] = useState(false);
  const [connected, setConnected] = useState(false);
  const [incomeLog, setIncomeLog] = useState<any>("");

  const { enqueueSnackbar } = useSnackbar();
    const { getSession } = useSession();
    const [user, setUser] = useState<any>(() => getSession());
  const supabaseClient = createClientComponentClient();

  const { data, error, isLoading } = useSWR(`/income/${user}`, () =>
    getIncome(user, supabaseClient)
  );

  async function getIncome(user: string, supabaseClient: any) {
    if (!user) return;
    let { data, error } = await supabaseClient
      .from("Income")
      .select("*")
      .eq("user", user);
    return { data, error };
  }

  useEffect(() => {
    if (data) {
      setIncome(data?.data);
      setFetched(true);
    }
    if (error) {
      enqueueSnackbar("Error fetching income", { variant: "error" });
    }
  }, [data, error, enqueueSnackbar]);

  useEffect(() => {
    if (connected) return;
    const LiveIncome = supabaseClient
      .channel("income")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Income" },
        (payload) => {
          console.log("Change received!", payload);
          handleUpdatedData(payload as IncomePayload);
          setConnected(true);
        }
      )
      .subscribe();

    function handleUpdatedData(data: IncomePayload) {
      switch (data.eventType) {
        case "INSERT":
          let newIncome = [data.new, ...income];

          setIncome(newIncome as IncomeEntry[]);
          break;
        case "UPDATE":
          const updatedIncome = income.map((entry: IncomeEntry) => {
            if (entry.uuid === data.new.uuid) {
              return data.new;
            }
            return entry;
          });

          setIncome(updatedIncome as IncomeEntry[]);
          break;
        case "DELETE":
          const filteredIncome = income.filter(
            (entry: IncomeEntry) => entry.uuid !== data.old.uuid
          );

          setIncome(filteredIncome as IncomeEntry[]);

          break;
        default:
          console.log("No event type found");
      }
    }
    return () => {
      LiveIncome.unsubscribe();
    };
  }, [connected, supabaseClient, income]);

  function addIncomeSubmit(data: IncomeAdd) {
    addIncome({
      ...data,
      supabaseClient,
    } as IncomeAddHook).then((res) => {
      setIncomeLog(JSON.stringify(res));
    });
  }

  function deleteIncomeEntry(id: string) {
    deleteIncome({ id, supabaseClient } as {
      id: string;
      supabaseClient: any;
    });
  }

  async function updateIncomeEntry(newRow) {
    const { data, error } = await updateIncome({
      newRow,
      supabaseClient,
    });
    if (data === null && error === null) {
      return { data: newRow, error: null };
    }
    return { data, error };
  }

  return {
    income,
    fetchedIncome,
    incomeLog,
    addIncomeSubmit,
    deleteIncomeEntry,
    updateIncomeEntry,
  };
};
