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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={`${inter.className} root`}>
        <GlobalCssPriority>
          <QueryClientProvider client={queryClient}>
            <JotaiProvider>
              <CssBaseline />
              <SnackbarProvider maxSnack={6}>
                <Navigation />
                {children}
              </SnackbarProvider>
            </JotaiProvider>
          </QueryClientProvider>
        </GlobalCssPriority>
      </body>
    </html>
  );
}
