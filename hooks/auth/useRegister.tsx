"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useLogin } from "./useLogin";

const useRegister = () => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<String>("");
  const [error, setError] = useState<any>(null);
  const { enqueueSnackbar } = useSnackbar();
  const login = useLogin();
  const supabaseClient = createClientComponentClient();
  const router = useRouter();

  async function registerUser() {
    const { data, error }: any = await supabaseClient.auth.signUp({
      email: `${email}`,
      password: `${password}`,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error);
      enqueueSnackbar("Error registering", { variant: "error" });
      return;
    }

    return data;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      return;
    }

    registerUser()
      .then(() => {
      })
      .catch((err) => {
        setError(err);
        enqueueSnackbar("Error registering", { variant: "error" });
      });
  }

  return {
    email,
    password,
    passwordConfirmation,
    error,
    setEmail,
    setPassword,
    setPasswordConfirmation,
    handleSubmit,
  };
};

export default useRegister;
