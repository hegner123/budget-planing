"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@budget/hooks/auth/useSession";
import { loadingAtom, loggedInUserAtom } from "@budget/store/state";
import { useAtom } from "jotai";

export default function Page() {
  const [user, setUser] = useAtom(loggedInUserAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const router = useRouter();
  const { getSession } = useSession();

  useEffect(() => {
    getSession()
      .then((res) => {
        setUser(res.data.session.user.id as string);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setUser("error");
        setLoading(false);
      });
  }, [getSession, setLoading, setUser]);

  useEffect(() => {
    if (user !== "" && user !== "error" && !loading) {
      router.push("/dashboard");
      return;
    }
    if (user === "error" && !loading) {
      router.push("/login");
      return;
    }
  }, [user, router, loading]);

  return (
    <>
      <main className="grid min-w-full min-h-screen place-items-center">
        <CircularProgress />
      </main>
    </>
  );
}


