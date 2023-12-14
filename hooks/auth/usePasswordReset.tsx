"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { useSnackbar } from "notistack";
import useSignOut from "./useSignOut";

const usePasswordReset = () => {
  const supabase = createClientComponentClient();
  const { handleSignOut } = useSignOut();
  const { enqueueSnackbar } = useSnackbar();

  async function handlePasswordReset(email: string) {
    if (!email)
      return enqueueSnackbar("Please enter an email address", {
        variant: "error",
      });
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      enqueueSnackbar(JSON.stringify(error), { variant: "error" });
    }
    if (data) {
      handleSignOut();
    }
    return { data, error };
  }

  return { handlePasswordReset };
};


export default usePasswordReset;