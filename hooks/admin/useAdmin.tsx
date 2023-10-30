import React from "react";
import { deleteUserData } from "@budget/supabaseTables";
import { useSession } from "@budget/hooks/auth/useSession";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function useDeleteAccount() {
  const supabase = createClientComponentClient();
  const { getSession } = useSession();
  const handleDeleteAccount = async () => {
    const session = await getSession();
    const { error } = await deleteUserData(session.data.user.id, supabase);
    if (error) {
      console.log(error);
    }
  };
  return { handleDeleteAccount };
}
