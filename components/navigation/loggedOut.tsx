"use client";
import Link from "next/link";

const LoggedOutLinks = (isMobile) => {
    let mobileClasses = "grid";
    let desktopClasses = "flex";
    return (
        <ul className={isMobile ? mobileClasses : desktopClasses}>
            <li>
                <Link className="px-5" href="/login">
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
