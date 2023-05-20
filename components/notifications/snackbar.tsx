import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom } from "jotai";
import { showNotificationAtom, notificationQueAtom } from "@budget/store/state";

export default function SimpleSnackbar(message: any) {
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationQue, setNotificationQue] = useAtom(notificationQueAtom);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    console.log(message);

    // setShowNotification(false);
    setNotificationQue(
      notificationQue.filter((item: any) => item.id !== message.id)
    );
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
      {notificationQue.map((notification: any) => (
        <>
          <Snackbar
            key={notification.id}
            open={showNotification}
            autoHideDuration={6000}
            onClose={handleClose}
            message={notification.message}
            action={action}
          />
        </>
      ))}
    </div>
  );
}
