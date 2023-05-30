"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <>
      <main className="grid min-w-full min-h-screen place-items-center">
        <CircularProgress />
      </main>
    </>
  );
}
