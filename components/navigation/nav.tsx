import Link from "next/link";
import LoggedInLinks from "./loggedIn";
import LoggedOutLinks from "./loggedOut";
import { useSession } from "@supabase/auth-helpers-react";

export default function Navigation() {
  const user: any = useSession();
  return (
    <nav className="flex justify-between p-5 bg-slate-700">
      <div>
        <Link href="/">Budget Planning</Link>
      </div>
      <div>{user ? <LoggedInLinks /> : <LoggedOutLinks />}</div>
    </nav>
  );
}
