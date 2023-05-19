import { useState, useEffect } from "react";
import { getIncomes } from "@budget/supabaseTables";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const useIncome = () => {
  const [income, setIncome] = useState(null);
  const [loading, setLoading] = useState(true);
  const user: any = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (loading) return;
    const { data }: any = getIncomes(supabaseClient, user);
    setIncome(data);
  }, [loading, supabaseClient, user]);

  function addIncome(e: any) {}

  return { income, loading, addIncome };
};
