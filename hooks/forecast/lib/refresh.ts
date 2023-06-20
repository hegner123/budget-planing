import { Entry } from "@budget/types";
import dayjs from "dayjs";

const refreshDates = (dates: Entry[]) => {
  const refreshedDates = dates.map((entry) => {
    let refreshedEntry = { ...entry };
    refreshedEntry.date = refreshDate(refreshedEntry.date);
    return refreshedEntry;
  });
  return refreshedDates;
};

function refreshDate(date: string) {
  const today = dayjs().month();
  return dayjs(date).month(today).format("MM/DD/YYYY");
}

export { refreshDate, refreshDates };
