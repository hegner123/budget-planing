import { Provider, createStore, atom } from "jotai";


const budgetStore = createStore();

const compiledDataAtom = atom([]);
const showNotificationAtom = atom(false);
const notificationMessageAtom = atom("");
const deleteEntryAtom = atom("");
const deleteEntryTypeAtom = atom("");
const needsRefreshAtom = atom(false);
const refreshedBalanceAtom = atom([]);
const refreshedExpensesAtom = atom([]);
const refreshedIncomeAtom = atom([]);

export {
  compiledDataAtom,
  showNotificationAtom,
  notificationMessageAtom,
  deleteEntryAtom,
  deleteEntryTypeAtom,
  needsRefreshAtom,
  refreshedBalanceAtom,
  refreshedExpensesAtom,
  refreshedIncomeAtom,
};

const JotaiProvider = ({ children }: any) => {
  return <Provider store={budgetStore}>{children}</Provider>;
};

export default JotaiProvider;
