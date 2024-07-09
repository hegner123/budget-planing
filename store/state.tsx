"use strict";
/**
 * @module store/state
 */
import { createStore, atom } from "jotai";

import dayjs from "dayjs";


const budgetStore = createStore();
const loadingAtom = atom(true);
const compiledDataAtom = atom([]);
const loggedInUserAtom = atom<string>("");
const showNotificationAtom = atom(false);
const notificationMessageAtom = atom("");
const deleteEntryAtom = atom("");
const deleteEntryTypeAtom = atom("");
const configForecastAtom = atom<any>({});
const configForecastStartAtom = atom<any>(dayjs(new Date()));
const isLoggedInAtom = atom<boolean>(false);
const showDebugModalAtom = atom<boolean>(false);
const forecastListAtom = atom<any>([]);
const isMobileMenuOpenAtom = atom<boolean>(false);
const isMobileAtom = atom<boolean>(false);

export {
    loadingAtom,
    isLoggedInAtom,
    compiledDataAtom,
    showNotificationAtom,
    notificationMessageAtom,
    deleteEntryAtom,
    deleteEntryTypeAtom,
    configForecastAtom,
    configForecastStartAtom,
    showDebugModalAtom,
    forecastListAtom,
    loggedInUserAtom,
    isMobileMenuOpenAtom,
    isMobileAtom,
};


export default budgetStore;

