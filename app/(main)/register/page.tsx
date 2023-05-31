"use client";
import useRegister from "@budget/hooks/auth/useRegister";
import Link from "next/link";
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
    <section className="grid min-h-screen grid-cols-12 grid-rows-12 bg-slate-50">
      <form className="grid col-span-5 col-start-3 p-4 my-auto space-y-3 rounded col-start bg-slate-400 max-h-max">
        <h1 className="text-6xl col-span-full">Register</h1>
        <label className="col-span-full " htmlFor="email">
          Email
        </label>
        <input
          className="my-0 bg-transparent border-b-2 border-black border-solid col-span-full"
          type="email"
          name="email"
        />
        <label className="col-span-full" htmlFor="password">
          Password
        </label>
        <input
          className="bg-transparent border-b-2 border-black border-solid col-span-full"
          type="password"
          name="password"
          id="password"
        />
        <label className="col-span-full" htmlFor="password-confirmation">
          Password Confirmation
        </label>
        <input
          className="bg-transparent border-b-2 border-black border-solid col-span-full"
          type="password"
          name="password-confirmation"
          id="password-confirmation"
        />
        <div className="flex space-x-4">
          <button
            className="p-2 bg-black rounded cursor-pointer text-slate-900 hover:bg-slate-500"
            type="submit"
            onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
          <Link
            className="p-2 text-center bg-black rounded cursor-pointer text-slate-900 hover:bg-slate-500"
            href="../">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
