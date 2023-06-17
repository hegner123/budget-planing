import dayjs from "dayjs";

const refreshDates = (dates: any) => {
  dates.map((entry: any) => {
    let refreshedEntry = { ...entry };
    refreshedEntry.date = dayjs().format("MM/DD/YYYY");
    return refreshedEntry;
  });
};

export { refreshDates };
