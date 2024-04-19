"use client";
import { useState, useEffect } from "react";
import {
    addIncomeSupabase,
    deleteIncome,
    updateIncome,
} from "@budget/supabaseTables";
import { SupabaseClient, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSession from "@budget/hooks/auth/useSession";

import { useSnackbar } from "notistack";
import {
    IncomeUpdateObject,
    IncomeUpdateHook,
    IncomeAdd,
    IncomeAddHook,
    IncomeEntry,
    IncomePayload,
} from "@budget/types/income";
import { useQuery } from "@tanstack/react-query";

export const useIncome = () => {
    const supabaseClient: SupabaseClient = createClientComponentClient();
    const [incomeLog, setIncomeLog] = useState<string>("");
    const [user, setUser] = useState<string | null>("");
    
    const { getSession } = useSession();
    const { enqueueSnackbar } = useSnackbar();
    
    useEffect(() => {
        getSession().then((res) => {
            setUser(res?.data?.session?.user?.id);
        });
    }, [getSession]);

    async function getIncome(user: string, supabaseClient: any) {
        let { data, error } = await supabaseClient
            .from("Income")
            .select("*")
            .eq("user", user);

        if (error) {
            throw new Error("Error fetching income");
        }
        return { data };

    }
    const { data, error } = useQuery({
        queryKey: ['income', { user, supabaseClient }],
        queryFn: () => getIncome(user, supabaseClient),
    })

    function addIncome(data: IncomeAdd) {
        addIncomeSupabase({
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
        incomeLog,
        addIncome,
        deleteIncomeEntry,
        updateIncomeEntry,
    };
};
