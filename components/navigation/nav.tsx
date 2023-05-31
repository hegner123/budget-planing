"use client";

import Link from "next/link";
import LoggedInLinks from "./loggedIn";
import LoggedOutLinks from "./loggedOut";
import { useSession } from "@budget/hooks/auth/useSession";

export default function Navigation() {
  const { user } = useSession();
  return (
    <nav className="flex justify-between p-5 bg-blue-950">
      <div>
        <Link href="/">Budget Planning</Link>
      </div>
      <div>{user ? <LoggedInLinks /> : <LoggedOutLinks />}</div>
    </nav>
  );
}
