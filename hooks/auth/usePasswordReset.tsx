"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { showNotificationMessageAtom } from "@budget/store/state";

export default function usePasswordReset() {
  const supabase = createClientComponentClient();
  const [, setNotificationMessage] = useAtom(showNotificationMessageAtom);

  async function handlePasswordReset(email: string) {
    if (!email) return setNotificationMessage("Please enter an email address");
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setNotificationMessage(JSON.stringify(error));
    }
    return { data, error };
  }

  return { handlePasswordReset };
}
