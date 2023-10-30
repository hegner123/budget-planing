"use client";


import { Inter } from "next/font/google";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import JotaiProvider from "@budget/store/state";
import { SnackbarProvider } from "notistack";
import Navigation from "@budget/components/navigation/nav";
import GlobalCssPriority from "@budget/styles/styleProvider";
import CssBaseline from "@mui/material/CssBaseline";

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
  return (
    <html lang="en">
      <body className={`${inter.className} root`}>
        <GlobalCssPriority>
          <CssBaseline />
          <JotaiProvider>
            <SnackbarProvider maxSnack={6}>
              <Navigation />
              {children}
            </SnackbarProvider>
          </JotaiProvider>
        </GlobalCssPriority>
      </body>
    </html>
  );
}
