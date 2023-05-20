import { useState } from "react";
import { useAtom } from "jotai";
import { showNotificationAtom, notificationQueAtom } from "@budget/store/state";

const useErrorHandler = () => {
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationQue, setNotificationQue] = useAtom(notificationQueAtom);

  const handleError = (error: any, message: any, type: any) => {
    setShowNotification(true);

    setNotificationQue([
      ...notificationQue,
      { id: new Date().toDateString(), message, type },
    ]);
  };

  return { handleError };
};

export default useErrorHandler;
