import { Entry } from "@budget/types";
import dayjs from "dayjs";

const refreshDates = (dates: Entry[]) => {
  dates.map((entry) => {
    const today = dayjs().month();
    let refreshedEntry = { ...entry };
    refreshedEntry.date = refreshDate(refreshedEntry.date);
    return refreshedEntry;
  });
};

function refreshDate(date: string) {
  const today = dayjs().month();
  return dayjs(date).month(today).format("MM/DD/YYYY");
}

export { refreshDate, refreshDates };
