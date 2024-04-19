"use client";
import Link from "next/link";
import useSignOut from "@budget/hooks/auth/useSignOut";

const LoggedInLinks = () => {
    const { handleSignOut } = useSignOut();

    return (
        <ul className="lg:flex grid w-fit">
            <li className="px-5">
                <Link
                    href="/dashboard"
                    onClick={(e) => console.log("click", e)}>
                    Dashboard
                </Link>
            </li>
            <li className="px-5">
                <Link href="/forecast" className="self-end ml-auto">
                    Forecast
                </Link>
            </li>
            <li className="px-5">
                <Link href="/account" className="self-end ml-auto">
                    Account
                </Link>
            </li>
            <li className="px-5">
                <span
                    className="text-white hover:cursor-pointer"
                    onClick={() => handleSignOut()}>
                    Sign Out
                </span>
            </li>
        </ul>
    );
};

export default LoggedInLinks;
