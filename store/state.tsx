"use strict";
import { Provider, createStore, atom } from "jotai";
import { ForecastLength } from "@budget/types/forecast";

const budgetStore = createStore();
const loadingAtom = atom(true);
const compiledDataAtom = atom([]);
const showNotificationAtom = atom(false);
const showNotificationMessageAtom = atom("");
const deleteEntryAtom = atom("");
const deleteEntryTypeAtom = atom("");
const needsRefreshAtom = atom(false);
const refreshedBalanceAtom = atom([]);
const refreshedExpensesAtom = atom([]);
const refreshedIncomeAtom = atom([]);
const configForecastAtom = atom({});
const configForecastDurationAtom = atom<any>(null);
const showDebugModalAtom = atom(false);

export {
  loadingAtom,
  compiledDataAtom,
  showNotificationAtom,
  showNotificationMessageAtom,
  deleteEntryAtom,
  deleteEntryTypeAtom,
  needsRefreshAtom,
  refreshedBalanceAtom,
  refreshedExpensesAtom,
  refreshedIncomeAtom,
  configForecastAtom,
  configForecastDurationAtom,
  showDebugModalAtom,
};

const JotaiProvider = ({ children }: any) => {
  return <Provider store={budgetStore}>{children}</Provider>;
};

export default JotaiProvider;
