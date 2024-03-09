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
import { useAtom } from "jotai";
import { isMobileMenuOpenAtom } from "@budget/store/state";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen] = useAtom(isMobileMenuOpenAtom);

    const queryClient = new QueryClient();

    const menuOpenClass = isMobileMenuOpen ? "menu-open" : "";
    return (
        <html lang="en">
            <body className={`${inter.className} root ${menuOpenClass}`}>
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
