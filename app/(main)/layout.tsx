"use client";

import "@budget/styles/style.scss";
import { Inter } from "next/font/google";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import JotaiProvider from "@budget/store/state";

import Navigation from "@budget/components/navigation/nav";

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
  const supabase = createClientComponentClient();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionContextProvider supabaseClient={supabase}> */}
        <JotaiProvider>
          <Navigation />
          {children}
        </JotaiProvider>
        {/* </SessionContextProvider> */}
      </body>
    </html>
  );
}
