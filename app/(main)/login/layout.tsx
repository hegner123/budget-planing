"use client";
import { Session } from "@supabase/auth-helpers-nextjs";

import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";
export default function LoginLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: {
    initialSession: Session | null;
  };
}) {
  const [loading] = useAtom(loadingAtom);
  return <>{children}</>;
}
