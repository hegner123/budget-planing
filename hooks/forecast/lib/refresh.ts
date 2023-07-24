import { BudgetEntry } from "@budget/types";
import dayjs from "dayjs";

const refreshDates = (dates: BudgetEntry[]): BudgetEntry[] => {
  const refreshedDates = dates.map((entry) => {
    let refreshedEntry = { ...entry };
    refreshedEntry.date = refreshDate(refreshedEntry.date as string);
    return refreshedEntry;
  });
  return refreshedDates;
};

function refreshDate(date: string): string {
  const thisMonth = dayjs().month();
  const thisYear = dayjs().year();
  return dayjs(date).month(thisMonth).year(thisYear).format("MM/DD/YYYY");
}

export { refreshDate, refreshDates };
