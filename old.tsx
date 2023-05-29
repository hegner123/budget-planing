import type { NextPage } from "next";
import type { AppProps } from "next/app";
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
import "@budget/public/globals.css";

import "@budget/styles/style.scss";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [supabase] = useState(() => createBrowserSupabaseClient());

  return getLayout(
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}>
      <JotaiProvider>
        <Navigation />
        <DebugModal />
        <Component {...pageProps} />

        <SimpleSnackbar />
      </JotaiProvider>
    </SessionContextProvider>
  );
}
export default MyApp;
