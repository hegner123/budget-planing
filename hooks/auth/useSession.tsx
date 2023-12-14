"use client";
import { useCallback, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useSession = () => {
  const supabase = createClientComponentClient();

  const getSession = useCallback(async () => {
    const { data, error }: { data: any; error: any } =
      await supabase.auth.getSession();
    return { data: data, error: error };
  }, [supabase.auth]);

  const refreshSession = useCallback(async () => {
    const { data, error }: { data: any; error: any } =
      await supabase.auth.refreshSession();
    return { data: data, error: error };
  }, [supabase.auth]);

  return { getSession, refreshSession };
};

export default useSession;
