"use client";
import { useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useSession = () => {
  const supabase = createClientComponentClient();

  const getSession = useCallback(async () => {
    try {
      const { data, error }: { data: any; error: any } =
        await supabase.auth.getSession();
      return { data: data, error: error };
    } catch (err) {
      console.error(err);
    }
  }, [supabase.auth]);

  const refreshSession = useCallback(async () => {
    try {
      const { data, error }: { data: any; error: any } =
        await supabase.auth.refreshSession();
      return { data: data, error: error };
    } catch (error) {
      console.error(error);
    }
  }, [supabase.auth]);

  return { getSession, refreshSession };
};

export default useSession;
