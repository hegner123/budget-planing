import { Entry } from "@budget/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const repeatedEntries = (entries: Entry[], length: number) => {
  let newRepeatedEntries = [];

  entries.forEach((entry) => {
    const repeatedLength = determineRepeatedCount(entry, length);
    console.log(repeatedLength);
    if (entry.repeated.toLowerCase() !== "none") {
      newRepeatedEntries.push(entry);
    }
    if (entry.repeated.toLowerCase() === "weekly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.weekly(entry.date, i + 1);
        newRepeatedEntries.push(newEntry);
      }
    } else if (entry.repeated.toLowerCase() === "biweekly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        if (i === 0) {
          newEntry.date = RepeatedDefaultsMap.biweekly(newEntry.date, 1);
        } else {
          newEntry.date = RepeatedDefaultsMap.biweekly(
            newRepeatedEntries[i - 1].date,
            2
          );
        }
        newRepeatedEntries.push(newEntry);
      }
    }
    if (entry.repeated.toLowerCase() === "monthly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        if (i === 0) {
          newEntry.date = RepeatedDefaultsMap.monthly(entry.date, i + 1);
        } else {
          newEntry.date = RepeatedDefaultsMap.monthly(
            newRepeatedEntries[i - 1].date,
            i + 1
          );
        }

        newRepeatedEntries.push(newEntry);
      }
    }
    if (entry.repeated.toLowerCase() === "yearly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.yearly(entry.date, i + 1);
        newRepeatedEntries.push(newEntry);
      }
    }
  });
  return newRepeatedEntries.filter(
    (entry) => dayjs(entry.date).format("YYYYMMDD") > dayjs().format("YYYYMMDD")
  );
};

const RepeatedDefaultsMap = {
  weekly: (date: any, length: number) =>
    dayjs(date)
      .add(1 * length, "week")
      .format("MM/DD/YYYY"),
  biweekly: (date: any, length: number) =>
    dayjs(date)
      .add(2 * length, "week")
      .format("MM/DD/YYYY"),
  monthly: (date: any, length: number) =>
    dayjs(date)
      .add(1 * length, "month")
      .format("MM/DD/YYYY"),
  yearly: (date: any, length: number) =>
    dayjs(date)
      .add(1 * length, "year")
      .format("MM/DD/YYYY"),
};

const determineRepeatedCount = (entry: Entry, length: number) => {
  const weeklyRepeats = (length, unit) =>
    dayjs.duration(length, unit).asWeeks();
  const biWeeklyRepeats = (length, unit) =>
    dayjs.duration(length, unit).asWeeks() / 2;
  const monthRepeats = (length, unit) =>
    dayjs.duration(length, unit).asMonths();
  const yearRepeats = (length, unit) => dayjs.duration(length, unit).asYears();
  switch (entry.repeated.toLowerCase()) {
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