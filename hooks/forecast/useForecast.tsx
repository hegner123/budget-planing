import dayjs from "dayjs";
import {
  refreshDates,
  repeatedEntries,
  determineForecastDuration,
} from "./lib";
import { ExpenseEntry, ForecastEntry, IncomeEntry } from "@budget/types";

import Forecast from "@budget/app/(main)/forecast/page";

export function useForecastBudget() {
  function forecastBudget(length: number, startDate: string, data: any) {
    const today = dayjs().format("MM/DD/YYYY");
    // Init forecastList
    const incomePlaceholder: IncomeEntry = {
      income: 0,
      created_at: today,
      date: today,
      id: 1,
      name: "placeholder",
      repeated: "none",
      user: "placeholder",
      uuid: "placeholder",
    };
    const expensesPlaceholder: ExpenseEntry = {
      amount: 0,
      created_at: today,
      date: today,
      id: 1,
      name: "placeholder",
      repeated: "none",
      user: "placeholder",
      uuid: "placeholder",
    };

    let forecastList: ForecastEntry[] = [
      {
        date: dayjs().format("MM/DD/YYYY"),
        balance: "0",
        incomes: [incomePlaceholder],
        expenses: [expensesPlaceholder],
      },
    ];

    // Filter compiled data into balance, income, and expenses

    const balance = data.filter((entry: any) => entry.type === "balance");
    const rawIncome = data.filter((entry: any) => entry.type === "income");
    const rawExpenses = data.filter((entry: any) => entry.type === "expenses");

    const freshIncome = refreshDates(rawIncome);
    const freshExpenses = refreshDates(rawExpenses);

    // Create Repeated Income and Expenses

    const income = repeatedEntries(freshIncome, length);
    const expenses = repeatedEntries(freshExpenses, length);

    // Balance Length

    const balanceLength = balance.length;

    // Assign starting date

    const forecastStartDate: String = dayjs(startDate).format("MM/DD/YYYY");
    const startDateDayjs = dayjs(startDate);

    for (let i = 0; i < length; i++) {
      if (i === 0) {
        let newBalance = balance;
        const forecastEntry = {
          date: startDateDayjs,
          balance: `${newBalance}`,
          incomes: [incomePlaceholder],
          expenses: [expensesPlaceholder],
        };
        forecastList.push(forecastEntry as ForecastEntry);
      }
      const forecastedBalance = createBalanceForecast();
      let newDate = startDateDayjs.add(i, "day").format("MM/DD/YYYY");
      let newBalance = forecastedBalance.balance;

      const forecastEntry = {
        date: newDate,
        balance: `${newBalance}`,
        incomes: [incomePlaceholder],
        expenses: [expensesPlaceholder],
      };
      forecastList.push(forecastEntry as ForecastEntry);
    }

    function createBalanceForecast() {
      let newBalance = 0;
      let newDate = "";
      let incomeForThisDay = 0;
      let expensesForThisDay = 0;

      return {
        balance: newBalance,
        date: newDate,
        income: incomeForThisDay,
        expenses: expensesForThisDay,
      };
    }

    return forecastList;
  }
  return forecastBudget;
}

export const RepeatedDefaults = [
  "None",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Yearly",
];
