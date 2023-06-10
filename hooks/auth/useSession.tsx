"use client";
import { useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const useSession = () => {
  const supabase = createClientComponentClient();
  const getSession = useCallback(async () => {
    const { data, error }: { data: any; error: any } =
      await supabase.auth.getSession();
    return { data: data, error: error };
  }, [supabase.auth]);

  return { getSession };
};
