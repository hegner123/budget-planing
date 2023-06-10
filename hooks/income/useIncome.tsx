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
  const supabaseClient = createClientComponentClient();
  const [income, setIncome] = useState<any>(null);
  const [fetchedIncome, setFetched] = useState<any>(false);
  const [incomeLog, setIncomeLog] = useState<any>("");
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<any>("");
  const { getSession } = useSession();
  useEffect(() => {
    getSession().then((res) => {
      setUser(res.data.session.user.id);
    });
  }, [getSession]);

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
