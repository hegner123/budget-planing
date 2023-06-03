"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
export default function DashboardLayout({
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
