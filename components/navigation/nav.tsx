"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoggedInLinks from "./loggedIn";
import LoggedOutLinks from "./loggedOut";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import useToken from "@budget/hooks/auth/useToken";

export default function Navigation() {
    const { isLoggedIn } = useToken();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const checkIsMobile = () => {
            if (typeof window !== "undefined") {
                return window.innerWidth < 768;
            }
            return false;
        };
        setIsMobile(checkIsMobile());
        const handleResize = () => {
            setIsMobile(checkIsMobile());
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function showMobileMenu() {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    const mobileMenuLayout = (
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
            {isLoggedIn && <LoggedInLinks isMobile />}
            {!isLoggedIn && <LoggedOutLinks isMobile />}
            <IconButton onClick={() => showMobileMenu()}>
                <CloseIcon />
            </IconButton>
        </div>
    );

    return (
        <>
            <nav className="flex justify-between p-5 bg-blue-950 col-span-full">
                <div>
                    <Link href={"/"} passHref>
                        <h3 className="text-xl bold">Budget Forecast</h3>
                    </Link>
                </div>

                {isMobile ? (
                    <>
                        <div className="flex items-center">
                            <IconButton onClick={() => showMobileMenu()}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        {mobileMenuLayout}
                    </>
                ) : (
                    <div className="flex items-center">
                        {isLoggedIn && <LoggedInLinks isMobile />}
                        {!isLoggedIn && <LoggedOutLinks isMobile />}
                    </div>
                )}
            </nav>
        </>
    );
}
