"use client";

import Link from "next/link";
import LoggedInLinks from "./loggedIn";
import LoggedOutLinks from "./loggedOut";
import { useSession } from "@budget/hooks/auth/useSession";
import DebugDialog from "@budget/components/dialogs/debugDialog";
import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";

export default function Navigation() {
  const { user } = useSession();
  const [loading] = useAtom(loadingAtom);

  return (
    <>
      <nav className="flex justify-between p-5 bg-blue-950">
        <div>
          <Link href="/">Budget Planning</Link>
        </div>
        <div>{user ? <LoggedInLinks /> : <LoggedOutLinks />}</div>
      </nav>
      {!loading && <DebugDialog />}
    </>
  );
}
