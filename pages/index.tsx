import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(user);
    if (!user) router.push("/login");
    router.push("/dashboard");
  }, [router, user]);
  return <></>;
}
