"use client";
import { useState, useEffect, useCallback } from "react";
import {
    addIncomeSupabase,
    deleteIncome,
    updateIncome,
} from "@budget/supabaseTables";
import useSession from "@budget/hooks/auth/useSession";
import { useSnackbar } from "notistack";
import { IncomeAdd, IncomeAddHook, IncomeEntry } from "@budget/types/income";
import supabase from "@budget/supabaseTables/client";
import { PostgrestError } from "@supabase/supabase-js";

export const useIncome = () => {
    const supabaseClient = supabase();
    const [incomeLog, setIncomeLog] = useState<string>("");
    const [user, setUser] = useState<{ id: string | null }>({ id: null });
    const [income, setIncome] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { getSession } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getSession().then((res) => {
            setUser({ id: res?.data?.session?.user?.id || null });
        });
    }, [getSession]);

    const fetchIncome = useCallback(async (userId: string) => {
        try {
            setLoading(true);
            setError(null);
            const { data, error }: { data: any[], error: PostgrestError } = await supabaseClient
                .from("Income")
                .select("*")
                .eq("user", userId);

            if (error) {
                throw new Error("Error fetching income");
            }
            setIncome(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [supabaseClient]);

    useEffect(() => {
        if (user.id) {
            fetchIncome(user.id);
        }
    }, [user.id, fetchIncome]);

    const addIncome = useCallback(async (incomeData: IncomeAdd) => {
        try {
            const res = await addIncomeSupabase({ ...incomeData, supabaseClient } as IncomeAddHook);
            setIncomeLog(JSON.stringify(res));
            enqueueSnackbar("Income added successfully", { variant: "success" });
            fetchIncome(user.id!); // Refresh income data
        } catch (error) {
            enqueueSnackbar("Error adding income", { variant: "error" });
        }
    }, [supabaseClient, enqueueSnackbar, user.id, fetchIncome]);

    const deleteIncomeEntry = useCallback(async (id: string) => {
        try {
            await deleteIncome({ id, supabaseClient });
            enqueueSnackbar("Income deleted successfully", { variant: "success" });
            fetchIncome(user.id!); // Refresh income data
        } catch (error) {
            enqueueSnackbar("Error deleting income", { variant: "error" });
        }
    }, [supabaseClient, enqueueSnackbar, user.id, fetchIncome]);

    const updateIncomeEntry = useCallback(async (newRow: IncomeEntry) => {
        try {
            const { data, error } = await updateIncome({ newRow, supabaseClient });
            if (!data && !error) {
                return { data: newRow, error: null };
            }
            enqueueSnackbar("Income updated successfully", { variant: "success" });
            fetchIncome(user.id!); // Refresh income data
            return { data, error };
        } catch (error) {
            enqueueSnackbar("Error updating income", { variant: "error" });
            return { data: null, error };
        }
    }, [supabaseClient, enqueueSnackbar, user.id, fetchIncome]);

    return {
        income,
        incomeLog,
        addIncome,
        deleteIncomeEntry,
        updateIncomeEntry,
        isLoading: loading,
        error,
    };
};

