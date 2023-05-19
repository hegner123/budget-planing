import { useState, useEffect } from "react";
import { getExpenses } from "@budget/supabaseTables";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(null);
  const [loading, setLoading] = useState(true);
  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (loading) return;
    const { data }: any = getExpenses(supabaseClient, user);
    setExpenses(data);
  }, [loading, supabaseClient, user]);

  function addExpense(e: any) {}

  return { expenses, loading, addExpense };
};
