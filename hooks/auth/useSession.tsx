"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSnackbar } from "notistack";

export const useSession = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function getSupabaseSession() {
      const { data, error }: { data: any; error: any } =
        await supabase.auth.getSession();

      return { data: data.session.user.id, error: error };
    }

    getSupabaseSession()
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [supabase.auth, loading]);

  return { user, error, loading };
};
