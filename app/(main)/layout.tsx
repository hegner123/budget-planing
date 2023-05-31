"use client";

import "@budget/styles/style.scss";
import { Inter } from "next/font/google";
import { useState } from "react";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import JotaiProvider from "@budget/store/state";
import DebugDialog from "@budget/components/dialogs/debugDialog";
import Navigation from "@budget/components/navigation/nav";
import SimpleSnackbar from "@budget/components/notifications/snackbar";
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
  const [supabase] = useState(() => createClientComponentClient());
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionContextProvider supabaseClient={supabase}> */}
        <JotaiProvider>
          <Navigation />
          {children}

          <SimpleSnackbar />
          <DebugDialog />
        </JotaiProvider>
        {/* </SessionContextProvider> */}
      </body>
    </html>
  );
}
