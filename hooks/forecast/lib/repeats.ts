import { Entry } from "@budget/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import { refreshDates } from "./refresh";
dayjs.extend(duration);

const repeatedEntries = (entries: Entry[], length: number, test?: string) => {
  let newRepeatedEntries = [];

  for (let entry of entries) {
    const repeatedLength = determineRepeatedCount(entry, length);

    if (entry.repeated.toLowerCase() === "none") {
      newRepeatedEntries.push(entry);
    }
    switch (entry.repeated.toLowerCase()) {
      case "daily":
        let dailyDates = { ...entry, repeats: [entry.date] };

        for (let i = 1; i < repeatedLength + 1; i++) {
          let newEntryDate = RepeatedDefaultsMap.daily(
            dailyDates.repeats[i - 1]
          );
          dailyDates.repeats.push(newEntryDate);
        }
        newRepeatedEntries.push(dailyDates);
        break;
      case "weekly":
        let weeklyDates = { ...entry, repeats: [entry.date] };

        for (let i = 1; i < repeatedLength + 1; i++) {
          let newEntryDate = RepeatedDefaultsMap.weekly(
            weeklyDates.repeats[i - 1]
          );
          weeklyDates.repeats.push(newEntryDate);
        }
        newRepeatedEntries.push(weeklyDates);
        break;
      case "biweekly":
        let biweeklyDates = { ...entry, repeats: [entry.date] };

        for (let i = 1; i < repeatedLength + 1; i++) {
          let newEntryDate = RepeatedDefaultsMap.biweekly(
            biweeklyDates.repeats[i - 1]
          );
          biweeklyDates.repeats.push(newEntryDate);
        }
        newRepeatedEntries.push(biweeklyDates);
        break;
      case "monthly":
        let monthlyDates = { ...entry, repeats: [entry.date] };

        for (let i = 1; i < repeatedLength + 1; i++) {
          let newEntryDate = RepeatedDefaultsMap.monthly(
            monthlyDates.repeats[i - 1]
          );
          monthlyDates.repeats.push(newEntryDate);
        }
        newRepeatedEntries.push(monthlyDates);
        break;
      case "yearly":
        let yearlyDates = { ...entry, repeats: [entry.date] };

        for (let i = 1; i < repeatedLength + 1; i++) {
          let newEntryDate = RepeatedDefaultsMap.yearly(
            yearlyDates.repeats[i - 1]
          );
          yearlyDates.repeats.push(newEntryDate);
        }
        newRepeatedEntries.push(yearlyDates);
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