"use strict";
import { Provider, createStore, atom } from "jotai";
import dayjs from "dayjs";
import { ForecastLength } from "@budget/types/forecast";

const budgetStore = createStore();
const loadingAtom = atom(true);
const compiledDataAtom = atom([]);
const showNotificationAtom = atom(false);
const notificationMessageAtom = atom("");
const deleteEntryAtom = atom("");
const deleteEntryTypeAtom = atom("");
const needsRefreshAtom = atom(false);
const refreshedBalanceAtom = atom([]);
const refreshedExpensesAtom = atom([]);
const refreshedIncomeAtom = atom([]);
const configForecastAtom = atom<any>({});
const configForecastStartAtom = atom<any>(dayjs(new Date()));
const configForecastDurationAtom = atom<any>(0);
const showDebugModalAtom = atom(0);

export {
  loadingAtom,
  compiledDataAtom,
  showNotificationAtom,
  notificationMessageAtom,
  deleteEntryAtom,
  deleteEntryTypeAtom,
  needsRefreshAtom,
  refreshedBalanceAtom,
  refreshedExpensesAtom,
  refreshedIncomeAtom,
  configForecastAtom,
  configForecastStartAtom,
  configForecastDurationAtom,
  showDebugModalAtom,
};

const JotaiProvider = ({ children }: any) => {
  return <Provider store={budgetStore}>{children}</Provider>;
};

export default JotaiProvider;
