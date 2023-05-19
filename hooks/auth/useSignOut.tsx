import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useSignOut = () => {
  const supabase = useSupabaseClient();
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return error;
    }
  }
  return { signOut };
};

export default useSignOut;
