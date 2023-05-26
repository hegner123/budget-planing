import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom } from "jotai";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";

export default function SimpleSnackbar(message: any) {
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationMessage, setNotificationMessage] = useAtom(
    notificationMessageAtom
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowNotification(false);
    setNotificationMessage("");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleClose}
        message={notificationMessage}
        action={action}
      />
    </div>
  );
}
