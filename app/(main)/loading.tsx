"use client";
import { CircularProgress } from "@mui/material";
export default function Loading() {
  return (
    <>
      <main className="grid min-w-full min-h-screen place-items-center">
        <CircularProgress />
      </main>
    </>
  );
}
