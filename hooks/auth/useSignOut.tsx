"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const useSignOut = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      return error;
    }
    enqueueSnackbar("Signed out successfully", { variant: "success" });

    router.push("/");
  }
  return { signOut };
};

export default useSignOut;
