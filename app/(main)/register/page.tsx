"use client";
import useRegister from "@budget/hooks/auth/useRegister";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { loadingAtom } from "@budget/store/state";
import { useAtom } from "jotai";
import { SyntheticEvent, useEffect } from "react";

const RegisterForm = () => {
  const {
    email,
    password,
    passwordConfirmation,
    setEmail,
    setPassword,
    setPasswordConfirmation,
    handleSubmit,
  } = useRegister();
  const [, setLoading] = useAtom(loadingAtom);
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <main className="justify-center min-w-full mt-10 main-min-h site-width site_grid">
      <div className="w-full col-span-4 col-start-6">
        <form className="grid w-full grid-cols-12 gap-6 p-10 bg-white">
          <h1 className="text-3xl col-span-full text-black">Register</h1>

          <TextField
            className="my-0 bg-transparent  col-span-full"
            type="email"
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            className="bg-transparent  col-span-full"
            type="password"
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            className="bg-transparent col-span-full"
            type="password"
            label="Password Confirmation"
            id="password-confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className="flex space-x-4">
            <Button
              variant="contained"
              className="col-span-4 p-2 mt-5 rounded bg-brand-dark-blue text-slate-900"
              onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
            <Link href="../">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
