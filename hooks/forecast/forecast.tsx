import dayjs from "dayjs";

export function budgetForecast(length: number, startDate: string, data: any) {
  // Init forecastList

  let forecastList = [];

  // Filter compiled data into balance, income, and expenses

  const balance = data.filter((entry: any) => entry.type === "balance");
  const rawIncome = data.filter((entry: any) => entry.type === "income");
  const rawExpenses = data.filter((entry: any) => entry.type === "expenses");

  // Entries

  type FunctionA = (entries: any[], b: number) => any[] | FunctionA;
  const repeatedEntries: FunctionA = (entries, length) => {
    let newRepeatedEntries = [];
    entries.forEach((entry) => {
      if (entry.repeated !== "None") {
        newRepeatedEntries.push(entry);
      }
      if (entry.repeated === "Weekly") {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.weekly(entry.date);
        newRepeatedEntries.push(newEntry);
      }
      if (entry.repeated === "Biweekly") {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.biweekly(entry.date);
        newRepeatedEntries.push(newEntry);
      }
      if (entry.repeated === "Monthly") {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.monthly(entry.date);
        newRepeatedEntries.push(newEntry);
      }
      if (entry.repeated === "Yearly") {
        let newEntry = { ...entry };
        newEntry.date = RepeatedDefaultsMap.yearly(entry.date);
        newRepeatedEntries.push(newEntry);
      }
    });
    return newRepeatedEntries;
  };

  // Create Repeated Income and Expenses

  const income = repeatedEntries(rawIncome, length);
  const expenses = repeatedEntries(rawExpenses, length);

  // Balance Length

  const balanceLength = balance.length;

  // Assign most recent balance

  let startingBalance = trimAndFloat(balance[balanceLength - 1]?.balance);

  // Assign starting date
  const startDateDayjs = dayjs(startDate);

  for (let i = 0; i < length; i++) {
    let newDate = startDateDayjs.add(i, "day");
    let newBalance = startingBalance;

    if (i >= 1) {
      newBalance = calculateBalance(
        forecastList[i - 1].balance,
        expenses,
        income,
        newDate
      ) as any;
    }
    const forecastEntry = {
      date: newDate,
      balance: newBalance,
    };
    forecastList.push(forecastEntry);
  }

  function calculateBalance(
    startingBalance: any,
    expenses: any,
    income: any,
    date: any
  ) {
    let newBalance: any = startingBalance;
    let newExpenses = expenses.filter((entry: any) => {
      return dayjs(entry.date).date() === dayjs(date).date();
    });

    let newIncome = income.filter((entry: any) => {
      return dayjs(entry.date).date() === dayjs(date).date();
    });

    let newExpensesTotal;
    if (newExpenses.length > 1) {
      newExpensesTotal = newExpenses.reduce((a: any, b: any) => {
        return a + trimAndFloat(b.expenses);
      }, 0);
    } else if (newExpenses.length === 1) {
      newExpensesTotal = trimAndFloat(newExpenses[0].expenses);
    } else {
      newExpensesTotal = 0;
    }

    let newIncomeTotal;
    if (newIncome.length > 1) {
      newIncomeTotal = newIncome.reduce((a: any, b: any) => {
        return a + trimAndFloat(b.income);
      }, 0);
    } else if (newIncome.length === 1) {
      newIncomeTotal = trimAndFloat(newIncome[0].income);
    } else {
      newIncomeTotal = 0;
    }

    newBalance = newBalance - newExpensesTotal + newIncomeTotal;
    return newBalance;
  }

  function trimAndFloat(amount: string) {
    return parseFloat(amount.slice(1));
  }

  return forecastList;
}

export interface BudgetForecast {
  length: number;
  startDate: string;
  data: any;
}

export const RepeatedDefaults = [
  "None",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Yearly",
];

export const RepeatedDefaultsMap = {
  weekly: (date: any) => dayjs(date).add(1, "week"),
  biweekly: (date: any) => dayjs(date).add(2, "week"),
  monthly: (date: any) => dayjs(date).add(1, "month"),
  yearly: (date: any) => dayjs(date).add(1, "year"),
};
