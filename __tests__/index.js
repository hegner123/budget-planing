const dayjs = require("dayjs");

const testStartDate = "01/01/2023";
const thisMonth = dayjs().month();
const thisYear = dayjs().year();
const testDate = dayjs(testStartDate)
  .month(thisMonth)
  .year(thisYear)
  .format("MM/DD/YYYY");

  const addOneDay = dayjs(testDate).add(1 * 4, "day")
      .format("MM/DD/YYYY")

