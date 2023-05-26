import { useState } from "react";
import { useAtom } from "jotai";
import {
  showNotificationAtom,
  notificationMessageAtom,
} from "@budget/store/state";

const useErrorHandler = () => {
  const [showNotification, setShowNotification] = useAtom(showNotificationAtom);
  const [notificationQue, setNotificationQue] = useAtom(
    notificationMessageAtom
  );

  const handleError = (error: any, message: any, type: any) => {
    setShowNotification(true);
    setNotificationQue(message);
  };

  return { handleError };
};

export default useErrorHandler;
