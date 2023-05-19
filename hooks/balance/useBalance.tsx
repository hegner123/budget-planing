import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { getBalance, addBalance } from "@budget/supabaseTables";
export const useBalance = () => {
  const [balance, setBalance] = useState<any>(null);
  const [fetched, setFetched] = useState(false);
  const user: any = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (fetched) return;

    getBalance(supabase)
      .then((data): any => {
        setBalance(data);
        setFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetched, user, supabase]);

  function addBalance() {}
  return { balance, fetched };
};
