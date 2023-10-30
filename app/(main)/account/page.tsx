"use client";
import React, { useEffect, useState } from "react";
import { Dialog, TextField, Button, IconButton } from "@mui/material";

import { useSession } from "@budget/hooks/auth/useSession";
import usePasswordReset from "@budget/hooks/auth/usePasswordReset";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import useDeleteAccount from "@budget/hooks/admin/useAdmin";

export default function UserAccount() {
  const pathname = usePathname();
  const [accountData, setAccountData] = useState<any>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwordResetEmail, setPasswordResetEmail] = useState("");
  const { handlePasswordReset } = usePasswordReset();
  const { handleDeleteAccount } = useDeleteAccount();

  const { getSession } = useSession();
  useEffect(() => {
    getSession().then((res) => {
      setAccountData(res.data.session.user);
    });
  }, [getSession, pathname]);

  console.log(accountData);
  return (
    <div className="grid grid-cols-12">
      <div className="grid grid-cols-12 col-span-10 col-start-2 gap-6 mt-5">
        <h1 className="text-6xl col-span-full">Account</h1>

        <ul className="row-start-3 col-span-full">
          <li>
            <p>Email: {accountData?.email}</p>
          </li>
        </ul>
        <Button
          className="col-span-3 row-start-4 text-black bg-slate-500"
          variant="contained"
          onClick={() => setShowPasswordReset(!showPasswordReset)}>
          Change password
        </Button>
        <Button
          className="col-span-3 row-start-5 text-red-500 border-red-500 hover:border-red-200 hover:text-red-400"
          variant="outlined">
          Delete account
        </Button>
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
      </div>
    </div>
  );
}
