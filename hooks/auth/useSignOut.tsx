"use client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const useSignOut = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error;
    }
    router.push("/");
  }
  return { signOut };
};

export default useSignOut;
