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
  const thisMonth = dayjs().month();
  const thisYear = dayjs().year();
  return dayjs(date).month(thisMonth).year(thisYear).format("MM/DD/YYYY");
}

export { refreshDate, refreshDates };
