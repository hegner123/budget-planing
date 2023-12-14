"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const useSignOut = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [, setLoading] = useAtom(loadingAtom);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      return error;
    }
    enqueueSnackbar("Signed out successfully", { variant: "success" });
    setLoading(true);
    router.push("/");
  }
  return { handleSignOut };
};

export default useSignOut;
