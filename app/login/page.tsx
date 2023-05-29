"use client";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useLogin } from "@budget/hooks/auth/useLogin";
import { TextField, Button } from "@mui/material";

const LoginPage = () => {
  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLogin();

  const user = useUser();
  const router = useRouter();

  return (
    <main className="justify-center min-w-full mt-10 main-min-h site-width site_grid">
      <div className="w-full col-span-4 col-start-6">
        <form className="grid w-full grid-cols-2 gap-6 p-10 bg-white">
          <h4 className="text-4xl col-span-full text-slate-900">Login</h4>
          {error && <p className="col-span-2 text-red-500">{error}</p>}
          <TextField
            variant="outlined"
            className="col-span-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            label="Email"
          />
          <TextField
            variant="outlined"
            className="col-span-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            label="Password"
          />
          <Button
            variant="contained"
            className="p-2 mt-5 bg-white rounded text-slate-900"
            onClick={(e) => handleSubmit(e)}>
            Login
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
