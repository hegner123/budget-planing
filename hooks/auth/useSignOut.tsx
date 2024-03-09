"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import useToken from "./useToken";
import { isLoggedInAtom } from "@budget/store/state";

const useSignOut = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [, setLoading] = useAtom(loadingAtom);
    const [, setLoggedIn] = useAtom(isLoggedInAtom);

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            enqueueSnackbar(error.message, { variant: "error" });
            return error;
        }
        enqueueSnackbar("Signed out successfully", { variant: "success" });
        setLoading(true);
        setLoggedIn(false);
        localStorage.removeItem("token");
        router.push("/");
    }
    return { handleSignOut };
};

export default useSignOut;
