"use client";
import { useState } from "react";
import { loginUser } from "@budget/supabaseTables";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  function handleSubmit(e: any) {
    e.preventDefault();
    try {
      loginUser(email, password, supabaseClient)
        .then(() => {
          router.push("/dashboard");
        })
        .catch((err) => {
          setError(err);
        });
    } catch (err: any) {
      setError(err);
    }
  }

  return { email, password, error, setEmail, setPassword, handleSubmit };
};
