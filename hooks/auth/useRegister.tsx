"use client";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const useRegister = () => {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<String>("");
  const [error, setError] = useState<any>(null);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  async function registerUser() {
    const { data, error }: any = await supabaseClient.auth.signUp({
      email: `${email}`,
      password: `${password}`,
    });
    if (error) {
      setError(error);
      return;
    }
    console.log(data);
    return data;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    registerUser()
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        setError(err);
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
