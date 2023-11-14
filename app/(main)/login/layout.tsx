"use client";
import { Session } from "@supabase/auth-helpers-nextjs";

import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const [loading] = useAtom(loadingAtom);
  return <>{children}</>;
}
