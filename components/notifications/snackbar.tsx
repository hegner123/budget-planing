"use client";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom } from "jotai";
import { showNotificationMessageAtom } from "@budget/store/state";

export default function SimpleSnackbar() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useAtom(
    showNotificationMessageAtom
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

  useEffect(() => {
    if (notificationMessage !== "") {
      setShowNotification(true);
    }
  }, [showNotification, notificationMessage]);

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
