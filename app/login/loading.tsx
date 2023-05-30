"use client";
import { CircularProgress } from "@mui/material";
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CircularProgress />
    </div>
  );
}
