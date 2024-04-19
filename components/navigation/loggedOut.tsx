"use client";
import Link from "next/link";

const LoggedOutLinks = () => {
    return (
        <ul className="lg:flex grid w-fit">
            <li>
                <Link className="px-5 hover:bg-sky50" href="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link className="px-5" href="/register">
                    Register
                </Link>
            </li>
        </ul>
    );
};

export default LoggedOutLinks;
