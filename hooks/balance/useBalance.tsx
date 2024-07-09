"use client";
import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteBalance } from "@budget/supabaseTables";
import useSWR from "swr";
import useSession from "@budget/hooks/auth/useSession";

export const useBalance = () => {
    const supabaseClient = createClientComponentClient();
    const [balanceLog, setBalanceLog] = useState<any>(null);
    const [user, setUser] = useState<string | null>(null);
    const { getSession } = useSession();

    useEffect(() => {
        getSession().then((res) => {
            setUser(res?.data?.session?.user?.id || null);
        });
    }, [getSession]);

    const fetchBalance = useCallback(async (user: string) => {
        if (!user) return { data: null, error: null };
        const { data, error } = await supabaseClient
            .from("Balance")
            .select("*")
            .eq("user", user);
        return { data, error };
    }, [supabaseClient]);

    const { data, error, isLoading } = useSWR(user ? `balance/${user}` : null, () => fetchBalance(user!));

    if (error) {
        console.error(error);
    }

    const addBalance = useCallback(async ({ name, amount, user, date }: { name: string; amount: number; user: string; date: string; }) => {
        const { data, error } = await supabaseClient
            .from("Balance")
            .insert([{ name, amount, date, user }]);
        setBalanceLog(data);
        return { data, error };
    }, [supabaseClient]);

    const deleteBalanceEntry = useCallback((id: string) => {
        deleteBalance(id, supabaseClient);
    }, [supabaseClient]);

    return {
        balance: data,
        balanceLog,
        addBalance,
        deleteBalanceEntry,
        isLoading,
    };
};

