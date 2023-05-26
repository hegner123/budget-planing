import { Provider, createStore, atom } from "jotai";


const budgetStore = createStore();

const showNotificationAtom = atom(false);
const notificationMessageAtom = atom("");

export { showNotificationAtom, notificationMessageAtom };

const JotaiProvider = ({ children }: any) => {
  return <Provider store={budgetStore}>{children}</Provider>;
};

export default JotaiProvider;
