import dayjs from "dayjs";

export function incomeDateFilter(incomes, date) {
  return incomes.filter((element) => {
    let elementDate = dayjs(element.date).format("YYYYMMDD");
    let forecastDate = dayjs(date).format("YYYYMMDD");
    if (elementDate === forecastDate) {
      return element;
    }
  });
}

export function expenseDateFilter(expenses, date) {
  return expenses.filter((element) => {
    let elementDate = dayjs(element.date).format("YYYYMMDD");
    let forecastDate = dayjs(date).format("YYYYMMDD");
    if (elementDate === forecastDate) {
      return element;
    }
  });
}
