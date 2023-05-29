"use client";
import { Inter } from "next/font/google";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { ReactElement, ReactNode } from "react";
import JotaiProvider, { showDebugModalAtom } from "@budget/store/state";
import DebugModal from "@budget/components/debugModal";
import Navigation from "@budget/components/navigation/nav";
import SimpleSnackbar from "@budget/components/notifications/snackbar";
import Fab from "@mui/material/Fab";
import { useAtom } from "jotai";
import "@budget/styles/style.scss";
import "@budget/public/globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: {
    initialSession: Session | null;
  };
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionContextProvider supabaseClient={supabase}>
          <JotaiProvider>
            <Navigation />
            <DebugModal />
            {children}

            <SimpleSnackbar />
          </JotaiProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
