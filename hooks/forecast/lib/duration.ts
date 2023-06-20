import dayjs from "dayjs";

const determineForecastDuration = (
  startDate: string,
  endDate: string
): number => {
  return dayjs(endDate).diff(dayjs(startDate), "day");
};

export { determineForecastDuration };
