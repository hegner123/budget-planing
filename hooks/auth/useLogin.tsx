"use client";
import { useState } from "react";
import { loginUser } from "@budget/supabaseTables";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthLogin } from "@budget/types/auth";
import { useSnackbar } from "notistack";
import { useAtom } from "jotai";
import { loadingAtom } from "@budget/store/state";

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useAtom(loadingAtom);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const supabaseClient = createClientComponentClient();

  async function handleSubmit(e?: any) {
    if (e) {
      e.preventDefault();
    }
    try {
      setLoading(true);
      const { data, error } = await loginUser({
        email: email,
        password: password,
        supabaseClient: supabaseClient,
      } as AuthLogin);
      if (data) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err);

      enqueueSnackbar("Error logging in", { variant: "error" });
      setLoading(false);
    } 
  }

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
