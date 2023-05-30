"use client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAtom } from "jotai";
import { notificationMessageAtom } from "@budget/store/state";

export default function usePasswordReset() {
  const supabase = useSupabaseClient();
  const [, setNotificationMessage] = useAtom(notificationMessageAtom);

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
