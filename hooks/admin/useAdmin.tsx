import React from "react";
import { deleteUserData } from "@budget/supabaseTables";
import { useSession } from "@budget/hooks/auth/useSession";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function useDeleteAccount() {
  const supabase = createClientComponentClient();
  const { getSession } = useSession();
  
  async function handleDeleteAccount() {
    const { data } = await getSession();
    const deleteResponse = await deleteUserData(data.session.user.id, supabase);
    console.log("delete user data");
    return { deleteResponse };
  };
  return { handleDeleteAccount };
}
