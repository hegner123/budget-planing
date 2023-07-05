import { Entry } from "@budget/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const repeatedEntries = (entries: Entry[], length: number) => {
  let newRepeatedEntries = [];

  entries.forEach((entry, index) => {
    const repeatedLength = determineRepeatedCount(entry, length);

    if (entry.repeated.toLowerCase() !== "none") {
      newRepeatedEntries.push(entry);
    }
    switch (entry.repeated.toLowerCase()) {
      case "daily":
        let dailyEntries = [entry];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            newEntry.date = RepeatedDefaultsMap.daily(entry.date, i + 1);
            dailyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.daily(
              dailyEntries[i - 1],
              i + 1
            );
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      case "weekly":
        let weeklyEntries = [entry];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            newEntry.date = RepeatedDefaultsMap.weekly(entry.date, i + 1);
            weeklyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.weekly(
              weeklyEntries[i - 1],
              i + 1
            );
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      case "biweekly":
        let biweeklyEntries = [entry];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            newEntry.date = RepeatedDefaultsMap.biweekly(entry.date, 1);
            biweeklyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.biweekly(
              biweeklyEntries[i - 1].date,
              2
            );
            biweeklyEntries.push(newEntry);
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      case "monthly":
        let monthlyEntries = [entry];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            newEntry.date = RepeatedDefaultsMap.monthly(entry.date, i + 1);
            monthlyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.monthly(
              monthlyEntries[i].date,
              i
            );
            monthlyEntries.push(newEntry);
          }

          newRepeatedEntries.push(newEntry);
        }
        break;
      case "yearly":
        let yearlyEntries = [entry];
        for (let i = 0; i < repeatedLength; i++) {
          let newEntry = { ...entry };
          if (i === 0) {
            newEntry.date = RepeatedDefaultsMap.yearly(entry.date, i + 1);
            yearlyEntries.push(newEntry);
          } else {
            newEntry.date = RepeatedDefaultsMap.yearly(
              yearlyEntries[i - 1].date,
              i
            );
            yearlyEntries.push(newEntry);
          }
          newRepeatedEntries.push(newEntry);
        }
        break;
      default:
        break;
    }
  });
  return newRepeatedEntries.filter(
    (entry) => dayjs(entry.date).format("YYYYMMDD") > dayjs().format("YYYYMMDD")
  );
};

const RepeatedDefaultsMap = {
  daily: (date: any, length: number) =>
    dayjs(date)
      .add(1 * length, "day")
      .format("MM/DD/YYYY"),
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