import { Entry } from "@budget/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const repeatedEntries = (entries: Entry[], length: number) => {
  let newRepeatedEntries = [];

  entries.forEach((entry) => {
    const repeatedLength = determineRepeatedCount(entry, length);
    if (entry.repeated !== "None") {
      newRepeatedEntries.push(entry);
    }
    if (entry.repeated === "Weekly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.weekly(entry.date, i + 1);
        newRepeatedEntries.push(newEntry);
      }
    }
    if (entry.repeated === "Biweekly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.biweekly(entry.date, 1);
        newRepeatedEntries.push(newEntry);
      }
    }
    if (entry.repeated === "Monthly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.monthly(entry.date, i + 1);
        newRepeatedEntries.push(newEntry);
      }
    }
    if (entry.repeated === "Yearly") {
      for (let i = 0; i < repeatedLength; i++) {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.yearly(entry.date, i + 1);
        newRepeatedEntries.push(newEntry);
      }
    }
  });
  return newRepeatedEntries;
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
  switch (entry.repeated) {
    case "Weekly":
      return weeklyRepeats(length, entry.repeated);
    case "Biweekly":
      return biWeeklyRepeats(length, entry.repeated);
    case "Monthly":
      return monthRepeats(length, entry.repeated);
    case "Yearly":
      return yearRepeats(length, entry.repeated);
    default:
      return 0;
  }
};

const weeklyRepeats = (length, unit) => dayjs.duration(length, unit).asWeeks();
const biWeeklyRepeats = (length, unit) =>
  dayjs.duration(length, unit).asWeeks() / 2;
const monthRepeats = (length, unit) => dayjs.duration(length, unit).asMonths();
const yearRepeats = (length, unit) => dayjs.duration(length, unit).asYears();

export { repeatedEntries };