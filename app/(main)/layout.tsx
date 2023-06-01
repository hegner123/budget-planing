"use client";

import "@budget/styles/style.scss";
import { Inter } from "next/font/google";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import JotaiProvider from "@budget/store/state";
import { SnackbarProvider } from "notistack";
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
        <JotaiProvider>
          <SnackbarProvider maxSnack={3}>
            <Navigation />
            {children}
          </SnackbarProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
