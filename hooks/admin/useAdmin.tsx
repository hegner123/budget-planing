"use client";
import React, { useEffect } from "react";
import { deleteUserData } from "@budget/supabaseTables";
import { useSession } from "@budget/hooks/auth/useSession";
import { createClient } from "@supabase/supabase-js";

export default function useDeleteAccount() {
  const [user, setUser] = React.useState<any>("");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { getSession } = useSession();
  useEffect(() => {
    getSession().then((res) => {
      setUser(res.data.session.user.id);
    });
  }, [getSession]);

  async function handleDeleteAccount() {
    try {
      const { sessionData } = await getSession();
      const deleteResponse = await deleteUserData(user, supabase);
      const { data, error } = await deleteUserAccount(user);
    } catch (error) {
      console.log("sessionData", user);
    }

    return { deleteResponse, data, error };
  }
  async function deleteUserAccount(userID: string) {
    const { data, error } = await supabase.functions.invoke("deleteUser", {
      body: { name: "Functions", userID: userID },
    });
    return { data, error };
  }
  return { handleDeleteAccount };
}
