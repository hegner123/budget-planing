import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@budget/store/state";
import { usePathname } from "next/navigation";
import path from "path";
const useToken = () => {
    const [isLoggedIn, setLoggedIn] = useAtom(isLoggedInAtom);
    const [token, setToken] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (localStorage.getItem("token")?.length > 0) {
            setToken(JSON.parse(localStorage.getItem("token")));
        }
        return () => {
            setToken(false);
        };
    }, [pathname]);

    if (token && !isLoggedIn) {
        setLoggedIn(true);
    }

    const removeToken = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return { isLoggedIn, removeToken };
};

export default useToken;
