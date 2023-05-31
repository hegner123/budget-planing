"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { showNotificationMessageAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

const useSignOut = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [, setNotificationMessage] = useAtom(showNotificationMessageAtom);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error;
    }
    setNotificationMessage("You have been signed out");
    router.push("/");
  }
  return { signOut };
};

export default useSignOut;
