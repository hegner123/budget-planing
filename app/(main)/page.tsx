"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSupabaseSession() {
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
      return { data: data.session.user.id, error: error };
    }
    getSupabaseSession()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [supabase.auth]);

  useEffect(() => {
    if (user) {
      setLoading(false);
      router.push("/dashboard");
      return;
    }
    if (error) {
      setLoading(false);
      router.push("/login");
      return;
    }
  }, [user, error, router]);

  return (
    <>
      <main className="grid min-w-full min-h-screen place-items-center">
        <CircularProgress />
      </main>
    </>
  );
}


