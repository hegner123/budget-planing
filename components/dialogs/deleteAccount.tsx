import React, { useState } from "react";
import { Dialog, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function DeleteAccountDialog({
  showDeleteAccount,
  setShowDeleteAccount,
  handleDeleteAccount,
}) {
  return (
    <Dialog
      open={showDeleteAccount}
      onClose={() => setShowDeleteAccount(!showDeleteAccount)}
      PaperProps={{ className: "w-full p-5 grid grid-cols-12 " }}>
      <h4 className="col-span-6">Delete Your Account</h4>
      <IconButton
        onClick={() => setShowDeleteAccount(false)}
        className="self-end col-start-[-1]">
        <CloseIcon fontSize="small" />
      </IconButton>

      <Button
        variant="contained"
        onClick={() => handleDeleteAccount()}
        className="mt-5 text-white bg-brand-dark-blue hover:text-black hover:bg-brand-light-blue w-fit col-span-full">
        Delete
      </Button>
    </Dialog>
  );
}
