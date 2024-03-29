"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import DebugDialog from "@budget/components/dialogs/debugDialog";
import SimpleSnackbar from "@budget/components/notifications/snackbar";
import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";
export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const [loading] = useAtom(loadingAtom);
  return (
    <>
      {children}
      {!loading && (
        <>
          <SimpleSnackbar />
        </>
      )}
    </>
  );
}
