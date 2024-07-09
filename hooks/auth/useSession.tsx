"use client";
import { useCallback } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";


const useSession = () => {
    const supabase = createClientComponentClient({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const getSession = useCallback(async (): Promise<{ data: { session: Session | null }; error: Error }> => {
        try {
            const { data, error }: { data: { session: Session | null }; error: Error } =
                await supabase.auth.getSession();
            return { data: data, error: error };
        } catch (err) {
            console.error(err);
        }
    }, [supabase.auth]);

    const refreshSession = useCallback(async (): Promise<{ data: { session: Session | null }; error: Error }> => {
        try {
            const { data, error }: { data: { session: Session | null }; error: Error } =
                await supabase.auth.refreshSession();
            return { data: data, error: error };
        } catch (error) {
            console.error(error);
        }
    }, [supabase.auth]);

    return { getSession, refreshSession };
};

export default useSession;
