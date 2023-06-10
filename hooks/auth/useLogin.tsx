"use client";
import { useState } from "react";
import { loginUser } from "@budget/supabaseTables";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthLogin } from "@budget/types/auth";
import { useSnackbar } from "notistack";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const supabaseClient = createClientComponentClient();

  function handleSubmit(e: any) {
    e.preventDefault();
    try {
      loginUser({
        email: email,
        password: password,
        supabaseClient: supabaseClient,
      } as AuthLogin)
        .then(() => {
          router.push("/dashboard");
          enqueueSnackbar("Logged in", { variant: "success" });
        })
        .catch((err: null | string) => {
          setError(err);
          enqueueSnackbar("Error logging in", { variant: "error" });
        });
    } catch (err: any) {
      setError(err);
    }
  }

  return { email, password, error, setEmail, setPassword, handleSubmit };
};
