import React from "react";
import { Dialog, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function PasswordResetDialod({
  showPasswordReset,
  setShowPasswordReset,
  handlePasswordReset,
  passwordResetEmail,
  setPasswordResetEmail,
}) {
  return (
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
  );
}
