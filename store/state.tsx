"use strict";
import { Provider, createStore, atom } from "jotai";
import dayjs from "dayjs";


const budgetStore = createStore();
const loadingAtom = atom(true);
const compiledDataAtom = atom([]);
const showNotificationAtom = atom(false);
const notificationMessageAtom = atom("");
const deleteEntryAtom = atom("");
const deleteEntryTypeAtom = atom("");

const configForecastAtom = atom<any>({});
const configForecastStartAtom = atom<any>(dayjs(new Date()));
const configForecastDurationAtom = atom<number>(0);
const showDebugModalAtom = atom<boolean>(false);
const forecastListAtom = atom<any>([]);

export {
  loadingAtom,
  compiledDataAtom,
  showNotificationAtom,
  notificationMessageAtom,
  deleteEntryAtom,
  deleteEntryTypeAtom,
  configForecastAtom,
  configForecastStartAtom,
  configForecastDurationAtom,
  showDebugModalAtom,
  forecastListAtom,
};

const JotaiProvider = ({ children }: any) => {
  return <Provider store={budgetStore}>{children}</Provider>;
};

export default JotaiProvider;
