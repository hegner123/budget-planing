"use client";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function ForecastLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: {
    initialSession: Session | null;
  };
}) {
  return <>{children}</>;
}
