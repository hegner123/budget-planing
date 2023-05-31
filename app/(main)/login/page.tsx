"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useLogin } from "@budget/hooks/auth/useLogin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import usePasswordReset from "@budget/hooks/auth/usePasswordReset";

import type { Session } from "@supabase/auth-helpers-nextjs";

const LoginPage = ({ session }: { session: Session | null }) => {
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin();
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState("");
  const { handlePasswordReset } = usePasswordReset();

  const supabase = createClientComponentClient();
  const router = useRouter();

  return session ? (
    <button onClick={() => console.log(0)}>Sign out</button>
  ) : (
    <>
      <main className="justify-center min-w-full mt-10 main-min-h site-width site_grid">
        <div className="w-full col-span-4 col-start-6">
          <form className="grid w-full grid-cols-12 gap-6 p-10 bg-white">
            <h4 className="text-4xl col-span-full text-slate-900">Login</h4>
            {error && <p className="col-span-2 text-red-500">{error}</p>}
            <TextField
              variant="outlined"
              className="col-span-full"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              label="Email"
              InputLabelProps={{ shrink: true, htmlFor: "email" }}
            />
            <TextField
              variant="outlined"
              className="col-span-full"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              value={password}
              type="password"
              label="Password"
              autoComplete="current-password"
              InputLabelProps={{ shrink: true }}
              FormHelperTextProps={{
                onClick: () => setShowPasswordReset(true),
                className: "cursor-pointer hover:underline",
              }}
              helperText="Forgot Password?"
            />
            <Button
              variant="contained"
              className="col-span-4 p-2 mt-5 rounded bg-brand-dark-blue text-slate-900"
              onClick={(e) => handleSubmit(e)}>
              Login
            </Button>
          </form>
        </div>
      </main>
      <Dialog
        open={showPasswordReset}
        onClose={() => setShowPasswordReset(!showPasswordReset)}
        PaperProps={{ className: "w-full p-5 grid grid-cols-12 " }}>
        <h4 className="col-span-6">Password Reset</h4>
        <IconButton
          onClick={() => setShowPasswordReset(false)}
          className="self-end col-start-[-1]">
          <CloseIcon fontSize="small" />
        </IconButton>
        <TextField
          className="mt-5 col-span-full "
          label="Email"
          id="reset-email"
          onChange={(e) => setPasswordResetEmail(e.target.value)}
          type="email"
          value={passwordResetEmail}
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={() => handlePasswordReset(passwordResetEmail)}
          className="mt-5 text-white bg-brand-dark-blue hover:text-black hover:bg-brand-light-blue w-fit col-span-full">
          Reset
        </Button>
      </Dialog>
    </>
  );
};

export default LoginPage;
