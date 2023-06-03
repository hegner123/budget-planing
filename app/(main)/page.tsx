"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "@budget/hooks/auth/useSession";

export default function Page() {
  const router = useRouter();
  const { user } = useSession();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
      return;
    }
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, router]);

  return (
    <>
      <main className="grid min-w-full min-h-screen place-items-center">
        <CircularProgress />
      </main>
    </>
  );
}


