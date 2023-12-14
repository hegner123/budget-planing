"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { addBalance, deleteBalance } from "@budget/supabaseTables";
import { useAtom } from "jotai";
import useSWR from "swr";
import useSession from "@budget/hooks/auth/useSession";

export const useBalance = () => {
  const supabaseClient = createClientComponentClient();
  const [balance, setBalance] = useState<any>(null);
  const [fetchedBalance, setFetched] = useState(false);
  const [balanceLog, setBalanceLog] = useState<any>(null);

  const [user, setUser] = useState<any>("");
  const { getSession } = useSession();
  useEffect(() => {
    getSession().then((res) => {
      setUser(res.data.session.user.id);
    });
  }, [getSession]);

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

  async function addBalance({
    name,
    amount,
    user,
    date,
  }: {
    name: string;
    amount: number;
    user: string;
    date: string;
  }) {
    // if (!user) return console.log("No user");
    const { data, error } = await supabaseClient
      .from("Balance")
      .insert([{ name: name, amount: amount, date: date, user: user }]);
    setBalanceLog(data);
    return { data, error };
  }

  function deleteBalanceEntry(id: string) {
    deleteBalance(id, supabaseClient);
  }

  return {
    balance,
    fetchedBalance,
    balanceLog,

    addBalance,
    deleteBalanceEntry,
  };
};
