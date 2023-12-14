"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoggedInLinks from "./loggedIn";
import LoggedOutLinks from "./loggedOut";
import { usePathname } from "next/navigation";
import useSession from "@budget/hooks/auth/useSession";

import DebugDialog from "@budget/components/dialogs/debugDialog";
import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";

export default function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>("");
  const { getSession } = useSession();
  useEffect(() => {
    getSession().then((res) => {
      setUser(res.data.session?.user.id);
    });
  }, [getSession, pathname]);
  return (
    <>
      <nav className="flex justify-between p-5 bg-blue-950">
        <div>
          <Link href={"/"} passHref>
            <h3 className="text-xl bold">Budget Forecast</h3>
          </Link>
        </div>
        <div>{user ? <LoggedInLinks /> : <LoggedOutLinks />}</div>
      </nav>
    </>
  );
}
