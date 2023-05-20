import { Provider, createStore, atom } from "jotai";
import { NotificationObject } from "@budget/types/notifications";

const budgetStore = createStore();

const showNotificationAtom = atom(false);
const notificationQueAtom = atom<NotificationObject[]>([]);

export { showNotificationAtom, notificationQueAtom };

const JotaiProvider = ({ children }: any) => {
  return <Provider store={budgetStore}>{children}</Provider>;
};

export default JotaiProvider;
