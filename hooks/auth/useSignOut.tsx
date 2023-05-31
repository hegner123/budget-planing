"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const useSignOut = () => {
  const supabase = createClientComponentClient();
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
