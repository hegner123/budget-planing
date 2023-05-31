"use client";
import Link from "next/link";
import useSignOut from "@budget/hooks/auth/useSignOut";

const LoggedInLinks = () => {
  const { signOut } = useSignOut();
  return (
    <ul className="flex">
      <li className="px-5">
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li className="px-5">
        <Link href="/testing">Testing</Link>
      </li>
      <li className="px-5">
        <span
          className="text-white hover:cursor-pointer"
          onClick={() => signOut()}>
          Sign Out
        </span>
      </li>
    </ul>
  );
};

export default LoggedInLinks;
