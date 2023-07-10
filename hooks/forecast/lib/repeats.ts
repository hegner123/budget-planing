import { Entry } from "@budget/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import { refreshDates } from "./refresh";
dayjs.extend(duration);

const repeatedEntries = (entries: Entry[], length: number, test?: string) => {
  let newRepeatedEntries = [];

  for (let entry of entries) {
    const repeatedLength = determineRepeatedCount(entry, length);

    if (entry.repeated.toLowerCase() !== "none") {
      newRepeatedEntries.push(entry);
    }
    switch (entry.repeated.toLowerCase()) {
      case "daily":
        let dailyEntries = [];

        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            let newEntryDate = RepeatedDefaultsMap.daily(newEntry.date);
            newEntry.date = newEntryDate;
            dailyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.daily(dailyEntries[i - 1].date);
            dailyEntries.push(newEntry);
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      case "weekly":
        let weeklyEntries = [];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            let newEntryDate = RepeatedDefaultsMap.weekly(newEntry.date);
            newEntry.date = newEntryDate;
            weeklyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.weekly(
              weeklyEntries[i - 1].date
            );
            weeklyEntries.push(newEntry);
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      case "biweekly":
        let biweeklyEntries = [];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            let newEntryDate = RepeatedDefaultsMap.biweekly(entry.date);
            newEntry.date = newEntryDate;
            biweeklyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.biweekly(
              biweeklyEntries[i - 1].date
            );
            biweeklyEntries.push(newEntry);
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      case "monthly":
        let monthlyEntries = [];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            let newEntryDate = RepeatedDefaultsMap.monthly(entry.date);
            newEntry.date = newEntryDate;
            monthlyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.monthly(
              monthlyEntries[i - 1].date
            );
            monthlyEntries.push(newEntry);
          }

          newRepeatedEntries.push(newEntry);
        }
        break;
      case "yearly":
        let yearlyEntries = [];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            let newEntryDate = RepeatedDefaultsMap.yearly(entry.date);
            newEntry.date = newEntryDate;
            yearlyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.yearly(
              yearlyEntries[i - 1].date
            );
            yearlyEntries.push(newEntry);
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      default:
        break;
    }
  }

  switch (test) {
    case "daily":
      return newRepeatedEntries.filter(
        (entry) => entry.repeated.toLowerCase() === "daily"
      );
    case "weekly":
      return newRepeatedEntries.filter(
        (entry) => entry.repeated.toLowerCase() === "weekly"
      );
    case "biweekly":
      return newRepeatedEntries.filter(
        (entry) => entry.repeated.toLowerCase() === "biweekly"
      );
    case "monthly":
      return newRepeatedEntries.filter(
        (entry) => entry.repeated.toLowerCase() === "monthly"
      );
    case "yearly":
      return newRepeatedEntries.filter(
        (entry) => entry.repeated.toLowerCase() === "yearly"
      );
    default:
      return newRepeatedEntries;
  }

  // return newRepeatedEntries.filter(
  //   (entry) => dayjs(entry.date).format("YYYYMMDD") < dayjs().format("YYYYMMDD")
  // );
};

const RepeatedDefaultsMap = {
  daily: (date: any) => dayjs(date).add(1, "day").format("MM/DD/YYYY"),
  weekly: (date: any) => dayjs(date).add(1, "week").format("MM/DD/YYYY"),
  biweekly: (date: any) => dayjs(date).add(2, "week").format("MM/DD/YYYY"),
  monthly: (date: any) => dayjs(date).add(1, "month").format("MM/DD/YYYY"),
  yearly: (date: any) => dayjs(date).add(1, "year").format("MM/DD/YYYY"),
};

const determineRepeatedCount = (entry: Entry, length: number) => {
  const dailyRepeats = (length, unit) => dayjs.duration(length, unit).asDays();
  const weeklyRepeats = (length, unit) =>
    dayjs.duration(length, unit).asWeeks();
  const biWeeklyRepeats = (length, unit) =>
    dayjs.duration(length, unit).asWeeks() / 2;
  const monthRepeats = (length, unit) =>
    dayjs.duration(length, unit).asMonths();
  const yearRepeats = (length, unit) => dayjs.duration(length, unit).asYears();
  switch (entry.repeated.toLowerCase()) {
    case "daily":
      return parseInt(dailyRepeats(length, "d").toFixed(0), 10);
    case "weekly":
      return parseInt(weeklyRepeats(length, "d").toFixed(0), 10);
    case "biweekly":
      return parseInt(biWeeklyRepeats(length, "d").toFixed(0), 10);
    case "monthly":
      return parseInt(monthRepeats(length, "d").toFixed(0), 10);
    case "yearly":
      return parseInt(yearRepeats(length, "d").toFixed(0), 10);
    default:
      return 0;
  }
};


export { repeatedEntries };